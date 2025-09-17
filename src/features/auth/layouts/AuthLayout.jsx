import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import './AuthLayout.css'

const AuthLayout = () => {
  const location = useLocation()
  const { pathname } = location

  const isLoginSignup = pathname === '/login' || pathname === '/signup'
  const isActive = pathname === '/signup'

  return (
    <div className="auth-body-container">
      <div className={`wrapper ${isActive ? 'active' : ''} ${!isLoginSignup ? 'single-view' : ''}`}>
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>
        
        {isLoginSignup ? (
          <>
            <LoginForm />
            <SignupForm />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}
export default AuthLayout