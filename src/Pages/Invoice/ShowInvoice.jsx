import React from 'react'
import { StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import PrintInvoice from './PrintInvoice'
import { Download } from 'lucide-react'

const ShowInvoiece = () => {
    const styles = StyleSheet.create({
        viewer: {
            width: '80vw',
            height: '90vh',
        },
        btn: {
            border: '1px solid gray',
            padding: '5px 10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            marginTop: '10px',
        },
    })
    return (
        <div className="w-screen h-screen flex justify-start items-center flex-col">
            <PDFViewer style={styles.viewer}>
                <PrintInvoice />
            </PDFViewer>
            <PDFDownloadLink document={<PrintInvoice />} fileName={Date.now()}>
                <div style={styles.btn} className="bg-primary-purpal hover:bg-primary-purpal text-white">
                    <Download size={14} />
                    <span className='ms-2'>Download Invoice</span>
                </div>
            </PDFDownloadLink>
        </div>
    )
}

export default ShowInvoiece
