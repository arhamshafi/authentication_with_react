import React from 'react'
import { Navigate } from 'react-router'

export default function ProtectedRoute({ children }) {

    const user = sessionStorage.getItem("activeUser") ? JSON.parse(sessionStorage.getItem("activeUser")) : {}

    if (!user) return <Navigate to="/signin" replace />
    if (user && user.role !== "admin") return <Navigate to={"/notfound"} replace />
    return children
}
