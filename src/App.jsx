import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Billing from '@/Pages/Billing/Listing/Billing'
import Login from '@/Pages/Login'
import Dashboard from '@/Pages/Dashboard/Dashboard'
import AuthLayout from '@/Components/AuthLayout'
import Departments from '@/Pages/Department/Listing/Departments'
import Clients from '@/Pages/Clients/Listing/Clients'
import Process from '@/Pages/Process/Listing/Process'
import ProjectMaster from '@/Pages/ProjectMaster/ProjectMaster'
import Invoice from '@/Pages/Invoice/Listing/Invoice'
import DailyWork from '@/Pages/DailyWork/DailyWork'
import { AuthProvider } from '@/Context/AuthContext'
import Project from './Components/Project/Project'

let router = createBrowserRouter([
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/',
                Component: Dashboard,
            },
            {
                path: '/invoices',
                Component: Invoice,
            },
            {
                path: '/projects',
                Component: Project,
            },
            {
                path: '/daily-work',
                Component: DailyWork,
            },
            {
                path: '/master-settings/billing',
                Component: Billing,
            },
            {
                path: '/master-settings/departments',
                Component: Departments,
            },
            {
                path: '/master-settings/clients',
                Component: Clients,
            },
            {
                path: '/master-settings/processes',
                Component: Process,
            },
            {
                path: '/master-settings/project-master',
                Component: ProjectMaster,
            },
        ],
    },
])

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default App
