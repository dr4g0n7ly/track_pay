import { useEffect, useState } from "react"
import Sidebar from "../Sidebar/Sidebar"
import DatePicker from "react-datepicker";
import Login from "../Auth/Login/Login"
import cat1 from "../../public/cat1.png"
import cat2 from "../../public/cat2.png"
import cat3 from "../../public/cat3.png"
import cat4 from "../../public/cat4.png"

import './AddTransaction.css'
import "react-datepicker/dist/react-datepicker.css";

const NUMBER_REGEX = /^\d+(\.\d{1,2})?$/

const AddTransaction = () => {

    const [user, setUser] = useState()
    const [accounts, setAccounts] = useState([])

    const [date, setDate] = useState(new Date())
    const [amount, setAmount] = useState(0)
    const [validAmount, setValidAmount] = useState(false)

    const [style1, setStyle1] = useState('type-button')
    const [style2, setStyle2] = useState('type-button')
    const [type, setType] = useState('')

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
                console.log("Accounts: ", accounts)
    
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

    useEffect(() => {
        const result = NUMBER_REGEX.test(amount)
        setValidAmount(result)
    }, [amount])

    const handleClick1 = () => {
        setStyle1('type-button-active-1')
        setStyle2('type-button')
        setType('Expense')
    }

    const handleClick2 = () => {
        setStyle1('type-button')
        setStyle2('type-button-active-2')
        setType('Income')
    }

    console.log("category: ", category)

    if (!user) {
        return (
            <Login/>
        )
    }

    return (
        <section>
            <h1>Add transaction</h1>
            <div>
                <form>
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
                    <br/>
                    <br/>

                    <div className="row">
                        <div className="col1">
                            <label htmlFor="date" className="label">Select date:</label>
                            <DatePicker id="date" className="datepicker" selected={date} onChange={(date) => setDate(date)} />
                        </div>

                        <div className="col2">
                            <label htmlFor="account" className="label">Select account:</label>
                            <br/>
                            <br/>
                            <select>
                                {accounts.map((acc)=>{
                                    return (
                                    <option className="acc-opt" value={acc}>{acc.name}</option>
                                );})}
                            </select>
                        </div>

                    <br/>

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