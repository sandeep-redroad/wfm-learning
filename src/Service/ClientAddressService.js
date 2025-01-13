import Axios from "@/Axios";


class ClientAddressService{

    async getClientAddresses(data = {}){
        let postData = JSON.parse(JSON.stringify(data))
        const queryString = new URLSearchParams({
            ...postData.search,
            page: postData.page ?? 1,
        }).toString()
        return await Axios.get(`api/client_address/get_pagination?${queryString}`)
    }

    async createClientAddress(data){
        return await Axios.post("api/client_address", data)
    }

    async deleteClientAddress(data){
        return await Axios.delete("api/client_address",{data})
    }

    async getClientAddress(clientId){
        return await Axios.get(`api/client_address/${clientId}`)
    }

    async updateClientAddress(clientId, data){
        return await Axios.put(`api/client_address/${clientId}`, data)
    }
}

export default (new ClientAddressService);