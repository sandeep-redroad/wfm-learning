import React, { useEffect, useState } from 'react'
import { StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import PrintInvoice from './PrintInvoice'
import { ArrowLeft, Download } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import InvoiceService from '@/Service/InvoiceService'

const ShowInvoiece = () => {
    const { invoiceId } = useParams()
    const navigate = useNavigate()
    const [invoice, setInvoice] = useState(null)
    const getInvoice = async () => {
        const invoice = await InvoiceService.getInvoice(invoiceId)
        if (invoice.data.success) {
            if (!invoice.data.data) {
                navigate('/invoice')
                return
            }
            setInvoice(invoice.data.data)
        }
    }

    useEffect(() => {
        getInvoice()
    }, [invoiceId])

    const styles = StyleSheet.create({
        viewer: {
            width: "100vw",
            height: '90vh',
        },
        btn: {
            border: '1px solid gray',
            padding: '10px 10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            margin: '10px 0px',
        },
    })
    return invoice !== null ? (
        <div className="w-screen h-screen flex justify-start items-center flex-col">
            <div className="flex w-[95vw] gap-2 justify-end items-end">
                <Link to={`/invoice/${invoiceId}`} style={styles.btn} className="">
                    <ArrowLeft size={18} /> <span className='ms-1'>Back</span>
                </Link>
                <div>
                    <PDFDownloadLink document={<PrintInvoice invoice={invoice} />} fileName={invoice.id + '.pdf'}>
                        <div style={styles.btn} className="bg-primary-purpal hover:bg-primary-purpal text-white">
                            <Download size={14} />
                            <span className="ms-2">Download Invoice</span>
                        </div>
                    </PDFDownloadLink>
                </div>
            </div>
            <PDFViewer style={styles.viewer}>
                <PrintInvoice invoice={invoice} />
            </PDFViewer>
        </div>
    ) : (
        <div>Data Loading..</div>
    )
}

export default ShowInvoiece
