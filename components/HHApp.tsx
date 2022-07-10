import { useState, useEffect } from 'react'
import Form from "./Form";
import TestResults from "./TestResults";
import { TestResult } from '../types';


export default function HHApp() {


  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const loadTestResults: () => Promise<TestResult[]> = async () => {
    try {
      const results = await fetch('/api/test-results').then(res => res.json());
      if (results.ok) {
        return results.data;
      } else {
        setError(results.error);
        return [];
      }

    }
    catch (e) {
      console.error(e);
      setError(e.message)
      return [];
    }
  };


  const addTestResult = async (inputTestName: string, inputTestResult: number): Promise<void> => {
    setError(null);
    if (inputTestName.trim() === '' || isNaN(inputTestResult)) {
      throw Error('invalid input');
    }
    try {
      const results = await fetch('/api/test-results', {
        method: 'POST',
        body:
          JSON.stringify({
            testName: inputTestName,
            testResult: inputTestResult
          }),

      });
      const response = await results.json();
      if (response.ok) {
        setTestResults(response.data);
      } else {
        setError(response.error);
      }
    }
    catch (e) {
      setError(e.message);
      throw new Error('failed to add test result');
    }
  }

  useEffect(() => {
    loadTestResults().then(setTestResults);
  }, []);

  return (
    <div>
      {error && <div className=" bg-red-500 w-full">{error}</div>}
      <div className='flex flex-col lg:flex-row'>
        <Form addTestResult={addTestResult} />
        {testResults.length > 0 && <TestResults results={testResults} />}
      </div>
      {testResults.length > 0 && <button onClick={() => { setTestResults([]) }} className="m-10 w-auto bg-red-300 hover:bg-red-500 text-gray-100 font-bold py-2 px-4 rounded">Reset</button>}
    </div>
  );
}