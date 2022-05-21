const express = require('express')
const UserController = require('../controllers/UserCtrl')
const router = express.Router();
router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);
router.get('/user/google', UserController.authGoogle);
module.exports = router