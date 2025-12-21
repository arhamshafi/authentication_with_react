import axios from "axios"

const BASE_URL = "http://localhost:5656/studentdata"

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type ": "application/json"
    }
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const authStatus = error?.response?.data?.authStatus;
        const skipRedirect = error?.config?.headers?.["X-Skip-Auth-Redirect"];
        if (!skipRedirect && (status === 401 || authStatus === "NO_TOKEN" || authStatus === "INVALID")) {
            console.log("🔒 Auth failed — clearing token and redirecting to signin");
            localStorage.removeItem("token")
            window.location.href = "/signin"
        }

        return Promise.reject(error);
    }
);


export default api