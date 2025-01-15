import Axios from "@/Axios";


class NoteService{

    async getNotes(data = {}){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/note/get_pagination?${queryString}`)
    }

    async createNote(data){
        return await Axios.post("api/note", data)
    }

    async deleteNotes(data){
        return await Axios.delete("api/note",{data})
    }

    async getNote(clientId){
        return await Axios.get(`api/note/${clientId}`)
    }

    async updateNote(clientId, data){
        return await Axios.put(`api/note/${clientId}`, data)
    }
}

export default (new NoteService);