import React, { useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaCrown,
    FaHome,
    FaBook,
    FaChartBar,
    FaEnvelope,
    FaSignInAlt,
    FaUserPlus,
    FaSignOutAlt,
    FaTimes
} from "react-icons/fa";
import { AppContext } from '../Context';
import { Logout_service } from '../services/authservices';

export default function Navbar() {

    const { me, setme, setselectCoursebyUser } = useContext(AppContext)
    const navigate = useNavigate()

    const [profile, setprofile] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const dropdown = useRef(null)
    const mobileMenuRef = useRef(null)

    const LogOut = async () => {
        try {
            const res = await Logout_service()
            if (res.success) {
                setme(null)
                setselectCoursebyUser([])
                toast.success(res.message)
            }
        } catch (err) {
            toast.error(er?.response?.data?.message)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                setprofile(false)
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
                !event.target.closest('.mobile-menu-btn')) {
                setMobileMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <nav className={`w-full bg-linear-to-r from-gray-900 to-black text-white shadow-2xl fixed top-0 left-0 z-50 ${me?.role === "admin" ? "px-4 md:px-8" : "px-4 md:px-12"}`}>
            <div className="container mx-auto">
                <div className="flex justify-between items-center h-20">

                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">A</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                ARTech
                            </h1>
                            <p className="text-xs text-gray-400">Learn. Grow. Succeed</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        <ul className='flex items-center space-x-1'>
                            <Link to="/">
                                <li className="group px-5 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2">
                                    <FaHome className="text-blue-400 group-hover:text-blue-300" />
                                    <span className="font-medium">Home</span>
                                </li>
                            </Link>

                            <Link to="/courses">
                                <li className="group px-5 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2">
                                    <FaBook className="text-green-400 group-hover:text-green-300" />
                                    <span className="font-medium">Courses</span>
                                </li>
                            </Link>
                            {
                                me?.role === "admin" ? (
                                    <>
                                        <Link to="/adminDashboard">
                                            <li className="group px-5 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2 cursor-pointer">
                                                <FaChartBar className="text-yellow-400 group-hover:text-yellow-300" />
                                                <span className="font-medium">Dashboard</span>
                                            </li>
                                        </Link>
                                    </>
                                ) : (
                            <>
                                <Link to="/stdDashboard">
                                    <li className="group px-5 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2 cursor-pointer">
                                        <FaChartBar className="text-yellow-400 group-hover:text-yellow-300" />
                                        <span className="font-medium">Dashboard</span>
                                    </li>
                                </Link>

                                <li
                                    onClick={() => toast.error("Contact feature under development")}
                                    className="group px-5 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                                >
                                    <FaEnvelope className="text-red-400 group-hover:text-red-300" />
                                    <span className="font-medium">Contact</span>
                                </li>

                            </>
                            )
                            }




                        </ul>
                    </div>

                    <div className="flex items-center space-x-4">
                        {!me ? (
                            <>
                                <Link to="/signin" className="hidden md:block">
                                    <button className="group px-6 py-2.5 rounded-lg bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 transition-all duration-300 flex items-center space-x-2">
                                        <FaSignInAlt className="group-hover:scale-110 transition-transform" />
                                        <span>Login</span>
                                    </button>
                                </Link>
                                <Link to="/signup" className="hidden md:block">
                                    <button className="px-6 py-2.5 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-blue-500/20">
                                        <FaUserPlus />
                                        <span>Sign Up</span>
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="relative" ref={dropdown}>
                                    <div
                                        className="flex items-center space-x-2 group cursor-pointer"
                                        onClick={() => setprofile(!profile)}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                            <span className="font-bold text-white">
                                                {me.name ? me.name.charAt(0).toUpperCase() : "U"}
                                            </span>
                                        </div>
                                        <span className="hidden md:block font-medium">{me.name}</span>
                                    </div>

                                    {profile && (
                                        <div className="absolute right-0 mt-3 w-80 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden z-50">
                                            <div className="p-6 bg-linear-to-r from-gray-800 to-gray-900">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                                        <span className="text-2xl font-bold text-white">
                                                            {me.name ? me.name.charAt(0).toUpperCase() : "U"}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold">{me.name}</h3>
                                                        <p className="text-sm text-gray-400">{me.email}</p>
                                                        <span className="inline-block mt-1 px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                                                            {me.role === "admin" ? "Administrator" : "Student"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 border-t border-gray-800">
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
                                                        <span className="font-medium">Account Type</span>
                                                        <span className="text-blue-400 capitalize">{me.role}</span>
                                                    </div>

                                                    <button
                                                        onClick={LogOut}
                                                        className="w-full flex items-center justify-center space-x-2 p-3 bg-linear-to-r from-red-900/30 to-red-800/30 hover:from-red-800/40 hover:to-red-700/40 text-red-400 rounded-lg transition-all duration-300 mt-4"
                                                    >
                                                        <FaSignOutAlt />
                                                        <span className="font-medium">Log Out</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <button
                            className="md:hidden mobile-menu-btn p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                            onClick={() => setMobileMenu(!mobileMenu)}
                        >
                            {mobileMenu ? <FaTimes className="text-xl" /> : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {mobileMenu && (
                    <div
                        ref={mobileMenuRef}
                        className="md:hidden absolute top-20 left-0 right-0 bg-gray-900 border-t border-gray-800 shadow-2xl rounded-b-2xl overflow-hidden"
                    >
                        <div className="p-4 space-y-2">
                            <Link
                                to="/"
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                                onClick={() => setMobileMenu(false)}
                            >
                                <FaHome className="text-blue-400" />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/courses"
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                                onClick={() => setMobileMenu(false)}
                            >
                                <FaBook className="text-green-400" />
                                <span>Courses</span>
                            </Link>
                            <Link
                                to="/stdDashboard"
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                                onClick={() => setMobileMenu(false)}
                            >
                                <FaChartBar className="text-yellow-400" />
                                <span>Dashboard</span>
                            </Link>
                            <div
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                                onClick={() => {
                                    toast.error("Contact feature under development");
                                    setMobileMenu(false);
                                }}
                            >
                                <FaEnvelope className="text-red-400" />
                                <span>Contact</span>
                            </div>

                            {!me ? (
                                <div className="pt-4 border-t border-gray-800 space-y-2">
                                    <Link
                                        to="/signin"
                                        className="block p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center"
                                        onClick={() => setMobileMenu(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block p-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors text-center"
                                        onClick={() => setMobileMenu(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            ) : (
                                <div className="pt-4 border-t border-gray-800">
                                    <div className="p-3">
                                        <p className="text-sm text-gray-400">Logged in as</p>
                                        <p className="font-bold">{me.name}</p>
                                        <p className="text-sm text-gray-400">{me.email}</p>
                                    </div>
                                    <button
                                        className="w-full p-3 rounded-lg bg-red-900/30 hover:bg-red-800/40 text-red-400 transition-colors mt-2"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}