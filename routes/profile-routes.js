
const router = require('express').Router();

router.get('/', (request, response) => {
    response.render('profile', { user: request.user })
})

module.exports = router;