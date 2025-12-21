import React, { useContext } from 'react'
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
import VerifyEmail from './pages/VerifyEmail'
import ResendVerification from './pages/ResendVerification'
import { AppContext } from './Context'

export default function App() {

  const { authLoading } = useContext(AppContext)
  // console.log(authLoading);

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

    {
      authLoading ? (
        <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading...</p>
          </div>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/verify-email/:token' element={<VerifyEmail />} />
            <Route path='/resend-verification' element={<ResendVerification />} />
            <Route path='/stdDashboard' element={<StudentDashboard />} />
            <Route path='/adminDashboard' element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} /></Routes>
        </BrowserRouter>

      )
    }

  </div>
  )
}
