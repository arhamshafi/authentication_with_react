import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
import Signin from './auth/Sign-in'
import Signup from './auth/Sign-up'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Courses from './pages/Courses'
import Dashboard from './admin/Dashboard'

export default function App() {
  return (<div className='select-none'>
    <Toaster position="top-center" reverseOrder={false} />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/adminDashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}
