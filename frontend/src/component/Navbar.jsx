import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import { FaUserCircle } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";


export default function Navbar() {

    const [user, setuser] = useState("")
    const [profile, setprofile] = useState(false)
    const dropdown = useRef(null)


    const LogOut = () => {
        sessionStorage.removeItem("activeUser")
        sessionStorage.removeItem("token")
        setuser("")
        toast.success("logOut")
    }

    useEffect(() => {
        const storedUser = sessionStorage.getItem("activeUser")
        if (storedUser) setuser(JSON.parse(storedUser))
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                setprofile(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <nav className={` w-full h-1/12 bg-yellow-300 flex justify-between items-center ${user.role == "admin" ?"px-5" : "px-10" } fixed top-0 left-0 `}>
            <div className='w-max h-max font-bold text-black text-3xl '>LOGO</div>

            <ul className='flex justify-center items-center gap-5 text-black text-md font-bold cursor-pointer '>
                <Link to={"/"} ><li>Home</li></Link>
                <Link to={"/courses"} ><li>Courses</li></Link>
                <li onClick={() => toast.error("not in use")}>Dashboard</li>
                <li onClick={() => toast.error("not in use")}>Contact</li>
            </ul>

            <div className='flex justify-center items-center gap-2'>
                {
                    !user ? (
                        <>
                            <Link to={"/signup"}><button className='py-2 px-5 rounded-lg bg-black text-white active:scale-95 transition-all duration-150 ease-linear cursor-pointer'>Sign up</button></Link>
                            <Link to={"/signin"}><button className='py-2 px-5 rounded-lg bg-black text-white cursor-pointer active:scale-95 transition-all duration-150 ease-linear'>Login</button></Link>
                        </>
                    ) : (
                        <>
                            <button className='py-1 px-3 bg-black text-white cursor-pointer rounded-lg' onClick={LogOut} >LogOut</button>
                            <FaUserCircle className='text-3xl cursor-pointer text-black ml-2' onClick={() => setprofile(true)} />
                            {
                                user && user.role == "admin" && (
                                    <Link to={"/adminDashboard"}><FaCrown className='text-yellow-800 text-3xl cursor-pointer ' /></Link>
                                )
                            }
                        </>
                    )
                }
                <div ref={dropdown} className={` w-75 h-max p-7 bg-white fixed rounded-xl transition-all text-black duration-200 ease-in-out top-24 ${profile ? "right-5 opacity-100 " : "-right-5 opacity-0 "} `}>
                    <FaUserCircle className='text-6xl cursor-pointer mx-auto mt-4 text-black ' />
                    <h1 className='text-center mt-5 text-2xl font-bold'>Profile</h1>

                    <div className='flex mt-5 items-center '>
                        <p className='font-bold w-20 text-xl '>Name : </p>
                        <p className='text-md text-black capitalize '>{user ? user.name : "--/--"}</p>
                    </div>
                    <div className='flex mt-2 items-center '>
                        <p className='font-bold w-20 text-xl '>Email : </p>
                        <p className='text-sm text-black'>{user ? user.email : "--/--"}</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}
