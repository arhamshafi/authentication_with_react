import api from "../utils/api"

export const Login_service = async (formdata) => {
    try {
        const res = await api.post("/auth/getUser", formdata)
        const { user, message, emailVerified, token } = res.data

        return { user, message, token, success: true, emailVerified }
    } catch (err) {
        return { message: err.response?.data?.message || "Server Error", success: false }
    }
}

export const Register_service = async (formdata) => {
    try {
        const res = await api.post("/auth/register", formdata)
        const { success, message } = res.data
        return { message, success: true }
    } catch (err) {
        return { message: err?.response?.data?.message || "Server Error", success: false }
    }
}

export const Logout_service = async () => {
    try {
        const res = await api.post("/auth/logout")
        return { message: res.data.message, success: true }
    } catch (err) {
        return { message: err.response?.data?.message || "Server Error", success: false }
    }
}