import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import ApiError from "../../utils/ApiError.js";

const schema = mongoose.Schema;

const Admin = new schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
    minlength: [6, "Must be at least 6 characters"],
    maxlength: [30, "Must be less than or equal 30 characters"],
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

Admin.pre("save", function (next) {
  if (this.isModified("password")) {
    console.log('password modified');
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  }
  console.log('this.isNew is : ',this.isNew);
  throw new ApiError(400,'New password must be different with old Password')
});

export default mongoose.model("admin", Admin);
