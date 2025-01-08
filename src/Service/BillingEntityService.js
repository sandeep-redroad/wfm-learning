import Axios from "@/Axios";


class BillingEntityService{

    async getBillingEntities(data = {}){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/billing_entity/get_pagination?${queryString}`)
    }

    async createBillingEntity(data){
        return await Axios.post("api/billing_entity", data)
    }

    async getBillingEntity(billingEntityId){
        return await Axios.get(`api/billing_entity/${billingEntityId}`)
    }

    async updateBillingEntity(billingEntityId, data){
        return await Axios.put(`api/billing_entity/${billingEntityId}`, data)
    }

    async deleteBillingentity(data){
        return await Axios.delete('api/billing_entity',{data})
    }
}

export default (new BillingEntityService);