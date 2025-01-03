import Axios from '@/Axios'

class DailyWorkLogService {
    async getDailyworks(data) {
        let postData = JSON.parse(JSON.stringify(data))
        const queryString = new URLSearchParams({
            ...postData.search,
            page: postData.page ?? 1,
        }).toString()
        return await Axios.get(`api/daily_work_log/get_pagination?${queryString}`)
    }

    async getDailyWork(dailyWorkId) {
        return await Axios.get(`api/daily_work_log/${dailyWorkId}`)
    }

    async createDailyWorkLog(data) {
        return await Axios.post('api/daily_work_log', data)
    }
}

export default new DailyWorkLogService()
