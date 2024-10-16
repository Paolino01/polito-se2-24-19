import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { fetchAdminData } from '../../API';
import { CounterSet } from '../../utils/interfaces';

const Monitor = () => {
  const socket = io("http://localhost:3000/");

  let services: string[];                       //Saves all the services offered by the company
  const [update, setUpdate] = useState(false);  //Needed to trigger page update when needed
  let [counterNumbers] = useState<Record<string, string>>({});

  let [queues] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchAdminData().then((cs: CounterSet) => {
      for(let cn of cs.counters) {
        counterNumbers[cn] = '';
      }
      for(let s of cs.services) {
        queues[s] = 0;
      }
      services = cs.services;
      console.log(queues);
      setUpdate(!update);
    });
  }, []);

  socket.on("nextCustomer", (arg) => {
    counterNumbers[arg["counter_id"]] = arg["customer_id"];
    console.log(arg);
    console.log(queues);
    if(services != undefined) {
      for(let s of services) {
        if(s in Object.keys(arg["queues_people"]))
          queues[s] = arg["queues_people"][s];
        else
          queues[s] = 0;
      }
    }
    setUpdate(!update);
    console.log(queues);
  });

  socket.on("newCustomer", (arg) => {
    for(let s of Object.keys(arg)) {
      queues[s] = arg[s];
    }
    setUpdate(!update);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-5xl m-auto p-8 bg-white rounded-lg shadow-md mt-16 mb-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Service Monitor
        </h1>

        {/* Current Customers Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Currently Serving
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(counterNumbers).map(([cn, customerId]) => (
              <div key={cn} className="p-4 bg-blue-100 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  Counter {cn}
                </h3>
                <p className="text-md text-gray-800">
                  Customer ID:{' '}
                  <span className="font-semibold">
                    {customerId}
                  </span>
                </p>
                {/*<p className="text-md text-gray-800">
                  Service: <span className="font-semibold">Haircut</span>
                </p>*/}
              </div>
            ))}
          </div>
        </div>

        {/* Queues Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Service Queues
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(queues).map(([s, n]) => (
              <div
                key={s}
                className="p-3 bg-gray-50 border rounded-md shadow-sm"
              >
                <p className="text-lg font-medium text-gray-800">
                  {s}:{' '}
                  <span className="font-semibold text-blue-600">
                    {n} waiting
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
