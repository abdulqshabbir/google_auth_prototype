import React from 'react'
import './Login.css'

const Login = ({ user }) => {
    if (user) {
        return (
            <>
                <nav>
                    <ul>
                        <li><a href="/auth/logout">Log out</a></li>
                        <li><a href="/auth/login">Login</a></li>
                        <li><a href="/">Homepage</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                </nav>
                <header>
                    <h1>Login using...</h1>
                </header>
                <main>
                    <a class="google-btn" href="/auth/google">Google+</a>
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
                    <a class="google-btn" href="/auth/google">Google+</a>
                </main>
            </>
        )
    }
}
        

export default Login