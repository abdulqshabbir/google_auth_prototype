import React from 'react'
import './Login.css'

const Login = ({ user }) => {
    const handleLogout = () => {
        window.open('http://localhost:3001/auth/logout', '_self')
    }
    const handleGoogleLogin = () => {
        window.open('http://localhost:3001/auth/google', '_self')
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
                    <h1>Login using...</h1>
                </header>
                <main>
                    <a class="google-btn" href="/auth/google" onClick={handleGoogleLogin}>Google+</a>
                </main>
            </>
        )
    } else {
        return (
            <>
                <nav>
                <ul>
                    <li><a href="/auth/login">Login</a></li>
                    <li><a href="/">Homepage</a></li>
                </ul>
                </nav>
                <header>
                    <h1>Login using...</h1>
                </header>
                <main>
                    <button 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        Google+
                    </button>
                </main>
            </>
        )
    }
}
        

export default Login