import React from 'react'
import { Page, Text, Image, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer'
import logo from '../../assets/images/logo/redroadicon.png'
import RobotoBold from '../../assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoLight from '../../assets/fonts/Roboto/Roboto-Light.ttf'
import { format } from 'date-fns'
import Constent from '@/utils/constent'

const PrintInvoice = ({ invoice }) => {
    Font.register({ family: 'Roboto', fonts: [{ src: RobotoLight }, { src: RobotoBold, fontWeight: 700 }] })

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: 20,
            fontSize: '11px',
            fontFamily: 'Roboto',
            lineHeight: '18px',
        },
        image: {
            width: 200,
        },
        textBold: {
            fontWeight: 'bold',
        },
        fullWidth: {
            width: '100%',
        },
        invoiceDateNumber: {
            margin: '25px 0px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
        },
        invoiceDateNumberHeader: {
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        invoiceDateNumberData: {
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        billingDetails: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '30px',
        },
        billingTo: {
            width: '45%',
        },
        billingFrom: {
            width: '45%',
            display: 'flex',
            justifyContent: 'flex-end',
        },
        invoiceTypeInfo: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '20px',
        },
        invoiceTypeInfoHeader: {
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        invoiceTypeInfoValue: {
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        table: {
            width: '100%',
            marginBottom: '20px',
            border: '0',
        },
        tableHeader: {
            backgroundColor: '#f2f2f2',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
        },
        tableRow: {
            display: 'flex',
            flexDirection: 'row',
        },
        tableCell: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '8px',
            paddingBottom: '3px',
            textAlign: 'center',
        },
        tableCellLeft: {
            paddingTop: '8px',
            paddingBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'left',
        },
        noteItem: {
            marginLeft: '10px',
        },
    })
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Image source={logo} style={styles.image} />
                </View>

                <View style={styles.fullWidth}>
                    <View style={styles.invoiceDateNumber}>
                        <View style={styles.invoiceDateNumberHeader}>
                            <Text style={styles.textBold}>Invoice Date:</Text>
                            <Text style={styles.textBold}>Invoice Number:</Text>
                            <Text style={styles.textBold}>GST Number:</Text>
                        </View>
                        <View style={styles.invoiceDateNumberData}>
                            <Text>{format(invoice.invoiceDate, Constent.DATE_FORMAT)}</Text>
                            <Text>{invoice.id}</Text>
                            <Text>{invoice.gstNumber}</Text>
                        </View>
                    </View>

                    <View style={styles.billingDetails}>
                        <View style={styles.billingTo}>
                            <View style={styles.fullWidth}>
                                <Text style={styles.textBold}>To,</Text>
                                <Text>{invoice.billingTo}</Text>
                                <Text>{invoice.billingToAddress}</Text>
                            </View>
                        </View>
                        <View style={styles.billingFrom}>
                            <View style={styles.fullWidth}>
                                <Text style={styles.textBold}>From,</Text>
                                <Text>{invoice.billingFrom}</Text>
                                <Text>{invoice.billingFromAddress}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.invoiceTypeInfo}>
                        <View style={styles.invoiceTypeInfoHeader}>
                            <Text style={styles.textBold}>For Contracting Services For:</Text>
                            <Text style={styles.textBold}>Period:</Text>
                            <Text style={styles.textBold}>Department:</Text>
                        </View>
                        <View style={styles.invoiceTypeInfoValue}>
                            <Text>{invoice.process}</Text>
                            <Text>
                                {format(invoice.billingStartDate, Constent.PRINT_INVOICE_PERIOD_START_DATE_FORMAT) +
                                    ' to ' +
                                    format(invoice.billingEndDate, Constent.PRINT_INVOICE_PERIOD_END_DATE_FORMAT)}
                            </Text>
                            <Text>{invoice.department ?? 'sas'}</Text>
                        </View>
                    </View>

                    {invoice.billingTable.length > 0 && (
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>S.No.</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Description of Service</Text>
                                <Text style={[styles.tableCell, { width: '15%' }]}>Hours</Text>
                                <Text style={[styles.tableCell, { width: '10%' }]}>Rate Per Hour</Text>
                                <Text style={[styles.tableCell, { width: '15%' }]}>Total</Text>
                            </View>
                            <View>
                                {invoice.billingTable.map((billing, i) => (
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { width: '10%' }]}>{i + 1}</Text>
                                        <Text style={[styles.tableCellLeft, { width: '50%' }]}>{billing.description}</Text>
                                        <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>
                                            {billing.hours}
                                        </Text>
                                        <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>
                                            ${billing.rate}
                                        </Text>
                                        <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>
                                            ${billing.amount}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '85%', backgroundColor: '#f2f2f2' }]}>Total Amount Due</Text>
                            <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>${invoice.totalAmount}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.textBold}>Note:</Text>
                        <View style={styles.noteItem}>
                            <Text>{invoice.noteDescription}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default PrintInvoice
