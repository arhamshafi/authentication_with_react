import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Login_service } from '../services/authservices'
import toast from 'react-hot-toast'
import { AppContext } from '../Context'
import { AlertCircle } from 'lucide-react'

export default function Signin() {
  const { setme, GetMe } = useContext(AppContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return
    }

    setLoading(true)
    const sendData = {
      email: formData.email,
      password: formData.password
    }

    const res = await Login_service(sendData)
    setLoading(false)

    if (!res.success) return toast.error(res.message)

    if (res.emailVerified === false) {
      setUserEmail(formData.email)
      setShowVerificationPrompt(true)
      return
    }


    setme(res.user)
    setFormData({ email: "", password: "" })
    toast.success(res.message)
    localStorage.setItem("token", res.token)
    await GetMe()
    if (res.user.role === "admin") {
      navigate("/adminDashboard")
    } else {
      navigate("/courses")
    }
  }

  if (showVerificationPrompt) {
    return (
      <div className='w-full min-h-screen bg-black flex justify-center items-center px-4'>
        <div className='w-full max-w-md'>
          <div className='bg-gray-900 rounded-lg shadow-lg p-8'>
            <div className='w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4'>
              <AlertCircle className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-2xl font-bold text-white mb-3 text-center'>Email Not Verified</h2>
            <p className='text-gray-400 text-center mb-6'>
              Please verify your email address before logging in. Check your inbox for the verification link.
            </p>
            <div className='bg-gray-800 border border-gray-700 rounded-md p-4 mb-6'>
              <p className='text-sm text-gray-300 text-center'>
                Sent to: <strong>{userEmail}</strong>
              </p>
            </div>
            <div className='space-y-3'>
              <button
                onClick={() => navigate('/resend-verification', { state: { email: userEmail } })}
                className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200'
              >
                Resend Verification Email
              </button>
              <button
                onClick={() => setShowVerificationPrompt(false)}
                className='w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md transition duration-200'
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen bg-black flex justify-center items-center px-4'>
      <div className='w-full max-w-md'>
        <div className='bg-gray-900 rounded-lg shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-white mb-2 text-center'>Welcome Back</h2>
          <p className='text-gray-400 text-center mb-8'>Sign in to your account</p>

          {error && (
            <div className='bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-6'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition'
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition'
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='rememberMe'
                  className='w-4 h-4 bg-gray-800 border border-gray-700 rounded cursor-pointer'
                />
                <label htmlFor='rememberMe' className='ml-2 text-sm text-gray-400 cursor-pointer'>
                  Remember me
                </label>
              </div>
              <Link to='/forgot-password' className='text-sm text-blue-500 hover:text-blue-400'>
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-md transition duration-200 mt-6'
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className='mt-6 text-center text-gray-400'>
            <p>
              Don't have an account?{' '}
              <Link to='/signup' className='text-blue-500 hover:text-blue-400 font-semibold'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}