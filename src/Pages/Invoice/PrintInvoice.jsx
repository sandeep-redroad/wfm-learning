import React from 'react'
import { Page, Text, Image, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer'
import logo from '../../assets/images/logo/redroadicon.png'
import RobotoBold from '../../assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoLight from '../../assets/fonts/Roboto/Roboto-Light.ttf'

const PrintInvoice = () => {
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

        viewer: {
            width: '80vw',
            height: '90vh',
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
        noteItem :{
            marginLeft : "10px"
        }
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
                            <Text>11-30-2022</Text>
                            <Text>1640</Text>
                            <Text>1640</Text>
                        </View>
                    </View>

                    <View style={styles.billingDetails}>
                        <View style={styles.billingTo}>
                            <View style={styles.fullWidth}>
                                <Text style={styles.textBold}>To,</Text>
                                <Text>Kate Isgro</Text>
                                <Text>Director, Revenue Cycle Operational Support (ROS)</Text>
                                <Text>99 Cherry Hill Road, Suite 302</Text>
                                <Text>Parsippany, NJ 07054</Text>
                            </View>
                        </View>
                        <View style={styles.billingFrom}>
                            <View style={styles.fullWidth}>
                                <Text style={styles.textBold}>From,</Text>
                                <Text>Vineeth Jose</Text>
                                <Text>Head of Operations</Text>
                                <Text>Red Road Health Solutions Pvt. Ltd.</Text>
                                <Text>473, Embassy Pristine, Iblur,</Text>
                                <Text>Bangalore - 560 103</Text>
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
                            <Text>VMC/VMN</Text>
                            <Text>November 1st to November 30th 2022</Text>
                            <Text>Revenue Cycle Management</Text>
                        </View>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableCell, { width: '10%' }]}>S.No.</Text>
                            <Text style={[styles.tableCellLeft, { width: '50%' }]}>Description of Service</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>Hours</Text>
                            <Text style={[styles.tableCell, { width: '10%' }]}>Rate Per Hour</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>Total</Text>
                        </View>
                        <View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>1</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>2</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>3</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { width: '10%' }]}>4</Text>
                                <Text style={[styles.tableCellLeft, { width: '50%' }]}>Contracting Service</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>580</Text>
                                <Text style={[styles.tableCell, { width: '10%', backgroundColor: 'rgb(250,204,21 / 1)' }]}>$1</Text>
                                <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '85%', backgroundColor: '#f2f2f2' }]}>Total Amount Due</Text>
                            <Text style={[styles.tableCell, { width: '15%', backgroundColor: 'rgb(34,211,238/1)' }]}>$580</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.textBold}>Note:</Text>
                        <View style={styles.noteItem}>
                            <Text>1. No. of FTEs deployed - 1, No. of working days - 18</Text>
                            <Text>2. No. of FTEs deployed - 1, No. of working days - 18</Text>
                            <Text>3. No. of FTEs deployed - 1, No. of working days - 18</Text>
                            <Text>4. No. of FTEs deployed - 1, No. of working days - 18.5</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default PrintInvoice
