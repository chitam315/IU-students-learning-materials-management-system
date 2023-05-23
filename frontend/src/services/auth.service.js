import { api, AUTHENTICATION_API } from '../config/api'

export const authService = {
    login(data) {
        const user = {
            username: data.username,
            password: data.password
        }
        if (data.role == "admin") {
            return api.post(`${AUTHENTICATION_API}/login-admin`,user)
        }
        else {
            return api.post(`${AUTHENTICATION_API}/login-student`,user)
        }
    },
    // refreshToken(data){
    //     return api.post(`${AUTHENTICATION_API}/refresh-token`,data)
    // }
}