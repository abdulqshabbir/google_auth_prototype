import React from 'react'
import './Home.css'

const Home = ({ user }) => {
    if (user) {
        return (
            <>
                <nav>
                    <ul>
                        <li><a href="/auth/logout">Log out</a></li>
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
