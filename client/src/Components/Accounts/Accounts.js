import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import addIcon from "../../public/newAccount.png"
import Sidebar from "../Sidebar/Sidebar";
import AccountCard from "./AccountCard"
import Login from "../Auth/Login/Login";

import './Accounts.css'

const Accounts = () => {

    const [user, setUser] = useState()
    const [accounts, setAccounts] = useState([])
    const [selectedAccount, setSelectedAccount] = useState()

    useEffect( () => {

        const getUserAccounts = async () => {

            const loggedInUser = localStorage.getItem('user-email');
            if (loggedInUser) {
                setUser(loggedInUser)
            } else {
                setUser()
            }

            try {
                const userEmail = user.replace(/['"]+/g, '')
                const res = await fetch('/accounts/getaccounts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userEmail,
                    }),
                })
    
                const data = await res.json()
                setAccounts(data.accounts)
    
                if (!res.ok) {
                    console.log('res not ok - fetch error')
                }

                else {
                    console.log('successfully fetched user accounts')
                } 
    
            } catch (err) {
                console.log(err)
                console.log('fetch error')
            }
        }
    
        getUserAccounts()
    
    }, [user])

    if (!user) {
        return (
            <Login/>
        )
    }

    console.log(accounts[0])

    return (
        <div>
            <h1 className="acc-h1">Accounts</h1>
            <div className="account-cards">
                {accounts.map((acc)=>{
                    return (
                    <AccountCard name={acc.name} digits={acc.digits} balance={acc.balance}/>
                );})}
            </div>
            <Link to="/addaccount" className="new-link">
                <img src={addIcon} className="add-icon"/>
                <p className="add-text">Create new Account?</p>
            </Link>
            <Sidebar icon="2"/>
        </div>
    )
}

export default Accounts