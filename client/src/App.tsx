import { Route, Routes } from 'react-router-dom';
import './App.css';
import Officer from './components/officer/Officer';
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
      </Routes>
    </>
  );
}

export default App;
