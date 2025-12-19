import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
