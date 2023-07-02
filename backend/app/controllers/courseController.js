import { catchAsync } from "../middlewares/async.js";
import Course from "../models/Course.js";
// import Student from "../models/Student.js";

class courseController {
    // [GET] /course/:id
    getCourseWithID = catchAsync( async(req,res,next) => {
        var _id = req.params.id
        const course = await Course.findOne({_id})
        res.status(200).json({ success: true, data: course})
    })

    getAllCourses = catchAsync( async(req,res,next) => {
      const courses = await Course.find({})
      res.status(200).json({success: true, data: courses.map(course => ({
        _id: course._id,
        title: course.title,
        filename: course.filename
    }))})
    })

  // [POST] /course/create-course
  createCourse = catchAsync(async (req, res, next) => {
    var { title,books, filename } = req.body;
    const course = new Course({ title,books, filename });
    await course.save().then(() => res.status(201).json({ success: true }));
  });

  // [DELETE] /course/delete/:id
  deleteCourse = catchAsync(async (req, res, next) => {
    await Course.deleteOne({
      id: req.params.id,
    }).then(() => {
      res.status(200).json({ success: true });
    });
  });
}

export default new courseController();
