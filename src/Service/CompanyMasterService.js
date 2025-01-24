import Axios from "@/Axios";


class CompanyMasterService{

    async getCompanyMasters(data = {}){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/client_master/get_pagination?${queryString}`)
    }

    async createCompanyMaster(data){
        return await Axios.post("api/client_master", data)
    }

    async deleteCompanyMaster(data){
        return await Axios.delete("api/client_master",{data})
    }

    async getCompanyMaster(clientId){
        return await Axios.get(`api/client_master/${clientId}`)
    }

    async updateCompanyMaster(clientId, data){
        return await Axios.put(`api/client_master/${clientId}`, data)
    }
}

export default (new CompanyMasterService);