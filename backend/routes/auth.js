import express from "express";
const router = express.Router();
// const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')

// import userController from '../app/controllers/UserController'
// const loginController = require("../app/controllers/loginController");
import authController from '../app/controllers/authController.js'

router.post("/login-admin" ,authController.adminLogin);

router.post("/login-student",authController.studentLogin);

// module.exports = router;
export default router;