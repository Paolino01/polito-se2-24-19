import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { fetchAdminData } from '../../API';
import { CounterSet } from '../../utils/interfaces';

const Monitor = () => {
  const [services, setServices] = useState<string[]>([]); // Saves all the services offered by the company
  const [counterNumbers, setCounterNumbers] = useState<Record<string, string>>(
    {},
  );
  const [queues, setQueues] = useState<Record<string, number>>({});

  useEffect(() => {
    const socket = io('http://localhost:3000/');

    fetchAdminData().then((cs: CounterSet) => {
      const initialCounterNumbers: Record<string, string> = {};
      const initialQueues: Record<string, number> = {};

      for (let cn of cs.counters) {
        initialCounterNumbers[cn] = '';
      }
      for (let s of cs.services) {
        initialQueues[s] = 0;
      }
      setServices(cs.services.sort());
      setCounterNumbers(initialCounterNumbers);
      setQueues(initialQueues);
      console.log(initialQueues);
    });

    const handleNextCustomer = (arg: any) => {
      setCounterNumbers((prevCounterNumbers) => ({
        ...prevCounterNumbers,
        [arg['counter_id']]: arg['customer_id'],
      }));
      console.log(arg);
      console.log(queues);
      if (services.length > 0) {
        setQueues((prevQueues) => {
          const updatedQueues = { ...prevQueues };
          for (let s of services) {
            if (arg['queues_people'].hasOwnProperty(s)) {
              updatedQueues[s] = arg['queues_people'][s];
            } else {
              updatedQueues[s] = 0;
            }
          }
          return updatedQueues;
        });
        console.log(queues);
      }
    };

    const handleNewCustomer = (arg: any) => {
      setQueues((prevQueues) => {
        const updatedQueues = { ...prevQueues };
        for (let s of Object.keys(arg)) {
          updatedQueues[s] = arg[s];
        }
        return updatedQueues;
      });
    };

    socket.on('nextCustomer', handleNextCustomer);
    socket.on('newCustomer', handleNewCustomer);

    return () => {
      socket.off('nextCustomer', handleNextCustomer);
      socket.off('newCustomer', handleNewCustomer);
      socket.disconnect();
    };
  }, []);

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
            {Object.entries(counterNumbers)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([cn, customerId]) => (
                <div key={cn} className="p-4 bg-blue-100 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">
                    Counter {cn}
                  </h3>
                  <p className="text-md text-gray-800">
                    Customer ID:{' '}
                    <span className="font-semibold">{customerId}</span>
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
            {Object.entries(queues)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([s, n]) => (
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
