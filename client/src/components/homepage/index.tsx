import { useState } from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  const [officerId, setOfficerId] = useState<string>('1'); // Stato per l'ID dell'ufficiale selezionato
  const [showSelector, setShowSelector] = useState<boolean>(false); // Stato per la visibilità del selettore

  const handleShowSelector = () => {
    setShowSelector(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Project Name</h1>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <Link to="/customer">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Customer
              </button>
            </Link>
            <button
              onClick={handleShowSelector}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Go to Officer
            </button>
            <Link to="/monitor">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Monitor
              </button>
            </Link>
            <Link to="/statistics">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Manager
              </button>
            </Link>
          </div>
          {showSelector && (
            <div className="mt-4">
              <select
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="1">Officer 1</option>
                <option value="2">Officer 2</option>
                <option value="3">Officer 3</option>
                {/* Aggiungi altre opzioni se necessario */}
              </select>
              <Link to={`/officer/${officerId}`}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-2">
                  Go
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Homepage };
