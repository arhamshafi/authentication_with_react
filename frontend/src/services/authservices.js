import api from "../utils/api"

export const Register_service = async (formdata) => {
    try {
        const res = await api.post("/auth/register", formdata)
        const { user, token, message } = res.data
        sessionStorage.setItem("activeUser", JSON.stringify(user))
        sessionStorage.setItem("token", JSON.stringify(token))
        return { token, user, message, success: true }
    } catch (err) {
        return { message: err?.response?.data?.message || "server Error", success: false }
    }
}

export const Login_service = async (formdata) => {
    try {
        const res = await api.post("/auth/getUser", formdata)
        const { user, token, message } = res.data
        sessionStorage.setItem("activeUser", JSON.stringify(user))
        sessionStorage.setItem("token", JSON.stringify(token))
        return { user, token, message, success: true }
    } catch (err) {
        return { message: err.response?.data?.message || "server Error", success: false }
    }
}