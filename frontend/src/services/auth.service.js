import axios from "axios";
import { api, AUTHENTICATION_API } from "../config/api";

export const authService = {
  // login(data) {
  //     const user = {
  //         username: data.username,
  //         password: data.password
  //     }
  //     if (data.role == "admin") {
  //         return api.post(`${AUTHENTICATION_API}/login-admin`,user)
  //     }
  //     else {
  //         return api.post(`${AUTHENTICATION_API}/login-student`,user)
  //     }
  // },
  login(data) {
    const user = {
      username: data.username,
      password: data.password,
    };
    return api.post(`${AUTHENTICATION_API}/login`, user);
  },
  register(data) {
    const user = {
      username: data.username,
      password: data.password,
      email: data.email,
      role: data.role
    };
    return api.post(`${AUTHENTICATION_API}/register`, user);
  },
  updatePassword(data){
    const user={
      username: data.username,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    }
    return api.patch(`${AUTHENTICATION_API}/update-password`,user)
  },
  updateEmail(data){
    const user={
      username: data.username,
      oldEmail: data.oldEmail,
      newEmail: data.newEmail
    }
    return api.patch(`${AUTHENTICATION_API}/update-email`,user)
  },
  getNewAccessToken(data){
      return axios.post(`${AUTHENTICATION_API}/token`,{},{
        headers: {
          Authorization: `Bearer ${data.refreshToken}`
        }
      })
  }
};
