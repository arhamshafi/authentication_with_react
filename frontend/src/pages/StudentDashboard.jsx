import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../component/Navbar'
import { AppContext } from '../Context'
import toast from 'react-hot-toast'
import {
    FaUser,
    FaBook,
    FaGraduationCap,
    FaIdCard,
    FaSave,
    FaEdit,
    FaTimes,
    FaCheckCircle,
    FaCalendarAlt,
    FaCode,
    FaTrash
} from 'react-icons/fa'
import { deeleteSelectedCourse, UpdateProfile_service } from '../services/user'

export default function StudentDashboard() {
    const { courses, me, userMe } = useContext(AppContext)
    const [DeletePop, setDeletePop] = useState(false)
    const [deleteCourseId, setDeleteCourseId] = useState(null)

    const [formData, setFormData] = useState({
        name: me?.name || "",
        qualification: me?.documents?.qualification || "",
        idCard: me?.documents?.idCard || ""
    })

    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (me) {
            setFormData({
                name: me.name || "",
                qualification: me.documents?.qualification || "",
                idCard: me.documents?.idCard || ""
            })
        }
    }, [me])

    const selectedCourseIds = me?.selectedCourses || []

    const selectedCourses = courses?.filter(c =>
        selectedCourseIds.includes(c._id)
    ) || []

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.qualification.trim() || !formData.idCard.trim()) {
            toast.error("All fields are required")
            return
        }

        const cnicRegex = /^\d{13}$/
        if (!cnicRegex.test(formData.idCard)) {
            toast.error("CNIC must be 13 digits")
            return
        }

        setLoading(true)

        try {

            const res = await UpdateProfile_service(formData)
            if (res.success) {
                toast.success("Profile updated successfully!")
                sessionStorage.setItem("activeUser", JSON.stringify({ name: res.user.name, email: res.user.email, role: res.user.role }))
                setEditMode(false)
                await userMe()
            }
        } catch (error) {
            toast.error("Failed to update profile")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const toggleEditMode = () => {
        if (editMode) {
            setFormData({
                name: me?.name || "",
                qualification: me?.documents?.qualification || "",
                idCard: me?.documents?.idCard || ""
            })
        }
        setEditMode(!editMode)
    }

    const handleDeleteCourse = async (id) => {
        try {
            const res = await deeleteSelectedCourse(id)
            if (res.success) {
                toast.success(res.message)
                await userMe()
            }

        } catch (err) {
            toast.error(err?.response?.data?.message)
        } finally {
            setDeletePop(false)
            setDeleteCourseId(null)
        }
    }

    if (!me) {
        return (
            <div className='w-full min-h-screen bg-gray-50'>
                <Navbar />
                <div className="container mx-auto px-4 py-8 pt-24 text-center">
                    <h1 className="text-2xl text-gray-600">Please login to view dashboard</h1>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen bg-gray-50'>
            <Navbar />
            {/* ////////// */}

            <div className={` w-full min-h-screen flex justify-center items-center fixed top-0 left-0 backdrop-blur-[2px] ${DeletePop ? "opacity-100 visible" : "opacity-0 invisible "} `}>
                <div className="bg-gray-900 text-white rounded-xl p-6 w-120 text-center">
                    <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                    <p className="mb-6">Are you sure you want to delete <strong>{deleteCourseId?.title}</strong>?</p>

                    <div className="flex justify-between gap-4">
                        <button onClick={() => setDeletePop(false)}
                            className="flex-1 px-4 py-2 cursor-pointer bg-gray-700 hover:bg-gray-600 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button onClick={() => handleDeleteCourse(deleteCourseId?._id)}
                            className="flex-1 px-4 py-2 bg-red-600 cursor-pointer hover:bg-red-700 rounded-lg"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {/* /////////////////////////////// */}
            <div className="container mx-auto px-4 py-8 pt-24">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Student Dashboard</h1>
                    <p className="text-gray-600 text-lg">Welcome back, {me.name}!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Left Column - Profile Information */}
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-200 p-6'>
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                    <FaUser className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                                    <p className="text-gray-600 text-sm">Update your personal details</p>
                                </div>
                            </div>

                            <button
                                onClick={toggleEditMode}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${editMode
                                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {editMode ? (
                                    <>
                                        <FaTimes />
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <FaEdit />
                                        Edit Profile
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Read-only Info */}
                        {!editMode ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                        <p className="font-semibold text-gray-800">{me.name}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">Email</p>
                                        <p className="font-semibold text-gray-800">{me.email}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-500 mb-1">Role</p>
                                    <p className="font-semibold text-gray-800 capitalize">{me.role}</p>
                                </div>

                                {/* Documents Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <FaGraduationCap />
                                        Education & Identity
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaGraduationCap className="text-blue-600" />
                                                <p className="text-sm font-medium text-blue-700">Qualification</p>
                                            </div>
                                            <p className="text-gray-800">
                                                {me.documents?.qualification || "Not provided yet"}
                                            </p>
                                        </div>

                                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaIdCard className="text-green-600" />
                                                <p className="text-sm font-medium text-green-700">CNIC Number</p>
                                            </div>
                                            <p className="text-gray-800">
                                                {me.documents?.idCard || "Not provided yet"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Edit Form */
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <FaUser />
                                            <span>Full Name *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <FaGraduationCap />
                                            <span>Qualification *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="qualification"
                                            value={formData.qualification}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Matric, Intermediate, Bachelor's"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <FaIdCard />
                                            <span>CNIC Number *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="idCard"
                                            value={formData.idCard}
                                            onChange={handleInputChange}
                                            placeholder="Enter 13-digit CNIC without dashes"
                                            maxLength="13"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Format: 1234567890123 (13 digits)</p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaSave />
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right Column - Selected Courses */}
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-200 p-6'>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-green-500 to-green-600 flex items-center justify-center">
                                <FaBook className="text-white text-xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Selected Courses</h2>
                                <p className="text-gray-600 text-sm">
                                    {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''} enrolled
                                </p>
                            </div>
                        </div>

                        {selectedCourses.length > 0 ? (
                            <div className="space-y-4 max-h-125 overflow-y-auto pr-2">
                                {selectedCourses.map((courseItem, index) => (
                                    <div
                                        key={courseItem._id || index}
                                        className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all bg-linear-to-r from-gray-50 to-white"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg text-gray-800">
                                                {courseItem.title || "Untitled Course"}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                                    #{index + 1}
                                                </span>
                                                <button
                                                    onClick={() => { setDeletePop(true), setDeleteCourseId(courseItem) }}
                                                    className="p-2 cursor-pointer bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-200 active:scale-95"
                                                    title="Remove course"
                                                >
                                                    <FaTrash className="text-sm" />
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {courseItem.description || "No description available"}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                            <FaCalendarAlt className="text-yellow-500" />
                                            <span>{courseItem.duration || "Duration not specified"}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {courseItem.skills && Array.isArray(courseItem.skills) &&
                                                courseItem.skills.slice(0, 3).map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-xs"
                                                    >
                                                        <FaCode className="text-green-500 text-xs" />
                                                        {skill}
                                                    </span>
                                                ))}
                                            {courseItem.skills?.length > 3 && (
                                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                                                    +{courseItem.skills.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <FaBook className="text-3xl text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">No Courses Selected</h3>
                                <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
                                <button
                                    onClick={() => window.location.href = '/courses'}
                                    className="px-6 py-2.5 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300"
                                >
                                    Browse Courses
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Account Status */}
                <div className="max-w-4xl mx-auto mt-8">
                    <div className="bg-linear-to-r from-gray-800 to-black text-white rounded-2xl p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                    <FaUser className="text-white text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Account Status</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FaCheckCircle className={me.verified ? "text-green-400" : "text-yellow-400"} />
                                        <span>{me.verified ? "Verified Account" : "Pending Verification"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-300 text-sm">Member Since</p>
                                <p className="font-semibold">
                                    {me.createdAt ? new Date(me.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}