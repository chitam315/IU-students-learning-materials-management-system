import React from "react";
import { courseService } from "../services/course.service";
import { useFetch } from "../hooks/useFetch.js";
import Skeleton from "../components/Skeleton"
import { Link } from "react-router-dom";
import { PATH } from "../config/PATH";

export const AdminIndex = ({user}) => {
//   const {data,error,loading,status} = useFetch(courseService.getAllCourses);

//   console.log(data);

//   if (!loading) {
//     console.log(data);
//     return <Skeleton width={"100%"} height={"100%"}/>
//   }

  return (
    <div id="adminIndex">
        <div className="flex-box">
            <div className="title">Hello {user.username}. Welcome to IU.</div>
            <div className="flex-box-mini">
                <Link to={PATH.admin.createStudent}>CREATE STUDENT</Link>
                <Link to={PATH.admin.deleteStudent}>DELETE USER</Link>
                <Link to={PATH.admin.createAdmin}>CREATE ADMIN</Link>
            </div>
        </div>
    </div>
  );
};
