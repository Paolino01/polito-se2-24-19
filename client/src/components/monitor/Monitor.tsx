import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { fetchAdminData } from '../../API';
import { CounterSet } from '../../utils/interfaces';

const Monitor = (props: any) => {
  const socket = io("http://localhost:3000/");

  let [nextCustomerIds, setNextCustomerIds] = useState(['']); // Customer IDs for each counter
  //let [counterNumbers, setCounterNumbers] = useState(['']); // Four counters

  let [counterNumbers, setCounterNumbers] = useState<Record<string, string>>({});

  //ALTERNATIVE WAY
  //The key is the number of the counter, the value is the id of the next customer
  /*let counterNumbers: Record<string, string> = {
    "C1": "1234",
    "C2": "5678",
    "C3": "9101",
    "C4": "1121"
  };*/

  let [queues, setQueues] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchAdminData().then((cs: CounterSet) => {
      for(let cn of cs.counters) {
        counterNumbers[cn] = '';
      }
      setQueues({});
    });
  }, []);

  socket.on("nextCustomer", (arg) => {
    counterNumbers[arg["counter_id"]] = arg["customer_id"];
    console.log(arg);
    setQueues(arg['queues_people']);
  });

  socket.on("newCustomer", (arg) => {
    setQueues(arg);
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
