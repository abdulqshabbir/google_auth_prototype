import React, { useState, useEffect } from 'react';
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'

const App = () => {
  const [ user, setUser ] = useState(null)
  useEffect(() => {
    axios
      .get('http://localhost:3001', { withCredentials: true }) // withCredentials must be included beacuse browswer does not send cookies to a CORS request by default
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          setUser(response.data.user)
        } else if (response.status === 401) {
          console.log(response.data)
          setUser(null)
        }
      })
      .catch(error => {
        console.log('something went wrong with authentication')
        setUser(null)
      })
  }, [])

  return(
    <Router>
      <Route exact path="/" render={() => <Home user={user} />} />
      <Route path="/auth/login" render={() => <Login user={user} /> } />
      <Route path="/profile" render={() => <Profile user={user} />} />
    </Router>
  )
}

export default App;
