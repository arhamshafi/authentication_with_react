import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Add_course, UpdateCousrService } from "./services/admin";
import { GetDetailService, GetMeService, SelectedCourseServices } from "./services/user";
import { AIchatService } from "./services/aiChat";


export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [formdata, setformdata] = useState({ title: "", duration: "", skill: "", description: "" })
    const [updateformdata, setupdateformdata] = useState({ title: "", duration: "", skill: "", description: "" })
    const [EditFormVisible, setEditFormVisible] = useState(false)
    const [frmLoader, setfrmLoader] = useState(false)
    const [courses, setcourse] = useState([])
    const [me, setme] = useState(null)
    const [selectCoursebyUser, setselectCoursebyUser] = useState([])
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setopen] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text: 'Hello! I am your AI assistant. How can I help you today?',
        }
    ]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;
        try {
            const userMessage = input;
            setInput("");
            setLoading(true);
            setMessages(prev => [...prev, { role: "user", text: userMessage }]);
            const res = await AIchatService(userMessage)
            if (res.success) {
                setMessages(prev => [...prev, { role: "bot", text: res.reply }])
            }
        } catch (err) {
            console.log(err?.response?.data?.message);
        } finally {
            setLoading(false)
        }
    }
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
        } finally {
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
    const handleSelectCourse = async (id) => {
        if (authLoading) return

        if (!me) {
            toast.error("Please sign in first")
            return
        }
        if (selectCoursebyUser.includes(id)) {
            toast.error("Course already selected!");
            return;
        }

        try {
            const updated = [...selectCoursebyUser, id];
            const res = await SelectedCourseServices(updated);

            if (res.success) {
                toast.success(res.message);
                await GetMe()
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };
    const GetMe = async () => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return
            const res = await GetMeService()
            if (res.success) {
                setme(res.user)
                setselectCoursebyUser(res.user.selectedCourses || [])
            }
        } catch (err) {
            console.log(err?.response?.data?.message)
        } finally {
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        FetchAllCourses()
        GetMe()
    }, [])

    return (
        <AppContext.Provider value={{
            adminformhandler, addCourse, frmLoader, formdata, setfrmLoader, courses, setupdateformdata, me, setme, handleSelectCourse, selectCoursebyUser, open, setopen, authLoading,
            FetchAllCourses, UpdateCourseDetails, updateformdata, updateHnalder, EditFormVisible, setEditFormVisible, setselectCoursebyUser, messages, input, setInput, loading, sendMessage, GetMe
        }} >
            {children}
        </AppContext.Provider>
    )
}