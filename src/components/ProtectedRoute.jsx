import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSession } from '../contexts/SessionContext'

export const ProtectedRoute = ({ children }) => {
  const { session, loading } = useSession()
  const adminToken = localStorage.getItem('adminToken')
  const location = useLocation()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!session && !adminToken) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}
