import api from "../utils/api"

export const Add_course = async (data) => {

    const res = await api.post("/admin/add", data)
    const { message, success } = res.data
    return { message, success }
}

export const DelServices = async (_id) => {

    const res = await api.post("/admin/del", { _id })
    const { message, success } = res.data
    return { message, success }
}
export const UpdateCousrService = async (data) => {

    const res = await api.put(`/admin/update/${data.id}`, data)
    const { message, success } = res.data
    return { message, success }
}