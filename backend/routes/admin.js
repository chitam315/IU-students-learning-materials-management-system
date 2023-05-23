import express from "express";
const router = express.Router();
import Student from "../app/models/Student.js";
import Admin from "../app/models/Admin.js";
import ApiError from "../utils/ApiError.js";
import { catchAsync } from "../app/middlewares/async.js";

import adminController from "../app/controllers/adminController.js";
import jwtAuth from "../app/middlewares/jwtAuth.js";

const checkExistUser = catchAsync(async (req, res, next) => {
  var username = req.params.username;
  var role = req.body.role;
  var existUser = null;
  if (role == "student") {
    existUser = await Student.findOne({ username: username.toUpperCase() });
  } else {
    existUser = await Admin.findOne({ username: username.toUpperCase() });
  }
  if (existUser != null) {
    next();
  } else {
    throw new ApiError(401, "User not exist");
  }
});
// router.get('/',studentController.get)

router.post("/create-admin", jwtAuth, adminController.createAdmin);
router.post("/create-student", jwtAuth, adminController.createStudent);
router.delete(
  "/delete-user/:username",
  jwtAuth,
  checkExistUser,
  adminController.deleteUser
);
router.patch("/update-password", jwtAuth, adminController.updatePassword);
router.patch("/update-email", jwtAuth, adminController.updateEmail);

export default router;
