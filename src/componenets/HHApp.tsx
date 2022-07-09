import { useState } from 'react'
import Form from "./Form";
import TestResults from "./TestResults";
import { TestResult, TestResultEvalaution } from '../types';
import { findBestMatch } from "string-similarity";

const dataset = {
  "bloodTestConfig": [
    {
      "name": "HDL Cholesterol",
      "threshold": 40
    },
    {
      "name": "LDL Cholesterol",
      "threshold": 100
    },
    {
      "name": "A1C",
      "threshold": 4
    }
  ]
};

export default function HHApp() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const detectTestByName = (inputTestName: string): string => {
    const { bestMatchIndex, bestMatch: { rating } } = findBestMatch(inputTestName.toLowerCase(), dataset.bloodTestConfig.map(test => test.name.toLowerCase()));
    console.log(bestMatchIndex, rating);
    if (rating >= 0.1) {
      return dataset.bloodTestConfig[bestMatchIndex].name;
    } else { return inputTestName }
  };

  const evaluateTestResult = (testName: string, inputTestResult: number): TestResultEvalaution => {
    const datasetTest = dataset.bloodTestConfig.find(test => test.name === testName);
    if (datasetTest?.threshold === undefined || !datasetTest.hasOwnProperty('threshold')) {
      return TestResultEvalaution.UNKNOWN
    };
    return inputTestResult > datasetTest.threshold ? TestResultEvalaution.BAD : TestResultEvalaution.GOOD;
  }

  const addTestResult = (inputTestName: string, inputTestResult: number): void => {
    if (inputTestName.trim() === '' || isNaN(inputTestResult)) {
      throw Error('invalid input');
    }
    const testName = detectTestByName(inputTestName);
    const testResultEvaluation = evaluateTestResult(testName, inputTestResult);
    const newTestResult: TestResult = { testName, testResultEvaluation, key: Date.now() };
    setTestResults([...testResults, newTestResult]);
  }

  return (
    <div>
      <div className='flex flex-col lg:flex-row'>
        <Form addTestResult={addTestResult} />
        {testResults.length > 0 && <TestResults results={testResults} />}
      </div>
      {testResults.length > 0 && <button onClick={() => { setTestResults([]) }} className="m-10 w-auto bg-red-300 hover:bg-red-500 text-gray-100 font-bold py-2 px-4 rounded">Reset</button>}
    </div>
  );
}