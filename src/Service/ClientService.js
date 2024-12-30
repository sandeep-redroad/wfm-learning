import Axios from "@/Axios";


class ClientService{

    async getClient(data){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/client/get_pagination?${queryString}`)
    }

    async createClient(data){
        return await Axios.post("api/client", data)
    }
}

export default (new ClientService);