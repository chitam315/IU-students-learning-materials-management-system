import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Select } from "../components/Select";
import Field from "../components/Field";
import "./style.scss";
import { useAuth } from "../components/AuthContext";
import { PATH } from "../config/PATH";
import { useAsync } from "../hooks/useAsync";
import { useForm } from "../hooks/useForm";
import { minMax, regexp, required } from "../utils/validate";
import {Login} from "./login.jsx";
import { AdminIndex } from "./adminIndex";
import { StudentIndex } from "./studentIndex";


function index() {
  const { user, login } = useAuth();
  const { execute: loginService, loading } = useAsync(login);
  const rules = {
    username: [required(), minMax(6)],
    password: [required(), minMax(6)],
    role: [required()]
  };

  const form = useForm(rules);
  const onLogin = (ev) => {
    console.log("click");
    ev.preventDefault();
    if (form.validate()) {
      console.log("validate successfully");
      loginService(form.values);
    }
  };

  if (user?.role == "admin") {
    return <AdminIndex user={user}/>;
  } else if (user?.role == "student") {
    return <StudentIndex user={user}/>
  }

  return (
    <Login form={form} onLogin={onLogin} loading={loading}/>
  );
}

export default index;
