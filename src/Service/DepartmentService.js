import Axios from "@/Axios";


class DepartmentService{

    async getDepartment(data){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/department/get_pagination?${queryString}`)
    }

    async createDepartment(data){
        return await Axios.post("api/department", data)
    }
    async deleteDepartment(data){
        return await Axios.delete("api/department",{data})
    }
}

export default (new DepartmentService);