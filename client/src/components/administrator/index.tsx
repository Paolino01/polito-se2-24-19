import React, { useState } from 'react';

interface Service {
  id: string;
  name: string;
}

interface Counter {
  id: string;
  name: string;
}

const mockServices: Service[] = [
  { id: 'service1', name: 'Service 1' },
  { id: 'service2', name: 'Service 2' },
  { id: 'service3', name: 'Service 3' },
];

const mockCounters: Counter[] = [
  { id: 'counter1', name: 'Counter 1' },
  { id: 'counter2', name: 'Counter 2' },
  { id: 'counter3', name: 'Counter 3' },
];

const AdminPage: React.FC = () => {
  const [services] = useState<Service[]>(mockServices);
  const [counters] = useState<Counter[]>(mockCounters);
  const [associations, setAssociations] = useState<Record<string, string[]>>(
    {},
  );

  const handleAssociate = (counterId: string, serviceId: string) => {
    setAssociations((prevAssociations) => {
      const updatedAssociations = { ...prevAssociations };

      if (!updatedAssociations[counterId]) {
        updatedAssociations[counterId] = [];
      }

      if (updatedAssociations[counterId].includes(serviceId)) {
        updatedAssociations[counterId] = updatedAssociations[counterId].filter(
          (id) => id !== serviceId,
        );
      } else {
        updatedAssociations[counterId] = [
          ...updatedAssociations[counterId],
          serviceId,
        ];
      }

      return updatedAssociations;
    });
  };

  const handleSave = () => {
    console.log('Associations:', associations);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-teal-800 mt-16">
        Admin Page
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          New Customers
        </h2>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-600">
            Services
          </h3>
          <ul className="list-disc list-inside pl-6 text-gray-700">
            {services.map((service) => (
              <li key={service.id} className="mb-2">
                {service.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-600">
            Counters
          </h3>
          <ul className="space-y-6">
            {counters.map((counter) => (
              <li key={counter.id} className="text-gray-700">
                <div className="text-xl font-bold text-teal-700 mb-2">
                  {counter.name}
                </div>

                <div className="flex flex-wrap">
                  {services.map((service) => {
                    const isSelected = associations[counter.id]?.includes(
                      service.id,
                    );
                    return (
                      <button
                        key={service.id}
                        className={`px-4 py-2 m-1 rounded transition duration-200 text-white shadow-sm ${
                          isSelected
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gray-500 hover:bg-gray-600'
                        }`}
                        onClick={() => handleAssociate(counter.id, service.id)}
                      >
                        {service.name}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition duration-200 mt-4 w-full"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
