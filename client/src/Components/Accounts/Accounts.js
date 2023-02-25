import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import addIcon from "../../public/newAccount.png"
import Sidebar from "../Sidebar/Sidebar";
import Login from "../Auth/Login/Login";
import editIcon from "../../public/edit.png"

import './Accounts.css'

const Accounts = () => {

    const [user, setUser] = useState()
    const [accounts, setAccounts] = useState([])
    const [selectedAccount, setSelectedAccount] = useState('')

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
    // 
    }, [user])

    const acchandleClick = (acc) => {
        console.log("account clicked")
        console.log(acc);
    }

    if (!user) {
        return (
            <Login/>
        )
    }

    const handleClick = (acc) => {

        const cards = document.querySelectorAll('.account-card')
        cards.forEach(card => {
            card.classList.remove('selected-card')
        })

        console.log("clicked")
        console.log(acc)

        setSelectedAccount(acc)
    }
    
    const AccountCard = (props) => {

        const acc = {props}.props.acc

        return (
            <div className={acc == selectedAccount ? "selected-card" : "account-card"} onClick={() => {handleClick(acc)}}>
                <img className='edit-icon' src={editIcon} />
                <h2 className="acc-name">{props.name}</h2>
                <p className="acc-num">XXXX XXXX XXXX {props.digits}</p>
    
                <div className="inner-card">
                    <p className='rs-span'><span className='acc-rs'>Rs.</span><span className='acc-bal'>{props.balance}</span></p>
                    <p className='balance'>BALANCE</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="acc-h1">Accounts</h1>
            <div className="account-cards">
                {accounts.map((acc)=>{
                    return (
                    <AccountCard acc={acc} name={acc.name} digits={acc.digits} balance={acc.balance} id={acc.id} onClick={() => acchandleClick(acc)}/>
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