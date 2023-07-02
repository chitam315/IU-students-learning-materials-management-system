import express from "express";
const router = express.Router();
// const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
import jwtAuth from "../app/middlewares/jwtAuth.js";

// import userController from '../app/controllers/UserController'
// const loginController = require("../app/controllers/loginController");
import authController from '../app/controllers/authController.js'

// router.post("/login-admin" ,authController.adminLogin);

// router.post("/login-student",authController.studentLogin);

router.post("/login",authController.userLogin)
router.post("/register",authController.userRegister)
router.patch("/update-password", jwtAuth, authController.updatePassword);
// router.patch("/update-email", jwtAuth, authController.updateEmail);

// module.exports = router;
export default router;