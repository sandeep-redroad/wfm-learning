import Axios from "@/Axios";


class LofBuisnessService{

    async getLofBuisness(data){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/lof-buisness/get_pagination?${queryString}`)
    }

    async createLofBuisness(data){
        console.log("data",data)
        return await Axios.post("api/lof-buisness", data)
    }
}

export default (new LofBuisnessService);