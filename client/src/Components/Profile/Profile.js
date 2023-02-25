import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Login from "../Auth/Login/Login"

const Profile = () => {

    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user-email');
        if (loggedInUser) {
            setUser(loggedInUser)
        } else {
            setUser()
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload(false);
    };

    if (!user) {
        return (
            <Login/>
        )
    }

    return (
        <div>
            <h1>User Logged in</h1>
            <button onClick={handleLogout}>Log out</button>
            <Sidebar icon="profile"/>
        </div>
    )
}

export default Profile