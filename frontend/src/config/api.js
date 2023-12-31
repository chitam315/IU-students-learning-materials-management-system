import axios from "axios";
import { getToken, setToken, clearToken, clearUser } from "../utils/token.js";
import { authService } from "../services/auth.service.js";
import { useAuth } from "../components/AuthContext/index.jsx";
import { message } from "antd";

const AUTHENTICATION_API = import.meta.env.VITE_AUTHENTICATION_API;
const COURSE_API = import.meta.env.VITE_COURSE_API;
const ADMIN_API = import.meta.env.VITE_ADMIN_API;

const api = axios.create()

api.interceptors.response.use((res) => {
    return res.data
}, async (err) => {
    if (err.response.status === 403 & err.response.data.message === "Token is expired!") {
        try {
            const curRefreshToken = getToken().refreshToken
            const resToken = await authService.getNewAccessToken({
                refreshToken: curRefreshToken
            })
            setToken({
                accessToken: resToken.data.accessToken,
                refreshToken: curRefreshToken
            })
            return api(err.config)
        } catch (error) {
            // handleError(error)
            throw error
        }
    }
    throw err
})

api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers['Authorization'] = `Bearer ${token.accessToken}`
    }
    return config
})

export {api,COURSE_API,AUTHENTICATION_API,ADMIN_API}
