import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CounterSet } from '../../utils/interfaces';
import { fetchAdminData, saveAssociations } from '../../API';

interface Service {
  id: string;
  name: string;
}

interface Counter {
  id: string;
  name: string;
}

const AdminPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [associations, setAssociations] = useState<Record<string, string[]>>(
    {},
  );
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CounterSet = await fetchAdminData();

        const fetchedServices = data.services.map((service) => ({
          id: service,
          name: `Service ${service}`,
        }));

        const fetchedCounters = data.counters.map((counter) => ({
          id: counter,
          name: `Counter ${counter}`,
        }));

        setServices(fetchedServices);
        setCounters(fetchedCounters);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  const handleSave = async () => {
    // Ensure all counters are included in the associations object
    const completeAssociations = { ...associations };
    counters.forEach((counter) => {
      if (!completeAssociations[counter.id]) {
        completeAssociations[counter.id] = [];
      }
    });

    try {
      const success = await saveAssociations(completeAssociations);
      if (success) {
        setShowMessage(true);
      } else {
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error('Error saving associations:', error);
      setShowErrorMessage(true);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    navigate('/');
  };

  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-teal-800 mt-16">
        Admin Page
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
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

      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Success</h2>
            <p className="mb-4">Associations saved successfully!</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleCloseMessage}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showErrorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="mb-4">
              Failed to save associations. Please try again.
            </p>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleCloseErrorMessage}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
