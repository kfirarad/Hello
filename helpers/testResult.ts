import { TestResult, TestResultEvalaution } from '../types';
import { findBestMatch } from "string-similarity";
import dataset from '../dataset.json'

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

const craeteTestResult = (inputTestName: string, inputTestResult: number): TestResult => {
    if (inputTestName.trim() === '' || isNaN(inputTestResult)) {
        throw Error('invalid input');
    }
    const testName = detectTestByName(inputTestName);
    const testResultEvaluation = evaluateTestResult(testName, inputTestResult);
    const newTestResult: TestResult = { testName, testResultEvaluation, key: Date.now() };
    return newTestResult;
}

export { detectTestByName, evaluateTestResult, craeteTestResult }