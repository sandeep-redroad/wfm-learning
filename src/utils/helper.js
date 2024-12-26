import FileSaver from 'file-saver'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'

export function capitalizeFirstChar(str) {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const ExportExcel = (rawData, fileName) => {
    try {
        if (rawData.length == 0) {
            toast.info('Invalid data to download')
            return false
        }
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const fileExtension = '.xlsx'
        const ws = XLSX.utils.json_to_sheet(rawData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
        return true
    } catch (err) {
        toast.error(err)
        return false
    }
}
