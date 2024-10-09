function Officer(props: any) {
    return (
        <div className="flex h-screen">
            <div className="m-auto border-2 border-lightgray-500 rounded-xl p-3 size-5/6 bg-white flex flex-col justify-between">
                <h1 className="text-6xl font-bold">Counter n° 1</h1>

                <div className="pt-6 pb-6 text-center">
                    <span className="text-4xl font-bold">Your services: </span> <span className="text-2xl">Service 1, Service 3</span>
                    <br /><br />

                    <span className="text-4xl font-bold">Customer: </span> <span className="text-2xl">S-4</span>
                </div>

                <div className="flex justify-between">
                    <button type="button" className="border border-sky-500 rounded-lg p-1 text-xl hover:bg-sky-500 hover:text-white" onClick={() => props.markAsServed()}>Mark as Served</button>
                    <button type="button" className="border border-sky-500 rounded-lg p-1 text-xl hover:bg-sky-500 hover:text-white" onClick={() => props.nextCustomer()}>Next Customer</button>
                </div>
            </div>
        </div>
    );
}



export default Officer;