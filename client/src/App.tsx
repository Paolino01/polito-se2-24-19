import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import Officer from './components/officer/Officer';
import ServiceSelector from './components/customer/ServiceSelector';
import Monitor from './components/monitor/Monitor';
import Statistics from './components/manager/Statistics';
import { BottomBar } from './components/bottombar/Bottombar';
import { NavB } from './components/navbar/Navbar';
import API from './API';
import { Homepage } from './components/homepage';
import Layout from './Layout';

function App() {
  //Officer
  const getCounterInformation = async (counterId: number) => {
    return await API.getCounterInformation(counterId);
  };

  const markAsServed = async (counterId: number) => {
    API.markAsServed(counterId);
  };

  const nextCustomer = async (counterId: number) => {
    return await API.nextCustomer(counterId);
  };

  //Monitor
  const getCounterNumbers = async () => {
    return await API.getCounterNumbers();
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
        <Route
          path="/"
          element={
            <div>
              <NavB />
              <Homepage />
              <BottomBar />
            </div>
          }
        />
        <Route path="/customer" element={<ServiceSelector />} />
        <Route path="/monitor" element={<Monitor getCounterNumbers={getCounterNumbers}/>} />
        <Route path="/statistics" element={<Statistics />} />
      </Route>
    </Routes>
  );
}

export default App;
