import { message } from 'antd'
import { createContext, useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { PATH } from '../../config/PATH'
import jwt_decode from "jwt-decode";
import { authService } from '../../services/auth.service'
import { clearToken, clearUser, getUser, setToken, setUser } from '../../utils/token'

const AuthContext = createContext({})


/**
 * this useContext is use to control user,login,logout
 * @returns user, login, logout, setUser
 */
const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const [user, _setUser] = useState(getUser)

    useEffect(() => {
        setUser(user || null)
    }, [user])

    const login = async (data) => {
        try {
            const res = await authService.login(data)
            if (res.token) {
                setToken(res.token)
                const decoded = jwt_decode(res.token)
                _setUser({username: decoded.username, role: decoded.role})
                message.success('Log in successfully')
            }
        } catch (error) {
            console.log(error)
            if (error?.response?.data?.message) {
                message.error(error.response.data.message)
            }
        }
    }

    const logout = () => {
        clearToken()
        clearUser()
        _setUser(null)
        message.success('Log out successfully')
    }

    return <AuthContext.Provider value={{ user, login, logout, setUser: _setUser }}>{children}</AuthContext.Provider>
}

export { useAuth, AuthProvider, AuthContext }