import Axios from '@/Axios'

class ProjectService {
    async getProjects(data = {}) {
        let postData = JSON.parse(JSON.stringify(data))
        const queryString = new URLSearchParams({
            ...postData.search,
            page: postData.page ?? 1,
        }).toString()
        return await Axios.get(`api/project/get_pagination?${queryString}`)
    }

    async getProject(projectId) {
        return await Axios.get(`api/project/${projectId}`)
    }

    async createProject(data) {
        return await Axios.post('api/project', data)
    }

    async updateProject(projectId, data) {
        return await Axios.put(`api/project/${projectId}`, data)
    }
    async deleteProject(data){
        return await Axios.delete(`api/project`,{data})
    }
}

export default new ProjectService()
