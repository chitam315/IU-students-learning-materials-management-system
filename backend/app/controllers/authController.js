import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { catchAsync } from "../middlewares/async.js";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import ApiError from "../../utils/ApiError.js";
import { SERECT_KEY } from "../../config/index.js";
import User from "../models/User.js";

class AuthController {
  // [POST] /login
  userLogin = catchAsync(async (req, res) => {
    var { username, password } = req.body;
    username = username.toUpperCase();
    const existedUser = await User.findOne({ username });
    if (!existedUser) {
      throw new ApiError(400, "username is not valid");
    }

    const isMatch = await bcryptjs.compareSync(password, existedUser.password);
    if (!isMatch) {
      throw new ApiError(400, " password is not valid");
    }
    const token = jwt.sign(
      {
        username: existedUser.username,
        role: existedUser.role,
      },
      SERECT_KEY,
      { expiresIn: "1d" } // s, m, h, d
    );

    res.status(200).json({ success: true, token, username });
  });

  // [POST] /register
  userRegister = catchAsync(async (req, res) => {
    var { username, password, role, email } = req.body;
    const user = new User({
      username: username.toUpperCase(),
      password,
      email,
      role,
    });
    await user.save().then(() => res.status(201).json({ success: true }));
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
    const { username, oldEmail, newEmail } = req.body;
    const admin = await Admin.findOneAndUpdate({ username,oldEmail }, { newEmail });
    res.status(200).json({ success: true });
  });
}

export default new AuthController();
