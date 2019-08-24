require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');

const cors = require('cors')
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const profileRoutes = require('./routes/profile-routes');
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')

const app = express();

// set view engine to be ejs
app.set('view engine', 'ejs')

// connect to mongodb
mongoose.connect('mongodb+srv://abdulqshabbir:As23081001519050@cluster0-oq5cv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => console.log('connected to db')).catch(error => console.log(error))

// creates a cookie (which holds user ID) and stores it in the browswer for 1 hour.  This cookie is used to authenticate the
// user on server side protected routes
app.use(cookieSession({
    name: 'session',
    maxAge: 1000*60*60, // 1 hour
    keys: [process.env.COOKIE_KEY],
    secret: process.env.SESSION_SECRET
}))

// parses cookies
app.use(cookieParser())

// initialize passport and use auth routes
app.use(passport.initialize())

// deserializes cookies sent from the browser
app.use(passport.session())

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
// allows cross-origin-resource-sharing
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, HEAD, PUT, POST, PATCH, DELETE',
    credentials: true // by default server does not accept cookies sent from the browswer
}))

// routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

// middleware for checking if user is authenticated
function isUserAuthenticated (request, response, next) {
    if(!request.user) {
        response.status(401).json({
            isAuthenticated: false,
            message: 'User is not authenticated'
        })
    } else {
        next()
    }
}

// homepage
app.get('/', isUserAuthenticated, (request, response) => {
    // user is authenticated
    console.log('user is authenticated')
    response.status(200).json({
        isAuthenticated: true,
        message: 'User is successfully authenticated',
        user: request.user,
        cookies: request.cookies  //cookies can only be grabbed from request because of cookieParser
    })
})

app.listen(3001, () => {
    console.log('app now listening for requests on port 3001');
});