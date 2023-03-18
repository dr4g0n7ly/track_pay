import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../Sidebar/Sidebar";
import Login from "../Auth/Login/Login";
import editIcon from "../../public/edit.png"
import addIcon from "../../public/newAccount.png"
import transIcon from "../../public/icon1.png"

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
                <p className="trans-card-desc">{props.desc}</p>
                {props.isExpense === true ? (
                    <p className="trans-card-amt-sub">- Rs. {props.amount}</p>
                ):(
                    <p className="trans-card-amt-add">+ Rs. {props.amount}</p>
                ) }
                <p className="trans-card-balance">Rs. {props.balance}</p>
            </div>
        )
    }

    function groupByDate(array) {
        return array.reduce(function(groups, item) {
            var date = item['date']
            var name = date.slice(0, date.indexOf('T'))
            console.log("date: " + name)
            var group = groups[name] || (groups[name] = [])
            group.push(item)
            return groups
        }, { })
    }

    const Transactions = () => {

        if (selectedAccount === null) {
            return (
                <div>
                    <p className="trans-head">Please select an account to see transactions</p>
                </div>
            )
        } else if (transactions.length === 0) {
            return (
                <div>
                    <p className="trans-head">{selectedAccountName}</p>
                    <p>Looks like you dont have any transactions</p>
                </div>
            )
        } else {

            var groups = groupByDate(transactions);
            console.log('groups:' + JSON.stringify(groups))

            const results = []

            Object.keys(groups).forEach((date, index) => {
                console.log(groups[date])
                results.push (
                    <div key={index}>
                        <p className="trans-date">{date}</p>
                        { groups[date].map((transaction) => {
                            return (
                                <TransactionCard desc={transaction.description} amount={transaction.amount} balance={transaction.currBalance} isExpense={transaction.isExpense} />
                            )
                        })}
                    </div>
                )
            })
            
            return (
                <div className="transactions">
                    <p className="trans-head">{selectedAccountName} Transactions</p>
                    { results }                   
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
            <Transactions/>
            <Sidebar icon="2"/>
            <Link to="/addtransaction" className="new-link">
                <img src={transIcon} className="trans-icon"/>
                <p className="add-text">Add new Transaction?</p>
            </Link>

        </div>
    )
}


export default Accounts