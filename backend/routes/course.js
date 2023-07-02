import express from 'express';
const router = express.Router();

import courseController from '../app/controllers/courseController.js';
import jwtAuth from '../app/middlewares/jwtAuth.js';
import { upload } from '../app/middlewares/upload.js';
import { uploadMongo } from '../app/middlewares/uploadMongo.js';
import Course from '../app/models/Course.js';

// router.post('/create-course',jwtAuth,courseController.createCourse)
router.delete('/delete/:id',jwtAuth,courseController.deleteCourse)
router.get('/:id',jwtAuth,courseController.getCourseWithID)

// router.post('/test-multer',upload.fields([{name: "image", maxCount: 3},{name: "avatar", maxCount: 2}]),(req,res) => {
//     // 1 file: upload.single()
//     // multiple files: upload.array(name of field, maximum number of files)
//     let len
//     if (req.files.length) {
//         // In case there is only 1 field
//         len = req.files.length
//     } else {
//         len = Object.keys(req.files).reduce((accumulator,currentValue) => {
//             return accumulator + req.files[currentValue].length
//         },0)
//     }
//     res.json({
//         success: true,
//         message: `successfully upload ${len} ${len > 1 ? "files" : "file"}`
//     })
//     // console.log(req.files);
// })

router.post('/create-course',uploadMongo.single('file'),async (req,res) => {
    // console.log(req.file);
    var { title } = req.body;
    const filename = req.file.filename
    console.log(`title is : ${title} ; file name is : ${filename}`);
    const course = new Course({ title, filename });
    await course.save().then(() => res.status(201).json({ success: true, message: `successfully upload ${filename} file` }));
})

router.get('/',jwtAuth,courseController.getAllCourses)

export default router