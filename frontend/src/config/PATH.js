const ADMIN_PATH='/admin'
const COURSE_PATH='/course'

export const PATH = {
    index: '/',
    admin: {
        createAdmin: ADMIN_PATH + '/create-admin',
        createStudent: ADMIN_PATH + '/create-student',
        deleteStudent: ADMIN_PATH + '/delete-student'
    },
    course: {
        getAllCourse: COURSE_PATH + '/',
        getCourseWithID: COURSE_PATH + '/:id'
    },
    Page404: '/*'
}