import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import Officer from './components/officer/Officer';
import ServiceSelector from './components/customer/ServiceSelector';
import Monitor from './components/monitor/Monitor';
import Layout from './Layout';
import API from './API';
import { Homepage } from './components/homepage';

function App() {
  const getCounterInformation = async (counterId: number) => {
    API.getCounterInformation(counterId);
  };

  const markAsServed = async (counterId: Number) => {};

  const nextCustomer = async (counterId: number) => {
    API.nextCustomer(counterId);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="officer/:counterId"
          element={
            <Officer
              counterId={useParams()['*']?.split('/')[1]}
              getCounterInformation={getCounterInformation}
              markAsServed={markAsServed}
              nextCustomer={nextCustomer}
            />
          }
        />
        <Route path="/" element={<Homepage />} />
        <Route path="customer" element={<ServiceSelector />} />
        <Route path="monitor" element={<Monitor />} />
      </Route>
    </Routes>
  );
}

export default App;
