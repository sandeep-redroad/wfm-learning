import Axios from '@/Axios'

class ProjectService {
    async getProject(data) {
        let postData = JSON.parse(JSON.stringify(data))
        // if (Array.isArray(postData.search)) {
        //     postData.search = JSON.stringify(postData.search)
        // }
        console.log('postData : ', postData)
        const queryString = new URLSearchParams({
            ...postData.search,
            page: postData.page,
        }).toString()
        return await Axios.get(`api/project/get_pagination?${queryString}`)
    }

    async createProject(data) {
        return await Axios.post('api/project', data)
    }
}

export default new ProjectService()
