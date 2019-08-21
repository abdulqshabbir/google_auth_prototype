require('dotenv').config()
const expresss = require('express')
const app = expresss()
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const mongoose = require("mongoose")
const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

//connect to database
mongoose.connect(process.env['MONGO_URI'], {useNewUrlParser: true}, () => {
    console.log('connected to mongodb')
})

//set up view engine
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// create cookie
app.use(cookieSession({
    maxAge: 24*60*60*1000, //1 day
    keys: [process.env['COOKIE_KEY']]
}))

// initialize passport
app.use(passport.initialize())

//cookie session
app.use(passport.session())

//auth routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

//home route
app.get('/', (req, res) => {
    res.render("home")
})

//listen to PORT
app.listen(3000, () => {
    console.log('app listenining on port 3000')
})