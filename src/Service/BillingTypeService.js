import Axios from "@/Axios";


class BillingTypeService{

    async getBillingType(data){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/billingType/get_pagination?${queryString}`)
    }

    async createBillingType(data){
        return await Axios.post("api/billingType", data)
    }

    async deleteBillingType(data){
        return await Axios.delete("api/billingType",{data})
    }
}

export default (new BillingTypeService);