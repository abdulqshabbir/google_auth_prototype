require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

// take the user and use an identifying piece of information (mongodb id) and store that in a cookie in the browswer
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(foundUser => {
        if (foundUser) {
            done(null, foundUser)
        }
    }).catch(error => {
        console.log(error)
    })
})

passport.use(
    new GoogleStrategy({
        //options for google startegy
        callbackURL: 'http://localhost:3000/auth/google/redirect',
        clientID: process.env['GOOGLE_APP_ID'],
        clientSecret: process.env['GOOGLE_APP_SECRET']
    },(accessToken, refreshToken, profile, done) => {
        //check if user already exists in our db
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have user
                console.log('user found in the database is: ', currentUser)
                done(null, currentUser)
            } else {
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then(newUser => {
                    console.log('new user was created: ', newUser)
                    done(null, newUser)
                })
            }
        }).catch(error => {
            console.log('some error with google strategy')
            console.log(error)
        })
    })
)