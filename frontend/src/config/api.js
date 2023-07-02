import axios from "axios";
import { getToken, setToken } from "../utils/token.js";

const AUTHENTICATION_API = import.meta.env.VITE_AUTHENTICATION_API;
const COURSE_API = import.meta.env.VITE_COURSE_API;
const ADMIN_API = import.meta.env.VITE_ADMIN_API;

const api = axios.create()

api.interceptors.response.use((res) => {
    return res.data
}, async (err) => {
    if (err.response.status === 403 & err.response.data.error_code === "TOKEN_EXPIRED") {
        try {
            const res = await authService.refreshToken({
                refreshToken: getToken().refreshToken
            })
            setToken(res.data)
            return api(err.config)
        } catch (error) {
            handleError(error)
        }
    }
    throw err
})

api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export {api,COURSE_API,AUTHENTICATION_API,ADMIN_API}
