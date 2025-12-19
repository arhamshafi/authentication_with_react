import api from "../utils/api"

export const GetDetailService = async () => {

    const res = await api.get("/user/getDetails")
    const { details, success } = res.data
    return { details, success }
}
export const SelectedCourseServices = async (course) => {

    const res = await api.post("/user/selectedCourse", course)
    const { message, success } = res.data
    return { message, success }
}

export const UpdateProfile_service = async (data) => {

    const res = await api.put("/user/updateProfile", data)
    const { message, success, user } = res.data
    return { message, success, user }
}
export const deeleteSelectedCourse = async (id) => {

    const res = await api.delete(`/user/${id}`)
    const { message, success } = res.data
    return { message, success }
}