import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Components/Auth/Register/Register'
import Login from './Components/Auth/Login/Login'
import AddTransaction from './Components/AddTransaction/AddTransaction'
import AddAccount from './Components/Accounts/AddAccount';
import Accounts from './Components/Accounts/Accounts';


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
