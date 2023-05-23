import bcyptjs from "bcryptjs";
import { catchAsync } from "../middlewares/async.js";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import ApiError from "../../utils/ApiError.js";

class adminController {
  // [POST] /create-admin
  createAdmin = catchAsync(async (req, res, next) => {
    var { username, password, email } = req.body;
    const admin = new Admin({
      username: username.toUpperCase(),
      password,
      email,
    });
    await admin.save().then(() => res.status(201).json({ success: true }));
  });

  // [POST] /create-student
  createStudent = catchAsync(async (req, res, next) => {
    var { username, password, email } = req.body;
    const student = await new Student({
      username: username.toUpperCase(),
      password,
      email,
    });
    await student.save().then(() => res.status(201).json({ success: true }));
  });

  // [DELETE] /delete/:id
  deleteUser = catchAsync(async (req, res, next) => {
    if (req.body.role == "student") {
      await Student.deleteOne({
        username: req.params.username.toUpperCase(),
      }).then(() => {
        res.status(200).json({ success: true });
      });
    } else {
      await Admin.deleteOne({
        username: req.params.username.toUpperCase(),
      }).then(() => {
        res.status(200).json({ success: true });
      });
    }
  });

  // [PATCH] /update-password
  updatePassword = catchAsync(async (req, res, next) => {
    const { username, oldPassword, newPassword } = req.body;
    const admin = await Admin.findOne({ username: username.toUpperCase() });
    const isMatch = bcyptjs.compareSync(oldPassword, admin.password);
    if (!isMatch) {
      throw new ApiError(400, "Old password is not correct");
    } else {
      admin.password = newPassword;
      await admin.save();
      res.status(200).json({ success: true });
    }
  });

  // [PATCH] /update-email
  updateEmail = catchAsync(async (req, res, next) => {
    const { username, newEmail } = req.body;
    const admin = await Admin.findOneAndUpdate({ username }, { email });
    res.status(200).json({ success: true });
  });
}

export default new adminController();
