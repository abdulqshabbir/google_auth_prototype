import React from 'react';
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const App = () => {
  return(
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/profile" component={Profile} />
    </Router>
  )
}

export default App;
