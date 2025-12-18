import api from "../utils/api"

export const Add_course = async (data) => {

    console.log(data);
    
    const res = await api.post("/admin/add", data)
    const { message, success } = res.data
    return { message, success }
}