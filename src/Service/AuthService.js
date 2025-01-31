import Axios from '@/Axios'

class AuthService {
    async login(data) {
        return await Axios.post('api/auth', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
    }

    async logout() {
        return await Axios.post('api/auth/logout')
    }

    async getSession() {
        return await Axios.get('api/auth/session')
    }

    async getEmp() {
        return await Axios.get('api/auth/get_emp')
    }
    async getShift() {
        return await Axios.get('api/auth/get_shift_type')
    }
    async createShiftRequest(data) {
        return await Axios.post('api/auth/create_shift_request',data)
    }
    async getShiftRequest() {
        return await Axios.get("api/auth/get_shift_request")
    }

    async deleteRequest(data){
        return await Axios.delete("api/auth/delete_shift_request",{data})
    }
    
    async updateShiftRequest() {

    }
}

export default new AuthService()
