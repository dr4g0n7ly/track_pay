import { useEffect, useState } from "react"
import Sidebar from "../Sidebar/Sidebar"

import './AddAccount.css'

const AddAccount = () => {

    const [accName, setAccName] = useState('Account 1')
    const [digits, setDigits] = useState()
    const [validDigits, setValidDigits] = useState(false)
    const [balance, setBalance] = useState()

    // useEffect(() => {
    //     const result = digits.length === 4
    //     setValidDigits(result)
    // }, [digits])

    const handleBalanceChange = (e) => {
        if (e.target.value.length !== 4) {
            setValidDigits(false)
        } else {
            setValidDigits(true)
        }
        setDigits(e.target.value)
    }

    return (
        <div>
            <h1>Add account</h1>
            
            <form>

                <label htmlFor="accname" className="label">Enter account name:</label>
                <br/>
                <input
                    type="text"
                    id="accname"
                    onChange={(e) => setAccName(e.target.value)}
                    value = { accName }
                    placeholder="Account 1"
                    required
                />

                <br/>
                <br/>

                <label htmlFor="digits" className="label">Last 4 digits:</label>    
                <br/>
                <input
                    type="number"
                    max="4"
                    placeholder="XXXX (optional)"
                    id="digits"
                    onChange={handleBalanceChange}
                    value = { digits }
                />
                <p className={!validDigits &&  digits !== '' ? "error" : "no-error"}>
                    4 digits must be entered
                </p>

                <br/>
                <br/>

                <label htmlFor="balance" className="label">Enter account balance:</label>    
                <br/>
                <input
                    type="number"
                    placeholder="0"
                    id="digits"
                    onChange={(e) => setBalance(e.target.value)}
                    value = { balance }
                />  

                <br/>
                <br/>

                <button disabled={!validDigits ? true : false}>
                    Create account
                </button>

            </form>

            <Sidebar icon="2"/>
        </div>
        
    )
}

export default AddAccount