import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { AppContext } from '../Context'

export default function ProtectedRoute({ children }) {
    const { me, authLoading } = useContext(AppContext)

    
    if (authLoading) {
        return (
            <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading...</p>
                </div>
            </div>
        )
    }

 
    if (!me) return <Navigate to="/signin" replace />
    if (me && me.role !== "admin") return <Navigate to="/notfound" replace />

    return children
}