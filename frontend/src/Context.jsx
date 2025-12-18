import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { Add_course } from "./services/admin";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {


    const [formdata, setformdata] = useState({ title: "", duration: "", skill: "", description: "" })
    const [frmLoader, setfrmLoader] = useState(false)

    const adminformhandler = (e) => {
        const { name, value } = e.target
        setformdata({ ...formdata, [name]: value })
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
            }

        } catch (err) {
            toast.error(err?.response?.data?.message)
        }
        finally {
            setfrmLoader(false)
        }
    }



    return (
        <AppContext.Provider value={{ adminformhandler, addCourse, frmLoader, formdata, setfrmLoader }} >
            {children}
        </AppContext.Provider>
    )
}
