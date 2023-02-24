import { useEffect, useState } from "react"
import Sidebar from "../Sidebar/Sidebar"

const NUMBER_REGEX = "^\d+(\.\d{1,2})?$"

const AddTransaction = () => {
    const [amount, setAmount] = useState(0)
    const [validAmount, setValidAmount] = useState(false)

    useEffect(() => {
        const result = NUMBER_REGEX.test(amount)
        setValidAmount(result)
    }, [amount])

    return (
        <section>
            <Sidebar/>
            <h1>Add transaction</h1>
            <div>
                <form>
                    <label htmlFor="amount" className="label">Email-ID:</label>
                    <br/>
                    <input
                        id="amount"
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        value = { amount }
                        required
                    />
                    <br/>
                    <br/>
                </form>
            </div>

        </section>
        
    )
}

export default AddTransaction