import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Register from './Components/Auth/Register/Register'
import Login from './Components/Auth/Login/Login'
import AddTransaction from './Components/AddTransaction/AddTransaction'


function App() {

  // const [loggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/transaction" element={<AddTransaction/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
