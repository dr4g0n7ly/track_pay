import { useEffect, useState } from "react"
import Sidebar from "../Sidebar/Sidebar"
import DatePicker from "react-datepicker";

import './AddTransaction.css'
import "react-datepicker/dist/react-datepicker.css";

const NUMBER_REGEX = /^\d+(\.\d{1,2})?$/

const AddTransaction = () => {
    const [date, setDate] = useState(new Date())
    const [amount, setAmount] = useState(0)
    const [validAmount, setValidAmount] = useState(false)

    const [style1, setStyle1] = useState('type-button')
    const [style2, setStyle2] = useState('type-button')
    const [type, setType] = useState('')

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
                        <div className="col">
                            <label htmlFor="date" className="label">Select date:</label>
                            <DatePicker id="date" className="datepicker" selected={date} onChange={(date) => setDate(date)} />
                        </div>

                        <div className="col">
                            <label htmlFor="account" className="label">Select account:</label>
                            <br/>
                            <br/>
                            <select>
                                <option className="acc-opt" value="acc1">Acc1</option>
                                <option className="acc-opt" value="acc2">Acc2</option>
                                <option className="acc-opt" value="acc3">Savings</option>
                            </select>
                        </div>

                    <br/>

                    </div>
                    <br/>
                    <div className="row">

                        <div className="col">
                            <label htmlFor="account" className="label">Type:</label>
                            <br/>
                            <div className="type-holder">
                                <div className={style1} onClick={handleClick1}>
                                    <p className="type-text">Expense</p>
                                </div>
                                <div className={style2} onClick={handleClick2}>
                                    <p className="type-text">Income</p>
                                </div>
                            </div>
                            
                        </div>
                        

                    <br/>
                    <br/>
                        
                    </div>
                    
                </form>
            </div>
            <Sidebar icon="1"/>
        </section>
        
    )
}

export default AddTransaction