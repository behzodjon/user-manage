
//importing modules
const express = require('express')
const userController = require('../controllers/user')
const { signup, login } = userController
const userAuth = require('../middleware/auth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/register', userAuth.saveUser, signup)

//login route
router.post('/login', login )

module.exports = router