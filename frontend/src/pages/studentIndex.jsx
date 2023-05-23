import React from "react";
import { courseService } from "../services/course.service";
import { useFetch } from "../hooks/useFetch.js";
import Skeleton from "../components/Skeleton";
import { Link, generatePath } from "react-router-dom";
import { PATH } from "../config/PATH";

export const StudentIndex = ({ user }) => {
  var { data, loading } = useFetch(() => {
    return courseService.getAllCourses();
  });

  var pathArray = [];

  if (!loading) {
    var courses = data.data;
    console.log('course is :',courses);
    courses.forEach(course => {
      pathArray.push(generatePath(PATH.course.getCourseWithID, { id: course._id }))
    });

    return (
      <div id="adminIndex">
        <div className="flex-box">
          <div className="title">Hello {user.username}. Welcome to IU.</div>
          <div className="flex-box-mini">
            {courses.map((course, i) => (
              <Link to={pathArray[i]} key={i}>
                {course.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <h1>LOADING</h1>;
};
