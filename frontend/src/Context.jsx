import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Add_course, UpdateCousrService } from "./services/admin";
import { GetDetailService, SelectedCourseServices } from "./services/user";
import api from "./utils/api";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {


    const [formdata, setformdata] = useState({ title: "", duration: "", skill: "", description: "" })
    const [updateformdata, setupdateformdata] = useState({ title: "", duration: "", skill: "", description: "" })
    const [EditFormVisible, setEditFormVisible] = useState(false)
    const [frmLoader, setfrmLoader] = useState(false)
    const [courses, setcourse] = useState([])
    const [me, setme] = useState(null)
    const [selectCoursebyUser, setselectCoursebyUser] = useState([])


    const adminformhandler = (e) => {
        const { name, value } = e.target
        setformdata({ ...formdata, [name]: value })
    }
    const updateHnalder = (e) => {
        const { name, value } = e.target
        setupdateformdata({ ...updateformdata, [name]: value })
    }
    const addCourse = async (e) => {
        e.preventDefault()
        try {
            const { title, description, skill, duration } = formdata
            if (!title || !description || !skill || !duration) return toast.error("All Fields Must Be Required")
            setfrmLoader(true)

            const res = await Add_course(formdata)
            if (res.success) {
                toast.success("Successfully Added")
                setformdata({ title: "", duration: "", skill: "", description: "" })
                FetchAllCourses()
            }

        } catch (err) {
            toast.error(err?.response?.data?.message)
        }
        finally {
            setfrmLoader(false)
        }
    }
    const FetchAllCourses = async () => {
        try {

            const res = await GetDetailService()
            if (res.success) {
                setcourse(res.details)
            }

        } catch (err) {
            toast.error(err?.response?.data?.message || "Server issue")
        }
    }
    const UpdateCourseDetails = async (e) => {
        e.preventDefault()
        try {
            const { title, description, skill, duration } = updateformdata
            if (!title || !description || !skill || !duration) return toast.error("All Fields Must Be Required")
            setfrmLoader(true)
            const res = await UpdateCousrService(updateformdata)
            if (res.success) {
                toast.success(res.message)
                setupdateformdata({ id: "", title: "", duration: "", skill: "", description: "" })
                setEditFormVisible(false)
                FetchAllCourses()
            }

        } catch (err) {
            toast.error(err?.response?.data?.message)
        } finally {
            setfrmLoader(false)
        }
    }
    const userMe = async () => {
        try {
            const crntuser = sessionStorage.getItem("activeUser") ? JSON.parse(sessionStorage.getItem("activeUser")) : null

            if (!crntuser) {
                setme(null)
                setselectCoursebyUser([])
                return
            }
            const res = await api.post(`/user/me/${crntuser.email}`)
            const { crnt } = res.data
            setme(crnt)
            setselectCoursebyUser(crnt?.selectedCourses || [])
        } catch (err) {
            console.log(err?.response?.data?.message);
            setme(null)
            setselectCoursebyUser([])
        }
    }
    const handleSelectCourse = async (id) => {
        if (selectCoursebyUser.includes(id)) {
            toast.error("Course already selected!");
            return;
        }

        try {
            const updated = [...selectCoursebyUser, id];
            const res = await SelectedCourseServices(updated);

            if (res.success) {
                toast.success(res.message);
                await userMe(); 
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };


    useEffect(() => { 
        FetchAllCourses()
        userMe() 
    }, [])

   

    return (
        <AppContext.Provider value={{
            adminformhandler, addCourse, frmLoader, formdata, setfrmLoader, courses, setupdateformdata, me, handleSelectCourse, selectCoursebyUser, userMe,
            FetchAllCourses, UpdateCourseDetails, updateformdata, updateHnalder, EditFormVisible, setEditFormVisible, setselectCoursebyUser
        }} >
            {children}
        </AppContext.Provider>
    )
}