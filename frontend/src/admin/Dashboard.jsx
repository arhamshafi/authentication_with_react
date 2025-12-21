import React, { useContext, useState } from 'react'
import Navbar from '../component/Navbar'
import { AppContext } from '../Context'
import { FaEdit, FaTrash, FaBook, FaCalendarAlt, FaCode, FaPlusCircle, FaPlus } from 'react-icons/fa'
import { DelServices } from '../services/admin'
import toast from 'react-hot-toast'

export default function Courses() {

    const { courses, adminformhandler, addCourse, frmLoader, formdata, UpdateCourseDetails, updateformdata,
        updateHnalder, setupdateformdata, EditFormVisible, setEditFormVisible, FetchAllCourses } = useContext(AppContext)
    const [form, setform] = useState(false)
    const [DeletePop, setDeletePop] = useState(false)
    const [deleteCourseId, setDeleteCourseId] = useState(null)

    const DelCourse = async (_id) => {
        try {
            const res = await DelServices(_id)
            if (res.success) {
                toast.success(res.message)
                FetchAllCourses()
                setDeletePop(false)
            }

        } catch (err) {
            toast.error(err?.response?.data?.message)
        }
    }

    return (
        <div className='w-full min-h-screen bg-gray-50 px-7'>
            <Navbar />
            <div className={`w-full min-h-screen backdrop-blur-[2px] transition-all duration-200 ease-linear bg-black/20 fixed top-0 left-0 flex justify-center items-center ${form ? "opacity-100 visible" : "opacity-0 invisible "} `} onClick={() => setform(false)} >
                <form onSubmit={addCourse} className='w-195 h-max p-8 bg-white shadow-xl rounded-xl ' onClick={(e) => e.stopPropagation()} >
                    <h1 className='text-black font-bold text-2xl text-center  '>Add Details</h1>
                    <p className='text-md font-bold mt-10 ml-2 tracking-[1px]'>Title *</p>
                    <input type="text" placeholder='Enter Title' className='w-full h-12 bg-gray-100 rounded-xl outline-none px-6 text-md mt-1 ' name='title' onChange={adminformhandler} value={formdata.title} />
                    <p className='text-md font-bold mt-5 ml-2 tracking-[1px]'>Description *</p>
                    <input type="text" placeholder='Write Some Description About This Course' className='w-full h-12 bg-gray-100 rounded-xl outline-none px-6 text-md mt-1 ' name='description' onChange={adminformhandler} value={formdata.description} />
                    <div className='flex justify-between items-center gap-5 mt-5 h-max'>
                        <div className='w-1/2 h-max '>
                            <p className='text-md font-bold ml-2 tracking-[1px]'>Skills *</p>
                            <input type="text" placeholder='Skills For Student' className='w-full h-12 bg-gray-100 rounded-xl outline-none px-6 text-md mt-1 ' name='skill' onChange={adminformhandler} value={formdata.skill} />
                        </div>
                        <div className='w-1/2 h-max '>
                            <p className='text-md font-bold ml-2 tracking-[1px]'>Duration *</p>
                            <input type="text" placeholder='Skills For Student' className='w-full h-12 bg-gray-100 rounded-xl outline-none px-6 text-md mt-1 ' name='duration' onChange={adminformhandler} value={formdata.duration} />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={frmLoader}
                        className="w-full h-12 mt-10 bg-black rounded-xl text-white
             flex items-center justify-center
             transition-all duration-200 active:scale-95
             disabled:opacity-70"
                    >
                        {frmLoader ? (
                            <div className="w-6 h-6 border-[3px] border-solid border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Add Details"
                        )}
                    </button>
                </form>
            </div>
            {/* ///////////// */}
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
                        <button onClick={() => DelCourse(deleteCourseId?._id)}
                            className="flex-1 px-4 py-2 bg-red-600 cursor-pointer hover:bg-red-700 rounded-lg"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {/* //////////// */}
            <div className={`w-full min-h-screen backdrop-blur-[2px] transition-all duration-200 ease-linear bg-black/20 fixed top-0 left-0 flex justify-center items-center ${EditFormVisible ? "opacity-100 visible" : "opacity-0 invisible "} `} onClick={() => { setEditFormVisible(false), setupdateformdata({ id: "", title: "", duration: "", skill: "", description: "" }) }} >
                <form onSubmit={UpdateCourseDetails} className='w-195 h-max p-8 bg-white shadow-xl rounded-xl ' onClick={(e) => e.stopPropagation()} >
                    <h1 className='text-black font-bold text-2xl text-center  '>Update Details</h1>
                    <p className='text-md font-bold mt-10 ml-2 tracking-[1px]'>Title *</p>
                    <input type="text" placeholder='Enter Title' className='w-full h-12 bg-gray-100 rounded-xl outline-none px-6 text-md mt-1 ' name='title' onChange={updateHnalder} value={updateformdata.title} />
                    <p className='text-md font-bold mt-5 ml-2 tracking-[1px]'>Description *</p>
                    <input type="text" placeholder='Write Some Description About This Course' className='w-full h-12 bg-gray-100 rounded-xl outline-none px-6 text-md mt-1 ' name='description' onChange={updateHnalder} value={updateformdata.description} />
                    <div className='flex justify-between items-center gap-5 mt-5 h-max'>
                        <div className='w-1/2 h-max '>
                            <p className='text-md font-bold ml-2 tracking-[1px]'>Skills *</p>
                            <input type="text" placeholder='Skills For Student' className='w-full h-12 bg-gray-100 rounded-xl outline-none px-6 text-md mt-1 ' name='skill' onChange={updateHnalder} value={updateformdata.skill} />
                        </div>
                        <div className='w-1/2 h-max '>
                            <p className='text-md font-bold ml-2 tracking-[1px]'>Duration *</p>
                            <input type="text" placeholder='Skills For Student' className='w-full h-12 bg-gray-100 rounded-xl outline-none px-6 text-md mt-1 ' name='duration' onChange={updateHnalder} value={updateformdata.duration} />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={frmLoader}
                        className="w-full h-12 mt-10 bg-black rounded-xl text-white cursor-pointer
             flex items-center justify-center
             transition-all duration-200 active:scale-95
             disabled:opacity-70"
                    >
                        {frmLoader ? (
                            <div className="w-6 h-6 border-[3px] border-solid border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Update Details"
                        )}
                    </button>
                </form>
            </div>

            {/* ///////////// */}

            <div className="container mx-auto px-4 py-8 pt-24">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-800 mb-3">All Courses</h1>
                        <p className="text-gray-600 text-lg">
                            {courses?.length || 0} courses available
                        </p>
                    </div>
                        <p className='font-bold text-2xl text-yellow-500'>ADMIN <span className='text-gray-800'>DASHBOARD</span></p>
                    <button
                        onClick={() => setform(true)}
                        className="flex items-center gap-2 px-6 py-3 cursor-pointer bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                        <FaPlus />
                        Add New Course
                    </button>
                </div>

                {/* Courses Grid */}
                {courses && courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((item, index) => (
                            <div
                                key={item._id || index}
                                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <FaBook className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-800">
                                                {item.title || "No Title"}
                                            </h3>
                                            <p className="text-sm text-gray-500">ID: {item._id?.substring(0, 8) || 'N/A'}</p>
                                        </div>
                                    </div>

                                    {/* Edit/Delete Buttons - Only for Admin */}
                                    <div className="flex gap-2">
                                        <button
                                            className="p-2 text-blue-600 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit Course" onClick={() => {
                                                setEditFormVisible(true)
                                                setupdateformdata({
                                                    id: item._id,
                                                    title: item.title,
                                                    description: item.description,
                                                    skill: item.skills.join(","),
                                                    duration: item.duration
                                                })
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => { setDeletePop(true), setDeleteCourseId(item) }}
                                            className="p-2 text-red-600 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Course"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-4">
                                    {item.description || "No description available"}
                                </p>

                                {/* Duration */}
                                <div className="flex items-center gap-2 text-gray-700 mb-4">
                                    <FaCalendarAlt className="text-yellow-500" />
                                    <span className="font-medium">{item.duration || "Duration not specified"}</span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCode className="text-green-500" />
                                        <span className="text-sm font-medium text-gray-700">Skills:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {item.skills && Array.isArray(item.skills) ? (
                                            item.skills.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 text-sm">No skills listed</span>
                                        )}
                                    </div>
                                </div>

                                <div className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
                                    Course ID: {item._id || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6">
                            <FaBook className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-2xl text-gray-600 mb-3">No Courses Available</h3>
                        <p className="text-gray-500 mb-6">Add courses from the admin dashboard to see them here</p>

                        <button
                            onClick={() => setform(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                        >
                            <FaPlusCircle className="text-xl" />
                            Add Your First Course
                        </button>
                    </div>
                )}


            </div>
        </div>
    )
}