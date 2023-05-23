import express from 'express';
const router = express.Router();

import courseController from '../app/controllers/courseController.js';
import jwtAuth from '../app/middlewares/jwtAuth.js';

router.post('/create-course',jwtAuth,courseController.createCourse)
router.delete('/delete/:id',jwtAuth,courseController.deleteCourse)
router.get('/:id',jwtAuth,courseController.getCourseWithID)
router.get('/',jwtAuth,courseController.getAllCourses)

export default router
