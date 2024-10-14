import { useEffect, useState } from "react";

function Officer(props: any) {
    const [services, setServices] = useState([]);
    const [customerId, setCustomerId] = useState('Call the first customer');
    const [served, setServed] = useState(false);

    useEffect(() => {
        props.getCounterInformation(props.counterId).then((s: string) => {
            setServices(JSON.parse(s));
        });
    }, []);

    return (
        <div className="flex h-screen">
            <div className="m-auto border-2 border-lightgray-500 rounded-xl p-3 size-5/6 bg-white flex flex-col justify-between">
                <h1 className="text-6xl font-bold">Counter n° {props.counterId}</h1>

                <div className="pt-6 pb-6 text-center">
                    <span className="text-3xl font-bold">Your services: </span> <span className="text-4xl">{services.join(", ")}</span>
                    <br /><br />

                    <span className="text-3xl font-bold">Customer: </span> <span className="text-4xl">{customerId || "No customer"}</span>
                </div>

                <div className="flex justify-between">
                    {!served &&
                        <button type="button" className="border border-indigo-950 rounded-lg p-1 text-xl hover:bg-indigo-950 hover:text-white" onClick={() => {
                            if(customerId != '') {
                                props.markAsServed(props.counterId);
                                setServed(true);
                            }
                            else {
                                alert("Error: you should call a customer first");
                            }
                        }}>
                            Mark as Served
                        </button>
                    }
                    {served &&
                        <button type="button" className="border bg-green-500 rounded-lg p-2 text-xl text-white">Served!</button>
                    }
                    <button type="button" className="border border-indigo-950 rounded-lg p-1 text-xl hover:bg-indigo-950 hover:text-white" onClick={() => props.nextCustomer(props.counterId).then((cId: string) => {setCustomerId(cId); setServed(false);})}>Next Customer</button>
                </div>
            </div>
        </div>
    );
}



export default Officer;