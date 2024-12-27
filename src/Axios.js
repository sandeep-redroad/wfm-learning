import axios from 'axios'
import { toast } from 'react-toastify'

const Axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,
    headers: {
    },
})

Axios.interceptors.request.use(
    (config) => {
        // You can add additional logic here (e.g., adding tokens, modifying headers, etc.)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // Handle errors globally (e.g., session expired, unauthorized, etc.)
        console.log("error : ",error)
        if (error.response && error.response.status === 401) {
            // Handle session expired or unauthorized error (redirect to login page)
            window.alert('Session expired or unauthorized, redirecting to login...')
            document.cookie = `session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            window.location.href = '/login' // Redirect to login page
        }else if(error?.response?.data?.message){
            toast.error(error?.response?.data?.message)
        }else if(error?.message){
            toast.error(error?.message)
        }
        
        return Promise.reject(error)
    }
)

export default Axios
