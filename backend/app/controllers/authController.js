import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { catchAsync } from "../middlewares/async.js";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import ApiError from "../../utils/ApiError.js";
import { SERECT_KEY } from "../../config/index.js";

class AuthController {
  // [POST] /auth/login-admin
  adminLogin = catchAsync(async (req, res) => {
    var { username, password } = req.body;
    username = username.toUpperCase();
    const existedAdmin = await Admin.findOne({ username });
    console.log(existedAdmin);
    if (!existedAdmin) { throw new ApiError(400, "username  is not valid"); }

    const isMatch = await bcryptjs.compareSync(password, existedAdmin.password);
    if (!isMatch) { throw new ApiError(400, " password is not valid"); }
    const token = jwt.sign(
      {
        username: existedAdmin.username,
        role: 'admin'
      },
      SERECT_KEY,
      { expiresIn: "1d" } // s, m, h, d
    );
    res.status(200).json({ success: true, token: token, username });
  });

  // [POST] /auth/login-student
  studentLogin = catchAsync(async (req, res) => {
    var { username, password } = req.body;
    username = username.toUpperCase();
    const existedStudent = await Student.findOne({ username });
    console.log(existedStudent);
    if (!existedStudent) {
      throw new ApiError(400, "username  is not valid");
    }

    const isMatch = await bcryptjs.compareSync(
      password,
      existedStudent.password
    );
    if (!isMatch) {
      throw new ApiError(400, "password is not valid");
    }
    const token = jwt.sign(
      {
        username: existedStudent.username,
      },
      SERECT_KEY,
      { expiresIn: "1d" } // s, m, h, d
    );
    res.status(200).json({ success: true, token: token, username });
  });
}

export default new AuthController();
