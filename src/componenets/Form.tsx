interface Props {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form(props: Props) {
    const { handleSubmit } = props;
    return <div className="shadow-lg w-full lg:w-1/2 p-2">
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
                        pattern="[a-zA-Z0-9\s]+"
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