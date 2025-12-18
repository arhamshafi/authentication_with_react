import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Form, useNavigate } from 'react-router'
import { AppContext } from '../Context'


export default function Dashboard() {

    const { addCourse, adminformhandler, frmLoader, formdata } = useContext(AppContext)

    const navigate = useNavigate()
    return (
        <div className='w-full min-h-screen bg-gray-100 p-5 '>
            <button className='px-5 py-1 bg-black active:scale-95 transition-all duration-150 ease-linear text-white rounded-xl cursor-pointer ' onClick={() => navigate(-1)} >Back</button>

            <h1 className='text-center font-bold text-3xl mt-10  '>Courses</h1>

            <div className='w-full h-max flex justify-center mt-20 gap-5 '>
                <form onSubmit={addCourse} className='w-1/2 h-100 rounded-2xl shadow-xl p-5 bg-white'>
                    <h1 className='text-center font-bold text-2xl '>Add Courses</h1>
                    <input onChange={adminformhandler} type="text" name='title' placeholder='Title Here' className='px-8 outline-none bg-gray-100 mt-12 w-full rounded-2xl h-12 ' value={formdata.title} />
                    <input onChange={adminformhandler} type="text" name='description' placeholder='Description Here' className='px-8 outline-none bg-gray-100 mt-5 w-full rounded-2xl h-12 ' value={formdata.description} />
                    <div className='w-full h-max flex justify-between items-center gap-5'>
                        <input onChange={adminformhandler} type="text" name='skill' placeholder='Skills You Will Learn ' className='px-8 outline-none bg-gray-100 mt-5 w-1/2 rounded-2xl h-12 ' value={formdata.skill} />
                        <input onChange={adminformhandler} type="text" name='duration' placeholder='Who Can Join' className='px-8 outline-none bg-gray-100 mt-5 w-1/2 rounded-2xl h-12 ' value={formdata.duration} />
                    </div>
                    <button disabled={frmLoader} type='submit' className='w-full h-12 bg-black text-white rounded-xl mt-8 cursor-pointer active:scale-95 transition-all ease-linear duration-150 '>{frmLoader ? (<div className='w-6 h-6 border-white mx-auto border-t-2 border-l-2 rounded-full animate-spin '></div>) : "Add Details"}</button>

                </form>
                {/* /////////////// recent courses */}
                <div className='w-1/2 h-100 rounded-2xl p-5 shadow-xl bg-white '>
                    <h1 className='text-center font-bold text-2xl '>Recent Courses</h1></div>
            </div>
            <div className='fixed bottom-10 w-3/4 bg-green-100 px-5 h-12 left-[12.5%] flex justify-center items-center text-lg tracking-[2px] text-green-800 rounded-2xl capitalize  gap-5'> <p>note :</p>  While enternig multiple fiels or level must use ","</div>
        </div>
    )
}
