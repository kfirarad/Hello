import { useState } from 'react'
import Form from "./Form";
import TestResults from "./TestResults";
import { TestResult, TestResultEvalaution } from '../types';

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
    const datasetTest = dataset.bloodTestConfig.find(test => test.name.toLowerCase() === inputTestName.toLowerCase());
    return datasetTest?.name || inputTestName;
  };

  const evaluateTestResult = (testName: string, inputTestResult: number): TestResultEvalaution => {
    const datasetTest = dataset.bloodTestConfig.find(test => test.name === testName);
    if (datasetTest?.threshold === undefined || !datasetTest.hasOwnProperty('threshold')) {
      return TestResultEvalaution.UNKNOWN
    };
    return inputTestResult > datasetTest.threshold ? TestResultEvalaution.BAD : TestResultEvalaution.GOOD;
  }

  const addTestResult = (inputTestName: string, inputTestResult: number): void => {
    const testName = detectTestByName(inputTestName);
    const testResultEvaluation = evaluateTestResult(testName, inputTestResult);
    const newTestResult: TestResult = { testName, testResultEvaluation, key: Date.now() };
    setTestResults([...testResults, newTestResult]);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      testName: { value: string | null };
      testResult: { value: number | null };
    };

    const testName = target.testName.value;
    const testResult = target.testResult.value;
    if (testName && testResult) {
      try {
        addTestResult(testName, testResult);
        target.testName.value = null;
        target.testResult.value = null;
      }
      catch (e) {
        console.log(e);

      }


    }
  }

  return (
    <div className='flex flex-col lg:flex-row'>
      <Form handleSubmit={handleSubmit} />
      <TestResults results={testResults} />
    </div>
  );
}