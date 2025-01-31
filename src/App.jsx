import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/Context/AuthContext'
import { ToastContainer } from 'react-toastify'

import BillingType from '@/Pages/Billing/Listing/BillingType'
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
import ClientAddress from './Pages/ClientAddress/Listing/ClientAddress'
import CreateClientAddress from './Pages/ClientAddress/CreateClientAddress'
import Notes from './Pages/Notes/Listing/Notes'
import CreateNotes from './Pages/Notes/CreateNotes'
import ShowInvoiece from './Pages/Invoice/ShowInvoice'
import EditClientAddress from './Pages/ClientAddress/EditClientAddress'
import EditNotes from './Pages/Notes/EditNotes'
import EditInvoice from './Pages/Invoice/EditInvoice'
import CreateAndUpdateCompanyMaster from './Pages/CompanyMaster/CreateAndUpdateCompanyMaster'
import GenerateInvoice from './Pages/Invoice/Listing/GenerateInvoice'
import ShiftRequest from './Pages/ShiftRequest/ShiftRequest'
import Listing from './Pages/ShiftRequest/Listing'

let router = createBrowserRouter([
    {
        path: '/login',
        Component: Login2,
    },

    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                index: true,
                path: '/',
                Component: Project,
            },
            {
               
                path: '/shiftRequest',
                Component: Listing,
            },
            {
               
                path: '/newshiftRequest',
                Component: ShiftRequest,
            },
    
            
            {
                path: '*',
                Component: NotFound404,
            },
        ],
    },
    {
        path: '*',
        Component: ErrorPage,
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
