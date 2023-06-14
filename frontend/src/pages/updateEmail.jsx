import React, { useState } from "react";
import { adminService } from "../services/admin.service";
import { required, minMax, reEnter, regexp } from "../utils/validate";
import { useAsync } from "../hooks/useAsync";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { PATH } from "../config/PATH";
import Input from "../components/Input";
import Button from "../components/Button";
import { message } from "antd";
import { authService } from "../services/auth.service";

function UpdateEmail() {
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const navigate = useNavigate();

  let rules = {
    username: [
      required(),
      minMax(6, 10, "username should have 6 to 10 characters"),
    ],
    oldEmail: [required(), regexp("email")],
    newEmail: [required(), regexp('email')],
    newemailagain: [required(), reEnter('newemail')]

  };

  const { loading, execute: signUpService } = useAsync(authService.updateEmail);

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
          <h2 className="title">UPDATE EMAIL</h2>
          <Input placeholder="USERNAME" {...form.register("username")}></Input>
          <Input
            placeholder="OLD EMAIL"
            {...form.register("oldEmail")}
          ></Input>
          <Input
            placeholder="NEW EMAIL"
            {...form.register("newEmail")}
          ></Input>
          <Input
            placeholder="ENTER NEW EMAIL AGAIN"
            {...form.register("newemailagain")}
          ></Input>
          <Button onClick={onSubmit} Loading={loading}>
            CREATE
          </Button>
        </div>
      </div>
    </main>
  );
}

export default UpdateEmail;
