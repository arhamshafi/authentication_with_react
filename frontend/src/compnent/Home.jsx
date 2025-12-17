import React from 'react'
import { Link } from 'react-router'

export default function Home() {


    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-black text-white'>
            <nav className=' w-full h-1/12 bg-yellow-300 flex justify-between items-center px-10 fixed top-0 left-0 '>
                <div className='w-max h-max font-bold text-black text-3xl '>LOGO</div>
                <div className='flex justify-center items-center gap-2'>
                    <Link to={"/signup"}><button className='py-2 px-5 rounded-lg bg-black text-white active:scale-95 transition-all duration-150 ease-linear cursor-pointer'>Sign up</button></Link>
                    <Link to={"/signin"}><button className='py-2 px-5 rounded-lg bg-black text-white cursor-pointer active:scale-95 transition-all duration-150 ease-linear'>Login</button></Link>
                </div>
            </nav>
            HOME PAGE
        </div>
    )
}
