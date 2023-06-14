const ADMIN_PATH='/admin'
const COURSE_PATH='/course'

export const PATH = {
    index: '/',
    admin: {
        register: ADMIN_PATH + '/register',
        deleteUser: ADMIN_PATH + '/delete',
        updatePassword: ADMIN_PATH + 'update-password',
        updateEmail: ADMIN_PATH + 'update-email',
    },
    course: {
        getAllCourse: COURSE_PATH + '/',
        getCourseWithID: COURSE_PATH + '/:id'
    },
    Page404: '/*'
}