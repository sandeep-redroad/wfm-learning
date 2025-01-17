import Axios from "@/Axios";


class InvoiceService{

    async getInvoices(data = {}){
        const queryString = new URLSearchParams(data).toString();
        return await Axios.get(`api/invoice/get_pagination?${queryString}`)
    }

    async createInvoice(data){
        return await Axios.post("api/invoice", data)
    }

    async deleteInvoice(data){
        return await Axios.delete("api/invoice",{data})
    }

    async getInvoice(invoiceId){
        return await Axios.get(`api/invoice/${invoiceId}`)
    }

    async updateInvoice(invoiceId, data){
        return await Axios.put(`api/invoice/${invoiceId}`, data)
    }
}

export default (new InvoiceService);