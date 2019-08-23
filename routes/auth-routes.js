const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (request, response) => {
    response.render('login', { user: request.user })
})

// auth logout
router.get('/logout', (request, response) => {
    // express removes the cookie client side
    request.logout()
    response.redirect('/')
})

router.get('/google', passport.authenticate('google', { scope: ['profile']} ))



router.get('/google/redirect', passport.authenticate('google'), (request, response) => {
    response.render('profile', { user: request.user })
})

module.exports = router;