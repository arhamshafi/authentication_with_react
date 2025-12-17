import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    console.log(formData);


  }

  return (
    <div className='w-full min-h-screen bg-black flex justify-center items-center px-4'>
      <div className='w-full max-w-md'>
        <div className='bg-gray-900 rounded-lg shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-white mb-2 text-center'>Create Account</h2>
          <p className='text-gray-400 text-center mb-8'>Join us to get started</p>

          {error && (
            <div className='bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-6'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Username Field */}
            <div>
              <label htmlFor='username' className='block text-sm font-medium text-gray-300 mb-2'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='Enter your username'
                className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition'
              />
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300 mb-2'>
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm your password'
                className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition'
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-md transition duration-200 mt-6'
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className='mt-6 text-center text-gray-400'>
            <p>
              Already have an account?{' '}
              <Link to='/signin' className='text-blue-500 hover:text-blue-400 font-semibold'>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
