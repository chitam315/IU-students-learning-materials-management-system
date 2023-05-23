import { api, ADMIN_API } from '../config/api'

export const adminService = {
    create(data) {
        const user = {
            username: data.username,
            password: data.password,
            email: data.email
        }
        return api.post(`${ADMIN_API}/create-admin`,user)
    },
}