import api from "../utils/api"

export const Login_service = async (formdata) => {
    try {
        const res = await api.post("/auth/getUser", formdata)
        const { user, token, message } = res.data

        const minimalUser = { email: user.email, name: user.name , role : user.role }
        sessionStorage.setItem("activeUser", JSON.stringify(minimalUser))
        sessionStorage.setItem("token", token)

        return { user, token, message, success: true }
    } catch (err) {
        return { message: err.response?.data?.message || "Server Error", success: false }
    }
}

export const Register_service = async (formdata) => {
    try {
        const res = await api.post("/auth/register", formdata)
        const { user, token, message } = res.data
        const minimalUser = { email: user.email, name: user.name , role : user.role }
        sessionStorage.setItem("activeUser", JSON.stringify(minimalUser))
        sessionStorage.setItem("token", token)

        return { token, user, message, success: true }
    } catch (err) {
        return { message: err?.response?.data?.message || "Server Error", success: false }
    }
}
