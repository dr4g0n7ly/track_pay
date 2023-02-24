import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Components/Auth/Register/Register'
import Login from './Components/Auth/Login/Login'
import AddTransaction from './Components/AddTransaction/AddTransaction'
import AddAccount from './Components/Accounts/AddAccount';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/addtransaction" element={<AddTransaction/>} />
        <Route path="/addaccount" element={<AddAccount/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
