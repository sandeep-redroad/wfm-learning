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
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    (response) => {
        if(response.status !== 200 && response.data?.success){
            toast.success(response.data.message)
        }
        return response
    },
    (error) => {
        console.log("error : ",error)
        if (error?.response && error?.response?.status === 401) {
            window.alert('Session expired or unauthorized, redirecting to login...')
            document.cookie = `session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            console.log("redired")
            // window.location.href = '/login'
        }else if(error?.response && error?.response?.status === 400){
            if(error?.response?.data?.details && error?.response?.data?.details.length > 0){
                toast.error(error?.response?.data?.details[0]['msg'])
            }
        }else if(error?.response?.data?.message){
            toast.error(error?.response?.data?.message)
        }else if(error?.message){
            toast.error(error?.message)
        }
        
        return Promise.reject(error)
    }
)

export default Axios
