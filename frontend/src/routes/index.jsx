import MainLayout from "../layouts/MainLayout";
// import Login from "../pages/login";
import Index from "../pages";
import AuthRouter from '../components/AuthRouter'
import { PATH } from "../config/PATH";
// import CreateStudent from '../pages/createStudent'
import Register from '../pages/register'
import UpdatePassword from '../pages/updatePassword'
import DeleteStudent from '../pages/deleteStudent'
import Page404 from '../pages/404'
import UpdateEmail from "../pages/updateEmail";
import CreateCourse from "../pages/createCourse";
import {AccessDocument} from "../pages/accessDocument"

export const routes = [
    {
        element: <MainLayout />,
        children: [
            {
                element: <Index/>,
                index: true
            },
            {
                element: <AuthRouter redirect={PATH.index} />,
                children: [
                    {
                        element: <Register/>,
                        path: PATH.admin.register
                    },
                    {
                        element: <DeleteStudent/>,
                        path: PATH.admin.deleteUser
                    },
                    {
                        element: <UpdatePassword/>,
                        path: PATH.admin.updatePassword
                    },
                    {
                        element: <UpdateEmail/>,
                        path: PATH.admin.updateEmail
                    }
                ]
            },
            {
                element: <AuthRouter redirect={PATH.index} />,
                children: [
                    {
                        element: <CreateCourse/>,
                        path: PATH.course.createCourse
                    },
                ]
            },
            {
                element: <AccessDocument/>,
                path: PATH.course.getAllCourse
            },
            {
                element: <Page404 />,
                path: PATH.Page404
            }
        ]
    }
]