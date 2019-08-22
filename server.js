require('dotenv').config()
const express = require('express');
const authRoutes = require('./routes/auth-routes');

const cookieSession = require('cookie-session');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');

const app = express();

// set view engine to ejs
app.set('view engine', 'ejs')

// connect to mongodb
mongoose.connect('mongodb+srv://abdulqshabbir:As23081001519050@cluster0-oq5cv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => console.log('connected to db')).catch(error => console.log(error))

// initialize passport and use auth routes
app.use(passport.initialize())
app.use('/auth', authRoutes)

// non-auth routes
app.get('/', (request, response) => {
    response.render('home', { user: request.user })
})

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});