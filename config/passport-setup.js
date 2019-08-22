require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        if (user) {
            done(null, user)
        }
    } catch (exception) {
        console.error(exception)
    }
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: '/auth/google/redirect'
}, async (accessToken, refreshToken, profile, done) => {
    console.log('passport callback function fired')
    try {
        const user = await User.findOne({ googleId: profile.id })
        if (user) {
            console.log('user already exists in the database!')
            done(null, user)
        } else {
            const newUser = await new User({ username: profile.displayName,googleId: profile.id }).save()
            console.log('new user saved to database!')
            done(null, newUser)
        }
    } catch (exception) {
        console.log(exception)
    }
}))