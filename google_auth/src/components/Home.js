import React from 'react'
import './Home.css'
import axios from 'axios'

const Home = ({ user }) => {
    const handleLogout = () => {
        window.open('http://localhost:3001/auth/logout', '_self')
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
                    <h1>Google Authentication is awesome!</h1>
                    <h2>Homepage</h2>
                </header>
                <main>
                    <p>Probably the coolest thing on the planet :</p>
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
                <h1>Google Authentication is awesome!</h1>
                <h2>Homepage</h2>
            </header>
            <main>
                <p>Probably the coolest thing on the planet :</p>
            </main>
            </>
        )
    }
}

export default Home
