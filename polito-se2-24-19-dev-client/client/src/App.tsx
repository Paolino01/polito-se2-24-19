import { Route, Routes } from 'react-router-dom';
import './App.css';
import Officer from './components/officer/Officer';
import ServiceSelector from './components/customer/ServiceSelector';
import { BottomBar } from './components/bottombar/Bottombar';
import { NavB } from './components/navbar/Navbar';

function App() {
  const markAsServed = async() => {

  }

  const nextCustomer = async() => {
    
  }


  return (
    <>
      <Routes>
        <Route path="/officer" element = {
          <div>
            <NavB />
            <Officer markAsServed={markAsServed} nextCustomer={nextCustomer} />
            <BottomBar />
          </div>
        } />

        <Route path="/service-selection" element = {<ServiceSelector />} />
      </Routes>
    </>
  );
}

export default App;
