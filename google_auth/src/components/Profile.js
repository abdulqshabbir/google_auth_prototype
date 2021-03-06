import React from 'react'
import './Profile.css'

const Profile = ({ user }) => {
    const handleLogout = (e) => {
        window.open('http://localhost:3001/auth/logout', "_self")
    }
    if (user) {
        return (
            <>
                <nav>
                <ul>
                    <li><a onClick={handleLogout}>Logout</a></li>
                    <li><a href="/">Homepage</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
                </nav>
                <header>
                    <h1>Welcome to your profile, { user.username }.</h1>
                </header>
            </>
        )
    } else {
        return (
            <>
                <nav>
                    <ul>
                        <li><a href="/auth/login">Login</a></li>
                        <li><a href="/">Homepage</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                    </nav>
                    <header>
                        <h1>Please log in</h1>
                </header>
            </>
        )
    }
}

export default Profile
        
