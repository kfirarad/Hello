import { TestResult, TestResultEvalaution } from '../types';

export default function TestResults(props: { results: TestResult[] }) {
    const { results } = props;

    const testResultLabel = (testResult: TestResultEvalaution) => {
        switch (testResult) {
            case TestResultEvalaution.GOOD:
                return <span className="bg-green-300">Good</span>;
            case TestResultEvalaution.BAD:
                return <span className="bg-red-300">Bad</span>;
            default:
                return <span className="bg-yellow-300">Unknown</span>;
        }
    }


    return (<ul className="flex flex-col bg-sky-200 p-4 w-full lg:w-1/2">
        {results.map(result =>
        (<li key={result.key} className="testresult-item">
            <div className="w-1/2">{result.testName} </div>
            <div className="w-1/2">{testResultLabel(result.testResultEvaluation)}</div>
        </li>))}
    </ul>)
}