import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Officer from './components/officer/Officer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/officer" element = {
          <Officer />
        } />
      </Routes>
    </>
  );
}

export default App;
