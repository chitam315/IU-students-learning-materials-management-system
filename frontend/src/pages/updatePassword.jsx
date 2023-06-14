import React, { useState } from "react";
import { required, minMax, reEnter, regexp } from "../utils/validate";
import { useAsync } from "../hooks/useAsync";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { PATH } from "../config/PATH";
import Input from "../components/Input";
import Button from "../components/Button";
import { message } from "antd";
import { authService } from "../services/auth.service";

function UpdatePassword() {
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const navigate = useNavigate();

  let rules = {
    username: [
      required(),
      minMax(6, 10, "username should have 6 to 10 characters"),
    ],
    password: [required(), minMax(6, 21)],
    rePassword: [required(), reEnter("password", "Incorrect password")],
    // email: [required(), regexp("email")],
  };

  const { loading, execute: signUpService } = useAsync(authService.updatePassword);

  const form = useForm(rules);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (form.validate()) {
      try {
        await signUpService(form.values);
        setIsCreateSuccess(true);
        message.success("Create admin successfully");
        navigate(PATH.index);
      } catch (err) {
        if (err.response?.data?.message) {
          message.error(err.response.data.message);
        }
        setIsCreateSuccess(false);
      } finally {
        // console.log(values);
      }
    }
  };

  return (
    <main className="auth" id="main">
      <div className="wrap">
        {/* login-form */}
        <div className="ct_login">
          <h2 className="title">UPDATE PASSWORD</h2>
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
          {/* <Input placeholder="EMAIL" {...form.register("email")}></Input> */}
          <Button onClick={onSubmit} Loading={loading}>
            CREATE
          </Button>
        </div>
      </div>
    </main>
  );
}

export default UpdatePassword;
