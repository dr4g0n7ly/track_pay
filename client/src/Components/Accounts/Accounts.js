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
    const [selectedAccountName, setSelectedAccountName] = useState('')
    const [transactions, setTransactions] = useState([])

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
                const res = await fetch('accounts/getaccounts/' + userEmail)
    
                const data = await res.json()
                
                setAccounts(data.accounts)

                if (!res.ok) {
                    console.log('res not ok - fetch error')
                }

                else {
                    const aux = (data) => {
                        console.log("accounts: ", accounts)
                        console.log("selectedAccount: ", selectedAccount)
                    }
                    aux(data)
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

    const handleClick = async (acc, accName) => {

        const cards = document.querySelectorAll('.account-card')
        cards.forEach(card => {
            card.classList.remove('selected-card')
        })

        await setSelectedAccount(acc)
        await setSelectedAccountName(accName)

        const getAccountTransactions = async () => {

            try {
                const userEmail = user.replace(/['"]+/g, '')
                const accID = selectedAccount
                
                console.log(userEmail)
                console.log(accID)

                const res = await fetch('transactions/gettransactions/' + userEmail + '/' + accID)
                const data = await res.json()

                setTransactions(data.transactions)
                console.log("transactions: ", transactions)
                console.log("no. of transactions: ", transactions.length)

                if (!res.ok) {
                    console.log('res not ok - fetch error')
                }

                else {
                    console.log('successfully fetched account transactions')
                } 
                
            } catch (err) {
                console.log(err)
                console.log('fetch error')
            }
        }
        getAccountTransactions()
    }
    
    const AccountCard = (props) => {

        const acc = {props}.props.acc

        return (
            <div className={acc == selectedAccount ? "selected-card" : "account-card"} onClick={() => {handleClick(acc._id, acc.name)}}>
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

    const TransactionCard = (props) => {
        return (
            <div className="transaction-card">
                <h5>{props.desc}</h5>
                <h5>{props.amount}</h5>
                <h5>{props.balance}</h5>
            </div>
        )
    }

    function groupByDate(array, property) {
        return array.reduce(function(groups, item) {
            var name = item[property]
            var group = groups[name] || (groups[name] = [])
            group.push(item)
            return groups
        }, { })
    }

    const Transactions = () => {

        if (selectedAccount === null) {
            return (
                <div>
                    <p>Please select an account to see transactions</p>
                    <p>Add a new transaction</p>
                </div>
            )
        } else if (transactions.length === 0) {
            return (
                <div>
                    <h3>{selectedAccountName}</h3>
                    <p>Looks like you dont have any transactions</p>
                    <p>Add a new transaction</p>
                </div>
            )
        } else {
            return (
                <div className="transactions">
                    <h3>{selectedAccountName}</h3>
                    {transactions.map((transaction) => {
                        return (
                            <div>
                                <TransactionCard desc={transaction.description} amount={transaction.amount} balance={transaction.currBalance} />
                            </div>
                        )
                    })
                    }
                    <p>Add a new transaction</p>
                </div>
            )
        }
    }

    return (
        <div>
            <h1 className="acc-h1">Accounts</h1>
            <div className="account-cards">
                {accounts.map((acc)=>{
                    return (
                    <AccountCard acc={acc} name={acc.name} digits={acc.digits} balance={acc.balance} id={acc.id}/>
                );})}
            </div>
            <Link to="/addaccount" className="new-link">
                <img src={addIcon} className="add-icon"/>
                <p className="add-text">Create new Account?</p>
            </Link>
            <Sidebar icon="2"/>

            <h2 className="trans-h2">Transactions</h2>
            <Transactions/>
        </div>
    )
}


export default Accounts