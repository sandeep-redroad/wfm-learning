import Axios from "@/Axios";


class BillingEntityService{

    async getBillingEntities(data = {}){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/billing_entity/get_pagination?${queryString}`)
    }

    async createBillingEntity(data){
        return await Axios.post("api/billing_entity", data)
    }

    async getBillingEntity(clientId){
        return await Axios.get(`api/billing_entity/${clientId}`)
    }

    async updateBillingEntity(clientId, data){
        return await Axios.put(`api/billing_entity/${clientId}`, data)
    }
}

export default (new BillingEntityService);