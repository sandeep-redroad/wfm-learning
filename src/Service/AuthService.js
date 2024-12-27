import Axios from "@/Axios";


class AuthService{

    async login(data){
        return await Axios.post("api/auth", data, {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
    }

    async logout(){
        return await Axios.post("api/auth/logout")
    }

    async getSession(){
        return await Axios.get("api/auth/session")
    }
}

export default (new AuthService);