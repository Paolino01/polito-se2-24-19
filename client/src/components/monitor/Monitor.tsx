import React from 'react';
import { Server } from "socket.io";

const Monitor = (props: any) => {
  const nextCustomerIds = ['1234', '5678', '9101', '1121']; // Customer IDs for each counter
  const counterNumbers = ['1', '2', '3', '4']; // Four counters

  const queues = [
    ['Haircut', 10],
    ['Shave', 5],
    ['Hair wash', 2],
    ['Beard trim', 8],
    ['Hair coloring', 4],
    ['Facial', 2],
    ['Manicure', 5],
    ['Pedicure', 5],
  ];

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
            {counterNumbers.map((counter, index) => (
              <div key={index} className="p-4 bg-blue-100 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  Counter {counter}
                </h3>
                <p className="text-md text-gray-800">
                  Customer ID:{' '}
                  <span className="font-semibold">
                    {nextCustomerIds[index]}
                  </span>
                </p>
                <p className="text-md text-gray-800">
                  Service: <span className="font-semibold">Haircut</span>
                </p>
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
            {queues.map((queue, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 border rounded-md shadow-sm"
              >
                <p className="text-lg font-medium text-gray-800">
                  {queue[0]}:{' '}
                  <span className="font-semibold text-blue-600">
                    {queue[1]} waiting
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
