import { TestResult, TestResultEvalaution } from '../types';

export default function TestResults(props: { results: TestResult[] }) {
    const { results } = props;

    const testResultLabel = (testResult: TestResultEvalaution) => {
        switch (testResult) {
            case TestResultEvalaution.GOOD:
                return 'Good!';
            case TestResultEvalaution.BAD:
                return 'Bad!';
            default:
                return 'Unknown';
        }
    }

    const resultClassName = (testResult: TestResultEvalaution) => {
        switch (testResult) {
            case TestResultEvalaution.GOOD:
                return 'bg-green-300';
            case TestResultEvalaution.BAD:
                return 'bg-red-300';
            default:
                return 'bg-yellow-300';
        }
    }


    return (<ul className="flex flex-col bg-sky-200 p-4 w-full lg:w-1/2">
        {results.map(result =>
        (<li key={result.key} className={`testresult-item ${resultClassName(result.testResultEvaluation)}`}>
            <div className="w-1/2">{result.testName} </div>
            <div className="w-1/2">{testResultLabel(result.testResultEvaluation)}</div>
        </li>))}
    </ul>)
}