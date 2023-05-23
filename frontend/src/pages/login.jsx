import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Select } from "../components/Select";
import Field from "../components/Field";

export const Login = ({form,onLogin,loading}) => {
  return (
    <main className="auth" id="main">
      <div className="wrap">
        {/* login-form */}
        <div className="ct_login">
          <h2 className="title">LOG IN</h2>
          <Input placeholder="USERNAME" {...form.register("username")}></Input>
          <Input
            type="password"
            placeholder="PASSWORD"
            {...form.register("password")}
          ></Input>
          <Field
            label="Your role:"
            {...form.register("role")}
            renderInput={(error, props) => (
              <Select
                {...props}
                error={error}
                placeholder={"Your role"}
                option={[
                  { value: "admin", label: "ADMIN" },
                  {
                    value: "student",
                    label: "STUDENT",
                  },
                ]}
              />
            )}
          />
          <Button onClick={onLogin} Loading={loading}>
            Login
          </Button>
        </div>
      </div>
    </main>
  );
}
