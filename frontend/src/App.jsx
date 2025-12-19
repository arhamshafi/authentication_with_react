import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
import Signin from './auth/Sign-in'
import Signup from './auth/Sign-up'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Courses from './pages/Courses'
import Dashboard from './admin/Dashboard'
import ProtectedRoute from './component/ProtectedRoute'
import NotFound from './pages/NotFound'
import StudentDashboard from './pages/StudentDashboard'

export default function App() {
  return (<div className='select-none'>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 2000,
        style: {
          cursor: "pointer",
        }
      }}
    />

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/notfound' element={<NotFound />} />
        <Route path='/stdDashboard' element={<StudentDashboard />} />
        <Route path='/adminDashboard' element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} /></Routes>
    </BrowserRouter>
  </div>
  )
}
