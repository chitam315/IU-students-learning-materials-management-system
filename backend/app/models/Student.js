import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const schema = mongoose.Schema;

const Student = new schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
    minlength: [11, "Student ID only has 11 character"],
    maxlength: [11, "Student ID only has 11 character"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "Must be at least 6 characters"],
    maxlength: [30, "Must be less than or equal 30 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
});


Student.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  }
});

export default mongoose.model("student", Student);