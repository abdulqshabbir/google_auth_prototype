const mongoose = require('mongoose')

const userSchmea = new mongoose.Schema({
    username: String,
    googleId: String
})

const User = mongoose.model('User', userSchmea)

module.exports = User