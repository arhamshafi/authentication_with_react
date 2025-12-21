import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { AppContext } from '../Context';
import api from '../utils/api';

export default function VerifyEmail() {
    const { GetMe } = useContext(AppContext);
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');
    const hasVerified = useRef(false);

    useEffect(() => {
        const verifyEmail = async () => {
            if (hasVerified.current) return;
            hasVerified.current = true;

            const trimmedToken = token?.trim();
            if (!trimmedToken) {
                setStatus('error');
                setMessage('Invalid verification token');
                return;
            }

            try {
                const response = await api.get(`/auth/verify-email/${trimmedToken}`);

                if (response.data?.success) {
                    setStatus('success');
                    setMessage(response.data.message || 'Email verified successfully!');

                    localStorage.setItem("token", response.data.token);

                    await GetMe();

                    toast.success('Email verified! You are now logged in.');
                    setTimeout(() => {
                        const userRole = response.data.user?.role;
                        if (userRole === "admin") navigate('/adminDashboard');
                        else navigate('/courses');
                    }, 1500);
                } else {
                    setStatus('error');
                    setMessage(response.data.message || 'Verification failed.');
                }
            } catch (err) {
                setStatus('error');
                setMessage(
                    err.response?.data?.message || 'Verification failed. The link may have expired.'
                );
            }
        };

        verifyEmail();
    }, [token, navigate, GetMe]);

    return (
        <div className='w-full min-h-screen bg-black flex justify-center items-center px-4'>
            <div className='w-full max-w-md'>
                <div className='bg-gray-900 rounded-lg shadow-lg p-8 text-center'>

                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${status === 'loading' ? 'bg-blue-600 animate-pulse' :
                            status === 'success' ? 'bg-green-600' :
                                'bg-red-600'
                        }`}>
                        {status === 'loading' && <Loader className='w-8 h-8 text-white animate-spin' />}
                        {status === 'success' && <CheckCircle className='w-8 h-8 text-white' />}
                        {status === 'error' && <XCircle className='w-8 h-8 text-white' />}
                    </div>

                    <h2 className='text-2xl font-bold text-white mb-3'>
                        {status === 'loading' && 'Verifying Your Email'}
                        {status === 'success' && 'Email Verified!'}
                        {status === 'error' && 'Verification Failed'}
                    </h2>

                    <p className='text-gray-400 mb-6'>{message}</p>

                    {status === 'error' && (
                        <div className='space-y-3'>
                            <Link
                                to='/resend-verification'
                                className='block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition'
                            >
                                Resend Verification Email
                            </Link>

                            <Link
                                to='/signin'
                                className='block w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md transition'
                            >
                                Back to Sign In
                            </Link>
                        </div>
                    )}

                    {status === 'success' && (
                        <Link
                            to='/courses'
                            className='inline-block py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition'
                        >
                            Go to Courses
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
}
