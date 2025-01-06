import Axios from "@/Axios";


class LofBusinessService{

    async getLofBusiness(data){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/lof_business/get_pagination?${queryString}`)
    }

    async createLofBusiness(data){
        console.log("data",data)
        return await Axios.post("api/lof_business", data)
    }
}

export default (new LofBusinessService);