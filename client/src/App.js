import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Components/Auth/Register/Register'
import Login from './Components/Auth/Login/Login'
import AddTransaction from './Components/Transactions/AddTransaction'
import AddAccount from './Components/Accounts/AddAccount';
import Accounts from './Components/Accounts/Accounts';

import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/addtransaction" element={<AddTransaction/>} />
        <Route path="/addaccount" element={<AddAccount/>} />
        <Route path="/accounts" element={<Accounts/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
