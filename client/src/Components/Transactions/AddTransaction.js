import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../Sidebar/Sidebar"
import DatePicker from "react-datepicker";
import Login from "../Auth/Login/Login"

import './AddTransaction.css'
import "react-datepicker/dist/react-datepicker.css";
import { mt } from "date-fns/locale";

const NUMBER_REGEX = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/

const AddTransaction = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState()
    const [accounts, setAccounts] = useState([])

    const [amount, setAmount] = useState(0)
    const [validAmount, setValidAmount] = useState(false)

    const [style1, setStyle1] = useState('type-button') 
    const [style2, setStyle2] = useState('type-button')
    
    const [account, setAccount] = useState()
    const [date, setDate] = useState(new Date())
    const [validDate, setValidDate] = useState(true)
    const [description, setDescription] = useState('')
    const [isExpense, setIsExpense] = useState(false)
    const [category, setCategory] = useState('')


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
                console.log(data)
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
    
    }, [user, account])

    useEffect(() => {
        const result = NUMBER_REGEX.test(amount)
        setValidAmount(result)
    }, [amount])

    useEffect(() => {
        const dToday = new Date().getDate()
        const mToday = new Date().getMonth()
        const yToday = new Date().getFullYear()
        console.log(dToday, mToday, yToday)
        const dDate = date.getDate()
        const mDate = date.getMonth()
        const yDate = date.getFullYear()
        console.log(dDate)
        if (dToday < dDate || mToday < mDate || yToday < yDate) {
            setValidDate(false)
        } else {
            setDate(date)
            setValidDate(true)
        }
    })

    const handleClick1 = () => {
        setStyle1('type-button-active-1')
        setStyle2('type-button')
        setIsExpense(true)
    }

    const handleClick2 = () => {
        setStyle1('type-button')
        setStyle2('type-button-active-2')
        setIsExpense(false)
    }

    const handleSelectChange = () => {
        const selectElement = document.querySelector('#select')
        setAccount(selectElement.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (description == '') {
            await setDescription('misc')
        }

        console.log(description)

        const userEmail = user.replace(/['"]+/g, '')
        console.log("userEmail: ", userEmail)

        try {
            const res = await fetch('/transactions/addtransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    account: account,
                    amount: amount,
                    date: date,
                    description: description,
                    isExpense: isExpense,
                    category: category
                }),
            })

            const data = await res.json()
            console.log(data)
            toast(data.msg)

            if (!res.ok) {
                return console.log('res not ok - fetch error')
            }

            navigate('/accounts')

        } catch (err) {
            console.log(err)
            toast('fetch error')
        }
    }

    if (!user) {
        return (
            <Login/>
        )
    }

    return (
        <section>
            <ToastContainer/>
            <h1 className="trans-h1">Add transaction</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="amount" className="label">Enter amount:</label>
                    <br/>

                    <div className="amount-div">
                        <p className="rs">Rs.</p>
                        <input
                            id="amount"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                            value = { amount }
                            required
                            autoFocus
                        />
                    </div>
                    <p className={!validAmount &&  amount ? "error" : "no-error"}>
                        Amount must be a positive number
                    </p>
                    <br/>
                    <br/>

                    <div className="row" style={{marginTop: "-48px"}}>
                        <div className="col1">
                            <label htmlFor="date" className="label">Select date:</label>
                            <DatePicker id="date" className="datepicker" selected={date} onChange={(date) => {setDate(date)}} />
                            <p className={!validDate ? "error" : "no-error"} style={{marginTop:"-12px"}}>
                                Date cannot be a future date
                            </p>
                        </div>

                        <div className="col2">
                            <label htmlFor="account" className="label">Select account:</label>
                            <br/>
                            <br/>
                            <select id="select" onChange={handleSelectChange}>
                            <option className="acc-opt" value="none" selected disabled hidden>Select an Account</option>
                                {accounts.map((acc)=>{
                                    return (
                                    <option className="acc-opt" value={acc._id} >{acc.name}</option>
                                );})}
                            </select>
                        </div>

                    <br/>
                    </div>

                    <br/>
                    <div>

                        <label htmlFor="description" className="label">Describe transaction:</label>
                        <br/>
                        <input
                            type="text"
                            id="accname"
                            onChange={(e) => setDescription(e.target.value)}
                            value = { description }
                            placeholder="transaction details  (optional)"
                        />

                    </div>

                    <br/>

                    <div className="row">

                        <div className="col1">
                            <label htmlFor="type" className="label">Type:</label>
                            <br/>
                            <div className="type-holder" id="type">
                                <div className={style1} onClick={handleClick1}>
                                    <p className="type-text">Expense</p>
                                </div>
                                <div className={style2} onClick={handleClick2}>
                                    <p className="type-text">Income</p>
                                </div>
                            </div>
                        </div>

                        <div className="col2">
                            <label htmlFor="category" className="label">Category:</label>
                            <br/>
                            <div className="type-holder" id="category">
                                <div className={category === 'basic' ? 'selected-cat' : 'category'} onClick={() => {setCategory('basic')}}>
                                    <p className="type-text">basic</p>
                                </div>
                                <div className={category === 'leisure' ? 'selected-cat' : 'category'}  onClick={() => {setCategory('leisure')}}>
                                    <p className="type-text">leisure</p>
                                </div>
                                <div className={category === 'health' ? 'selected-cat' : 'category'}  onClick={() => {setCategory('health')}}>
                                    <p className="type-text">health</p>
                                </div>
                                <div className={category === 'savings' ? 'selected-cat' : 'category'}  onClick={() => {setCategory('savings')}}>
                                    <p className="type-text">savings</p>
                                </div>
                            </div>
                        </div>
                    <br/>
                    <br/>   
                    </div>

                    <br/>
                    <br/>
                    <button>Add transaction</button>
                    
                </form>
            </div>
            <Sidebar icon="1"/>
        </section>
        
    )
}

export default AddTransaction