import MainLayout from "../layouts/MainLayout";
// import Login from "../pages/login";
import Index from "../pages";
import AuthRouter from '../components/AuthRouter'
import { PATH } from "../config/PATH";
import CreateStudent from '../pages/createStudent'
import CreateAdmin from '../pages/createAdmin'
import DeleteStudent from '../pages/deleteStudent'
import Page404 from '../pages/404'

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
                        element: <CreateStudent/>,
                        path: PATH.admin.createStudent
                    },
                    {
                        element: <DeleteStudent/>,
                        path: PATH.admin.deleteStudent
                    },
                    {
                        element: <CreateAdmin/>,
                        path: PATH.admin.createAdmin
                    },
                ]
            },
            {
                element: <Page404 />,
                path: PATH.Page404
            }
        ]
    }
]