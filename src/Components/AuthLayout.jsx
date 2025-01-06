import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Header/Navbar'
import { SidebarInset, SidebarProvider } from './ui/sidebar'
import PageSidebar from './Sidebar/PageSidebar'
import ProtectedRoute from './ProtectedRoute'

const AuthLayout = () => {
    return (
        <SidebarProvider>
            <PageSidebar />
            <SidebarInset className="h-screen">
                <Navbar />
                <ProtectedRoute>
                    <div className="flex flex-1 flex-col gap-4 bg-gray-200 m-0 ">
                        <Outlet />
                    </div>
                </ProtectedRoute>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AuthLayout
