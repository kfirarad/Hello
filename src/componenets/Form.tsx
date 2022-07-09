import { useState } from 'react'

interface Props {
    addTestResult: (inputTestName: string, inputTestResult: number) => void;
}

export default function Form(props: Props) {

    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            testName: { value: string | null, focus: () => void };
            testResult: { value: number | null };
        };

        const testName = target.testName.value;
        const testResult = target.testResult.value;
        if (testName && testResult) {
            try {
                addTestResult(testName, testResult);
                target.testName.value = null;
                target.testName.focus();
                target.testResult.value = null;
            }
            catch (e: any) {
                console.log(e);
                setError(e.message);
            }
        }
    }

    const { addTestResult } = props;
    return <div className="shadow-lg w-full lg:w-1/2 p-2">
        {error.length > 0 && <div className="bg-red-300 p-2">{error}</div>}
        <form onSubmit={handleSubmit}>
            <fieldset className="border-gray-300 border-2">
                <legend>Please insert your test results</legend>
                <label className="block p-4">
                    <span className="text-gray-700">Test name</span>
                    <input
                        name="testName"
                        type="text"
                        className="mt-1 block w-full input-validtion"
                        placeholder="e.g Total HDL Cholesterol"
                        required
                        pattern="[a-zA-Z0-9\s\-\(\)!,]+"
                    />
                </label>
                <label className="block p-4">
                    <span className="text-gray-700">Test Result</span>
                    <input
                        name="testResult"
                        type="number"
                        className="mt-1 block w-full input-validtion"
                        placeholder="e.g 40"
                        pattern="/\d{1,4}/"
                        min="0"
                        required
                        step="0.01"
                    />
                </label>
                <div className="p-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </fieldset>
        </form>
    </div>
}