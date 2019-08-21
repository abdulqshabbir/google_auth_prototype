const router = require('express').Router()
const passport = require('passport')

// auth login
router.get('/login', (req, res) => {
    res.render('login')
})

//auth with google
router.get('/google', passport.authenticate('google', {
    // what information are you retrieving from google
    scope: ['profile']
}))


//callback route for google to redirect to
// note passport is being called as middleware so it can take the code provide by google in the query string
// and use it to exchange it for a profile
router.get('/google/redirect', passport.authenticate('google'), (error, req, res, next) => {
    if (error) {
        console.log(error)
    }
    // find user if they exist in the database
    else if (error.name === 'TokenError') {
        return res.redirect('/google')
    }
    res.redirect('/profile/')
})
module.exports = router