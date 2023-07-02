import mongoose from "mongoose";
const schema = mongoose.Schema;

const Course = new schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Title of course is required"],
    minlength: [6, "Name of course is too short"],
    maxlength: [100, "Name of course is too long"],
  },
  filename: {
    type: String,
  },
});


export default mongoose.model("course", Course);