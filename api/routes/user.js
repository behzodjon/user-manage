//importing modules
const express = require('express');
const userController = require('../controllers/user');
const { signup, login, logout, index, destroy, update } = userController;
const userAuth = require('../middleware/auth');

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post('/register', userAuth.saveUser, signup);

//login route
router.post('/login', login);

router.post('/logout', logout);
router.get('/users', index);
router.delete('/users/:id', destroy);
router.put('/users/:id', update);

module.exports = router;
