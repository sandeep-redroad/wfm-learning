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
import Login1 from './Pages/Login1'
import Login2 from './Pages/Login2'

import CreateProject from './Components/Project/CreateProject'
import Project from './Pages/Project/Listing/Project'
import { ToastContainer } from 'react-toastify'
import EmployeeMapped from './Pages/EmployeeMapped/EmployeeMapped'

let router = createBrowserRouter([
    {
        path: '/login',
        Component: Login2,
    },
    {
        path: '/login1',
        Component: Login1,
    },
    {
        path: '/login2',
        Component: Login2,
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
                path: '/projects/new',
                Component: CreateProject,
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
            {
                path: '/master-settings/employee-mapped',
                Component: EmployeeMapped,
            },
        ],
    },
])

function App() {
    return (
        <AuthProvider>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default App
