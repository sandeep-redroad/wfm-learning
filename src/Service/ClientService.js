import Axios from "@/Axios";


class ClientService{

    async getClients(data = {}){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/client/get_pagination?${queryString}`)
    }

    async createClient(data){
        return await Axios.post("api/client", data)
    }

    async getClient(clientId){
        return await Axios.get(`api/client/${clientId}`)
    }

    async updateClient(clientId, data){
        return await Axios.put(`api/client/${clientId}`, data)
    }
}

export default (new ClientService);