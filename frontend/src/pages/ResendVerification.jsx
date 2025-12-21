import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Clock } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ResendVerification() {
    const location = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState(location.state?.email || '')
    const [loading, setLoading] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const [emailSent, setEmailSent] = useState(false)

    useEffect(() => {
        let timer
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [countdown])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            toast.error('Please enter your email address')
            return
        }

        if (countdown > 0) {
            toast.error(`Please wait ${countdown} seconds before requesting again`)
            return
        }

        setLoading(true)

        try {
            const response = await axios.post(
                `http://localhost:5656/studentdata/auth/resend-verification`,
                { email }
            )

            if (response.data.success) {
                setEmailSent(true)
                setCountdown(60) // 1 minute cooldown
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                'Failed to send verification email. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full min-h-screen bg-black flex justify-center items-center px-4'>
            <div className='w-full max-w-md'>
                <div className='bg-gray-900 rounded-lg shadow-lg p-8'>
                    <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <Mail className='w-8 h-8 text-white' />
                    </div>

                    <h2 className='text-2xl font-bold text-white mb-3 text-center'>
                        Resend Verification Email
                    </h2>
                    <p className='text-gray-400 text-center mb-6'>
                        Enter your email address and we'll send you a new verification link.
                    </p>

                    {emailSent && (
                        <div className='bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-md mb-6'>
                            Verification email sent! Please check your inbox.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition'
                                required
                            />
                        </div>

                        {countdown > 0 && (
                            <div className='bg-gray-800 border border-gray-700 rounded-md p-3 flex items-center justify-center gap-2'>
                                <Clock className='w-4 h-4 text-blue-500' />
                                <p className='text-sm text-gray-300'>
                                    Wait <strong className='text-white'>{countdown}s</strong> before requesting again
                                </p>
                            </div>
                        )}

                        <button
                            type='submit'
                            disabled={loading || countdown > 0}
                            className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-md transition duration-200'
                        >
                            {loading ? 'Sending...' : 'Send Verification Email'}
                        </button>
                    </form>

                    <div className='mt-6 text-center'>
                        <p className='text-gray-400 text-sm mb-4'>
                            Remember to check your spam folder if you don't see the email.
                        </p>
                        <Link
                            to='/signin'
                            className='text-blue-500 hover:text-blue-400 font-semibold'
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}