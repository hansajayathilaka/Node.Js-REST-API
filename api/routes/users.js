const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const UsersControllers = require('../controllers/users');


router.post('/signup', UsersControllers.signup_user);
router.delete('/:_id', checkAuth, UsersControllers.delete_user);
router.post('/login',UsersControllers.login_user );

module.exports = router;