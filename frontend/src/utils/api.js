import axios from "axios";

const Api_base_url = "http://localhost:5656/studentdata"
const api = axios.create({
    baseURL: Api_base_url,
    headers: { "Content-Type": "application/json" }
})

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response, (error) => {
        if (error.response?.status == 401) {
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("activeUser")
            window.location.href = "/signin"
        }
        return Promise.reject(error)
    }
)

export default api