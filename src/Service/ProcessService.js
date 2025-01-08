import Axios from "@/Axios";


class ProcessService{

    async getProcess(data){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/process/get_pagination?${queryString}`)
    }

    async createProcess(data){
        return await Axios.post("api/process", data)
    }
    async deleteProcess(data){
       
        return await Axios.delete("api/process",{data})
    }
}

export default (new ProcessService);