const express = require('express')
const authRouter = express.Router();
const authController = require('../controllers/auth.controller')
const identifyUser = require('../middleware/auth.middleware')

authRouter.post('/register', authController.registerController)

authRouter.post('/login', authController.loginController)

/* GET /api/auth/get-me | returns the users info */

authRouter.get('/get-me', identifyUser, authController.getUserInfoController)

module.exports = authRouter;