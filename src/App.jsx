import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/Context/AuthContext'
import { ToastContainer } from 'react-toastify'

import Billing from '@/Pages/Billing/Listing/BillingType'
import Login from '@/Pages/Login'
import Login1 from '@/Pages/Login1'
import Login2 from '@/Pages/Login2'
import Dashboard from '@/Pages/Dashboard/Dashboard'
import AuthLayout from '@/Components/AuthLayout'
import Departments from '@/Pages/Department/Listing/Departments'
import Clients from '@/Pages/Clients/Listing/Clients'
import Process from '@/Pages/Process/Listing/Process'
import Invoice from '@/Pages/Invoice/Listing/Invoice'
import CreateProject from '@/Pages/Project/CreateProject'
import Project from '@/Pages/Project/Listing/Project'
import EmployeeMapped from '@/Pages/EmployeeMapped/EmployeeMapped'
import BulkUpload from '@/Pages/UploadPage/Listing/BulkUpload'
import CreateBulkUpload from './Pages/UploadPage/CreateBulkUpload'
import CreateInoice from './Pages/Invoice/CreateInvoice'
import CreateDailyWorkLog from './Pages/DailyWorkLog/CreateDailyWorkLog'
import DailyWorkLog from './Pages/DailyWorkLog/Listing/DailyWorkLog'
import CreateClient from './Pages/Clients/CreateClient'
import NotFound404 from './Pages/Error/NotFound404'
import ErrorBoundary from './ErrorBoundary'
import React, { Suspense } from 'react'
import ErrorPage from './ErrorPage'
import LofBusiness from './Pages/LOFbusiness/Listing/LofBusiness'
import EditProject from './Pages/Project/EditProject'
import EditClient from './Pages/Clients/EditClient'
import EditDailyWorkLog from './Pages/DailyWorkLog/EditDailyWorkLog'
import BillingEntity from './Pages/BillingEntity/Listing/BillingEntity'
import CreateBillingEntiy from './Pages/BillingEntity/CreateBillingEntity'
import EditBillingEntiy from './Pages/BillingEntity/EditBillingEntity'
let router = createBrowserRouter([
    {
        path: '/login',
        Component: Login2,
    },
    {
        path: '*',
        Component: ErrorPage,
    },

    {
        path: '/login1',
        Component: Login1,
    },
    {
        path: '/login2',
        Component: Login,
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                index: true,
                path: '/dashboard',
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
                path: 'invoices/new',
                Component: CreateInoice,
            },

            {
                path: '/projects/new',
                element: <CreateProject type="new" />,
            },
            {
                path: '/projects/:projectId',
                element: <EditProject type="edit" />,
            },
            {
                path: '/daily-work-log',
                Component: DailyWorkLog,
            },
            {
                path: '/daily-work-log/new',
                Component: CreateDailyWorkLog,
            },
            {
                path: '/daily-work-log/:dailyWorkLogId',
                Component: EditDailyWorkLog,
            },
            {
                path: '/bulk-upload',
                Component: BulkUpload,
            },
            {
                path: '/bulk-upload/new',
                Component: CreateBulkUpload,
            },
            {
                path: '/clients',
                Component: Clients,
            },
            {
                path: '/clients/:clientId',
                Component: EditClient,
            },
            {
                path: '/clients/new',
                Component: CreateClient,
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
                path: '/master-settings/lof-business',
                Component: LofBusiness,
            },
            {
                path: '/master-settings/processes',
                Component: Process,
            },
            {
                path: '/master-settings/billing-entity',
                Component: BillingEntity,
            },
            {
                path: '/master-settings/billing-entity/new',
                Component: CreateBillingEntiy,
            },
            {
                path: '/master-settings/billing-entity/:billingEntityId',
                Component: EditBillingEntiy,
            },
            {
                path: '/master-settings/employee-mapped',
                Component: EmployeeMapped,
            },
            {
                path: '*',
                Component: NotFound404,
            },
        ],
    },
    {
        path: '*',
        Component: NotFound404,
    },
])

function App() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
        </ErrorBoundary>
    )
}

export default App
