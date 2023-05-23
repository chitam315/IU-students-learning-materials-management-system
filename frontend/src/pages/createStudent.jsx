import React, { useState } from "react";
import { studentService } from "../services/student.service";
import { required, minMax,reEnter, regexp } from "../utils/validate";
import { useAsync } from "../hooks/useAsync";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { PATH } from "../config/PATH";
import Input from "../components/Input";
import Button from "../components/Button";
import { message } from "antd";

function CreateStudent() {
  // const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const navigate = useNavigate()

  let rules = {
    username: [required(), minMax(11, 11, "Student ID have 11 characters")],
    password: [required(), minMax(6, 21)],
    rePassword: [required(), reEnter("password", "Incorrect password")],
    email: [required(),regexp('email')]
  };

  const { loading, execute: signUpService } = useAsync(studentService.create);

  const form = useForm(rules)

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (form.validate()) {
        try {
            await signUpService(form.values)
                // setIsCreateSuccess(true)
                message.success('Create student successfully',6000)
                navigate(PATH.index)
        } catch (err) {
            if (err.response?.data?.message) {
                message.error(err.response.data.message)
            }
            // setIsCreateSuccess(false)
        }
        finally {
            // console.log(values);
        }
    }
}

  return (
    <main className="auth" id="main">
      <div className="wrap">
        {/* login-form */}
        <div className="ct_login">
          <h2 className="title">CREATE STUDENT</h2>
          <Input placeholder="USERNAME" {...form.register("username")}></Input>
          <Input
            type="password"
            placeholder="PASSWORD"
            {...form.register("password")}
          ></Input>
          <Input
            type="password"
            placeholder="ENTER PASSWORD AGAIN"
            {...form.register("rePassword")}
          ></Input>
          <Input
            placeholder="EMAIL"
            {...form.register("email")}
          ></Input>
          <Button onClick={onSubmit} Loading={loading}>
            CREATE
          </Button>
        </div>
      </div>
    </main>
  );
}

export default CreateStudent;
