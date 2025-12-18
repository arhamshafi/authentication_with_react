import React, { useContext } from 'react'
import { AppContext } from '../Context'
import Navbar from '../component/Navbar';

export default function Home() {

    // const { ok } = useContext(AppContext)
    // console.log(ok);

    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-black text-white '>
            <Navbar/>
            HOME PAGE
        </div>
    )
}
