import FileSaver from 'file-saver'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'

export function capitalizeFirstChar(str) {
    if (!str) return str
    str = str
        .split(' ')
        .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
        .join(' ')
    return str
}
export function lowerFirstChar(str) {
    if (!str) return str
    return str.charAt(0).toLowerCase() + str.slice(1)
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

export function getCookie(cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

export function getFirstTwoChars(str) {
    if (str === undefined) {
        return ''
    }
    if (str.split(' ').length > 1) {
        return str
            .split(' ')
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('')
    } else {
        return str
            .split('')
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('')
    }
}

export function getAbbrWord(str) {
    if (str === undefined || str === '') {
        return ''
    }
    str = str.replaceAll(/[!@#$%\^&\*\-_\+]/g, ' ')
    if (str.split(' ').length > 1) {
        str = str
            .split(' ')
            .filter((word) => word)
            .map((word) => word.charAt(0).toUpperCase())
            .join('')
    } else {
        if (str.length > 4) {
            str = str
                .split('')
                .slice(0, 3)
                .map((char) => char.toUpperCase())
                .join('')
        } else {
            str = str.toUpperCase()
        }
    }
    return str
}
