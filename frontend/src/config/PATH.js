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
        getCourseWithID: COURSE_PATH + '/:filename',
        createCourse: COURSE_PATH + '/create',
        getAllCourse: COURSE_PATH + '/',
        uploadFile: COURSE_PATH + '/upload'
    },
    Page404: '/*'
}