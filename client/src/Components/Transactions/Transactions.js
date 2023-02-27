import { useState, useEffect } from "react"

const Transactions = (props) => {

    const [user, setUser] = useState()
    const [account, setAccount] = useState()
    const [transactions, setTransactions] = useState([])

    useEffect( () => {

        const getAccountTransactions = async () => {

            const loggedInUser = localStorage.getItem('user-email');
            if (loggedInUser) {
                setUser(loggedInUser)
            } else {
                setUser()
            }

            setAccount(props.acc)
            console.log(account)

            try {
                const userEmail = user.replace(/['"]+/g, '')

                const res = await fetch('/transactions/gettransactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        account: account._id,
                    }),
                })
    
                const data = await res.json()
                setTransactions(data.transactions)
                console.log("transactions: ", transactions)

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
    
    }, [user, account])

    if (transactions.length === 0) {
        console.log("transactions = 0")
        return (
            <div>
                <h2 className="trans-h2">Transactions</h2>
                <p>Looks like you dont have any transactions</p>
                <p>Add a new transaction</p>
            </div>
        )
    } else {
        console.log("transactions > 0")
        return (
            <div>
                <h2 className="trans-h2">Transactions</h2>
                <p>We have transactions</p>
                <p>Add a new transaction</p>
            </div>
        )
    }
}

export default Transactions