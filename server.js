require('dotenv').config()
const express = require('express');
const authRoutes = require('./routes/auth-routes');

const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')

const app = express();

// set view engine to ejs
app.set('view engine', 'ejs')

// connect to mongodb
mongoose.connect('mongodb+srv://abdulqshabbir:As23081001519050@cluster0-oq5cv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => console.log('connected to db')).catch(error => console.log(error))

app.use(cookieSession({
    name: 'session',
    maxAge: 1000*60*60, // 1 hour
    keys: [process.env.COOKIE_KEY],
    secret: process.env.SESSION_SECRET
}))

// initialize passport and use auth routes
app.use(passport.initialize())
// use session cookies in passport
app.use(passport.session())
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

// non-auth routes
app.get('/', (request, response) => {
    response.render('home', { user: request.user })
})

app.listen(3001, () => {
    console.log('app now listening for requests on port 3001');
});