export interface DatasetTest {
    name: string;
    threshold?: number;
}

export enum TestResultEvalaution {
    GOOD,
    BAD,
    UNKNOWN
}

export interface TestResult {
    testName: string;
    testResultEvaluation: TestResultEvalaution;
    key: number;
}