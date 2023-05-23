import { api, COURSE_API } from "../config/api"

export const courseService = {
    getAllCourses() {
        return api.get(`${COURSE_API}/`)
    },

    getCourseWithID(id) {
        return api.get(`${COURSE_API}/${id}`);
    },

    createCourse(){
        return api.post(`${COURSE_API}/create-course`)
    }
}