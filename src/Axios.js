import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    // timeout: 4000, 
    headers : {
        "Content-Type" : 'application/x-www-form-urlencoded'
    }
})


export default Axios;
