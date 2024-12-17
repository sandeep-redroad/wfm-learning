import Axios from "@/Axios";


class AuthService{

    async login(data){
        return await Axios.post("api/auth", data)
    }
}

export default (new AuthService);