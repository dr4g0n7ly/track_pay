import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../Sidebar/Sidebar'
import '../Auth.css'

const EMAIL_REGEX = /(.+)@(.+){2,}\.(.+){2,}/
const PWD_REGEX = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/

const Register = () => {

    const [user, setUser] = useState()

    const [name, setName] = useState('')

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [match, setMatch] = useState('')
    const [validMatch, setValidMatch] = useState(false)

    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        setValidPassword(result)

        const check = password === match
        setValidMatch(check) 
    }, [password, match])

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user-email');
        if (loggedInUser) {
            console.log(loggedInUser)
            setUser(loggedInUser)
        } else {
            setUser()
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
            })

            const data = await res.json()
            toast(data.msg)

            if (!res.ok) {
                return console.log('res not ok - fetch error')
            }

            const resUser = JSON.stringify(data.userSession.email)
            console.log(resUser)

            const diff = 180 // 2 minute sessionds
            const curDateObj = new Date();
            const expDateObj = new Date(curDateObj.getTime() + diff*60000);

            localStorage.setItem('user-email', resUser)
            localStorage.setItem('expiry',expDateObj)

            setEmail('')
            setPassword('')
            setMatch('')

            setSuccess(true)

            return

        } catch (error) {
            console.log(error)
            return console.log('fetch error')
        }
    }

    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();

        window.location.reload(false);
    };


    if (user) {
        return (
            <div>
                <h1>User Logged in</h1>
                <button onClick={handleLogout}>Log out</button>
            </div>
            
        )
    }

    return (
        <div>
            <ToastContainer />
            <h1>Create a new Account</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="label">Name:</label>
                <br/>
                <input
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value = { name }
                    required
                />
                <br/>
                <br/>

                <label htmlFor="email" className="label">Email-ID:</label>
                <br/>
                <input
                    id="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value = { email }
                    required
                />
                <br/>
                <p className={!validEmail &&  email !== '' ? "error" : "no-error"}>
                    Must be a valid E-mail ID
                </p>
                <br/>

                <label htmlFor="pwd" className="label">Password:</label>
                <br/>
                <input
                    id="pwd"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value = { password }
                    required
                />
                <br/>
                <p className={!validPassword &&  password !== '' ? "error" : "no-error"}>
                    Password must be 8 to 16 characters long and must include numbers
                </p>
                <br/>

                <label htmlFor="match" className="label">Confirm password:</label>
                <br/>
                <input
                    id="match"
                    type="password"
                    className="input"
                    onChange={(e) => setMatch(e.target.value)}
                    value = { match }
                    required
                />
                <br/>
                <p className={!validMatch &&  match !== '' ? "error" : "no-error"}>
                    Passwords must match
                </p>
                <br/>

                <button disabled={!validEmail || !validPassword || !validMatch ? true : false}>
                    Sign up
                </button>
                <br/>
                    
                <p className="suggestion">
                    Already Registered?  
                    <span>
                    <Link to="/">  Log In</Link>
                    </span>
                </p>
            </form>
        <Sidebar/>
        </div>
    )
}

export default Register