const router = require('express').Router();
const passport = require('passport');
const queryString = require('query-string');
const CLIENT_HOME_PAGE_URL = 'http://localhost:3000'

// when login is successful, retrieve user inforation
router.get('/login/success', (request, response) => {
    if (request.user) {
        response.status(200).json({
            user: request.user,
            isSuccessful: true,
            message: 'User has been successfully authenticated',
            cookies: request.cookies
        })
    } else {
        response.status(500).json({error: '/auth/login/success route was incorrectly triggered.'})
    }
})

router.get('/login/failure', (request, response) => {
    if (!request.user) {
        response.status(200).json({
            user: request.user,
            isSuccessful: false,
            message: 'Use not authenticated',
            cookies: request.cookies
        })
    } else {
        response.status(500).json({error: '/auth/login/failure route was incorrectly triggered.'})
    }
})

// // auth login
// router.get('/login', (request, response) => {
//     response.render('login', { user: request.user })
// })

router.get('/logout', (request, response) => {
    request.logout()
    response.redirect(CLIENT_HOME_PAGE_URL)
})

// auth logout
router.get('/logout', (request, response) => {
    // express removes the cookie client side
    request.logout()
    response.redirect(CLIENT_HOME_PAGE_URL)
})

router.get('/google', passport.authenticate('google', { scope: ['profile']} ))

router.get('/google/redirect', passport.authenticate('google', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/login/failed'
}))
module.exports = router;