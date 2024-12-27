import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCookie } from '@/utils/helper'
import AuthService from '@/Service/AuthService'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const storedAuthState = getCookie('session_id')
    const [isAuthenticated, setIsAuthenticated] = useState(storedAuthState ? true : false)
    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
        if (storedAuthState) {
            if(!userInfo){
                getSession();
            }
            setIsAuthenticated(true)
        }
    }, [])

    const getSession = async () => {
        const resp = await AuthService.getSession()
        if(resp.data.success){
            setUserInfo(resp.data.data)
        }
    }
    const login = () => {
        setIsAuthenticated(true)
    }
    const logout = async () => {
        try {
            const resp = await AuthService.logout()
            if(resp.data.success){
                toast.success(resp.data.message)
                setIsAuthenticated(false)
            }    
        } catch (err) {}
    }
    console.log('isAuthenticated : ', isAuthenticated)
    return <AuthContext.Provider value={{ isAuthenticated, login, logout, setUserInfo, userInfo }}>{children}</AuthContext.Provider>
}
