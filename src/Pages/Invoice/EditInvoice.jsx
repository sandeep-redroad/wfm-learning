import { React, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { CalendarIcon, Printer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import SearchableDropdown from '../../Components/Common/SearchableDropdown'
import { Link, useParams } from 'react-router-dom'
import Constent from '@/utils/constent'
import ClientService from '@/Service/ClientService'
import ProjectService from '@/Service/ProjectService'
import InvoiceService from '@/Service/InvoiceService'
import ProcessService from '@/Service/ProcessService'

const EditInvoice = () => {
    const { invoiceId } = useParams()
    const [checkAll, setcheckAll] = useState(false)
    const [rows, setRows] = useState([])
    const formRef = useRef(null)
    const [projects, setProjects] = useState([])
    const [clients, setClient] = useState([])
    const [process, setProcess] = useState([])
    const [invoice_date, setInvoiceDate] = useState(format(new Date(), Constent.DATE_FORMAT))
    const [start_date, setStartDate] = useState(format(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), Constent.DATE_FORMAT))
    const [end_date, setEndDate] = useState(format(new Date(new Date().getFullYear(), new Date().getMonth(), 0), Constent.DATE_FORMAT))
    const [project, setProject] = useState(null)
    const [projectSerchParams, setProjectSearchParams] = useState({
            search: {
                client: '',
                process: '',
            },
        })
    const [invoiceField, setInvoiceField] = useState({
        client: '',
        invoiceDate: invoice_date,
        projectId: '',
        lofBusiness: '',
        process: '',
        billingType: '',
        invoiceStartDate: '',
        invoiceEndDate: '',
        billingTo: '',
        billingToAddress: '',
        billingFrom: '',
        billingFromAddress: '',
        billingStartDate: start_date,
        billingEndDate: end_date,
        noteDescription: '',
        totalAmount: '',
        paidAmount: '',
        paymentStatus: '',
        noOfWorkingDays: '',
        noOfChartReceive: '',
    })


      const getProcess = async () => {
        console.log("in process")
            try {
                const resp = await ProcessService.getProcess()
                console.log("in process",resp)
                if (resp.data.success) {
                    setProcess(resp.data.data)
                }
            } catch (err) {
                console.log(err)
            }
        }

    const form = useForm()

    const setStartEnd = (e) => {
        let checkdate = parseInt(e.getDate())
        const currentDate = new Date(e)
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()

        if (checkdate < 25) {
            const startOfPrevMonth = new Date(currentYear, currentMonth - 1, 1)
            const endOfPrevMonth = new Date(currentYear, currentMonth, 0)
            form.setValue('billingStartDate', format(startOfPrevMonth, Constent.DATE_FORMAT))
            form.setValue('billingEndDate', format(endOfPrevMonth, Constent.DATE_FORMAT))
        } else {
            const startOfMonth = new Date(currentYear, currentMonth, 1)
            const endOfMonth = new Date(currentYear, currentMonth + 1, 0)
            form.setValue('billingStartDate', format(startOfMonth, Constent.DATE_FORMAT))
            form.setValue('billingEndDate', format(endOfMonth, Constent.DATE_FORMAT))
        }
    }

    const getProjects = async () => {
        try {
            let queryParam = {
                search: {
                    client: form.getValues('client'),
                },
            }
            const resp = await ProjectService.getProjects(queryParam)
            if (resp.data.success) {
                setProjects(resp.data.data)
            }
        } catch (err) {}
    }

    useEffect(() => {
        if (form.getValues('client') !== '') {
            getProjects()
        }
    }, [form.getValues('client')])

    const getProject = async (projectId) => {
        try {
            const resp = await ProjectService.getProject(projectId)
            if (resp.data.success) {
                setInvoiceField((prev) => {
                    console.log('in res', resp.data.data)
                    let data = resp.data.data
                    return {
                        ...prev,
                        // Assuming you only want to overwrite specific fields from resp.data.data
                        client: data.client || prev.client,
                        invoiceDate: data.invoiceDate || prev.invoiceDate,
                        lofBusiness: data.lofBusiness || prev.lofBusiness,
                        process: data.process || prev.process,
                        billingType: data.billingType || prev.billingType,
                        invoiceStartDate: data.invoiceStartDate || prev.invoiceStartDate,
                        invoiceEndDate: data.invoiceEndDate || prev.invoiceEndDate,
                        billingTo: data.billingTo || prev.billingTo,
                        billingToAddress: data.billingToAddress || prev.billingToAddress,
                        billingFrom: data.billingFrom || prev.billingFrom,
                        billingFromAddress: data.billingFromAddress || prev.billingFromAddress,
                        billingStartDate: data.billingStartDate || prev.billingStartDate,
                        billingEndDate: data.billingEndDate || prev.billingEndDate,
                        noteDescription: data.noteDescription || prev.noteDescription,
                        totalAmount: data.totalAmount || prev.totalAmount,
                        paidAmount: data.paidAmount || prev.paidAmount,
                        paymentStatus: data.paymentStatus || prev.paymentStatus,
                        noOfWorkingDays: data.noOfWorkingDays || prev.noOfWorkingDays,
                        noOfChartReceive: data.noOfChartReceive || prev.noOfChartReceive,
                        noOfFTEDeployed: data.noOfFTEDeployed || prev.noOfFTEDeployed,
                        projectId: projectId, // Ensure projectId is updated with the current one
                    }
                })
                form.reset({ ...resp.data.data, projectId: projectId })
                let descriptions = resp.data.data.descriptions ?? []
                setRows((prev) => {
                    let newRows = []
                    const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1
                    descriptions.map((desc) => {
                        newRows.push({
                            id: newId,
                            _id: desc._id,
                            checkbox: false,
                            isDeleted: desc.isDeleted,
                            projectId: desc.projectId,
                            description: desc.description,
                            hours: '',
                            rate: resp.data.data.rate,
                            amount: '',
                        })
                    })
                    return newRows
                })
            }
        } catch (err) {}
    }

    const getInvoice = async () => {
        try {
            const resp = await InvoiceService.getInvoice(invoiceId)

            if (resp.data.success) {
                if (!resp.data.data) {
                    toast.error('Invoice Not Found')
                    navigate('/invoice')
                    return
                }

                setInvoiceField((prev) => {
                    console.log(resp.data.data)
                    return {
                        ...prev,
                        ...resp.data.data,
                    }
                })

                setRows((prev) => {
                    return [
                        ...prev,
                        ...resp.data.data.billingTable.map((record, i) => ({
                            ...record,
                            id: i + 1,
                            checkbox: false,
                        })),
                    ]
                })
            }
        } catch (err) {}
    }

    useEffect(() => {
        getProcess()
        getInvoice()
        getClient()
       
        getProjects()
    }, [])
    const getClient = async () => {
        try {
            const resp = await ClientService.getClients()
            if (resp.data.success) {
                setClient(resp.data.data)
            }
        } catch (err) {}
    }

     useEffect(() => {
            if (projectSerchParams.search.client !== '' && projectSerchParams.search.process !== '') {
                getProjects()
            }
        }, [projectSerchParams.search.client, projectSerchParams.search.process])

    async function onSubmit(data) {
        console.log('data', data)
        delete data['billingTable']
        const filteredObj = Object.fromEntries(Object.entries(data).filter(([key, value]) => value == ''))
        const validatedData = {
            client: 'Client',
            invoiceDate: 'Invoice Date',
            projectId: 'Project',
            lofBusiness: 'LOF Bussiness',
            process: 'Process',
            billingType: 'Billing Type',
            billingTo: 'Billing To',
            billingToAddress: 'Billing To Address',
            billingFrom: 'Billing From',
            billingFromAddress: 'Billing From Address',
            billingStartDate: 'Billing Start Date',
            billingEndDate: 'Billing End Date',
            noteDescription: 'Note Description',
            totalAmount: 'Total Amount',
            paidAmount: 'Paid Amount',
            paymentStatus: 'Status',
            noOfWorkingDays: 'No of Working Days',
            noOfChartReceive: 'No of Chart Receive',
            timeTakenPerChart: 'Time Taken Per Chart',
            noOfFTEDeployed: 'No of FTE Deployed',
        }
        console.log('rows L ', rows)
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].description === '') {
                toast.error('Description of Service is requrired')
                return
            }
            if (rows[i].hours == '') {
                toast.error('Hours is requried')
                return
            }
            if (rows[i].rate == '') {
                toast.error('Rate is requried')
                return
            }
            if (rows[i].amount == '') {
                toast.error('Rate is requried')
                return
            }
        }

        let filterKey = Object.keys(filteredObj)
        for (let i = 0; i < filterKey.length; i++) {
            let key = filterKey[i]
            if (key == 'timePerWorkItem') {
                continue
            }
            if (validatedData[key] !== undefined && filteredObj[key] == '') {
                toast.error(validatedData[key] + ' is required')
                return
            }
        }

        invoiceField['billingTable'] = rows

        console.log('final Data : ', invoiceField)
        const resp = await InvoiceService.updateInvoice(invoiceId, invoiceField)
        if (resp.data.success) {
            navigate('/invoice')
        }
    }
    const addRow = () => {
        setRows((prev) => {
            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1
            return [
                ...prev,
                {
                    id: newId,
                    checkbox: false,
                    isDeleted: false,
                    projectId: '',
                    description: '',
                    hours: '',
                    rate: project?.rate ?? '',
                    amount: '',
                },
            ]
        })
    }

    const deleteone = (id) => {
        //const updatedrows = rows.filter((row) => !row.checkbox)
        const updatedrows1 = rows.map((row) => {
            row['isDeleted'] = row.checkbox
            console.log(row)
            return row
        })
        console.log('updated rows', updatedrows1)

        let newdata = updatedrows1.length > 0 ? updatedrows1 : []

        setRows(() => newdata)
    }
    const deleteAll = () => {
        setRows([])
    }
    const changeOne = (row) => {
        setRows((prev) => {
            let updatedData = []

            prev.map((item, i) => {
                if (item.id == row.id) {
                    prev[i]['checkbox'] = !prev[i]['checkbox']
                }
                updatedData.push(item)
            })
            return updatedData
        })
    }

    const changeAll = () => {
        let isChecked = !checkAll
        setcheckAll((prev) => isChecked)

        setRows((prev) => {
            let updatedData = []

            prev.map((item, i) => {
                prev[i]['checkbox'] = isChecked
                updatedData.push(item)
            })

            return updatedData
        })
    }
    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit()
        }
    }
    return (
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-end items-center">
                        <div className="flex items-center justify-end gap-2">
                            <Link className="button" target="_blank" to={`/printInvoice/${invoiceId}`}>
                                <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">
                                    <Printer /> Print Invoice
                                </Button>
                            </Link>
                            <Link className="button" to="/invoice">
                                <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                            </Link>
                            <Button className="bg-primary-purpal hover:bg-primary-purpal" onClick={handleSaveClick}>
                                Save
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
                <Card className="h-full overflow-card-scroll w-full m-0 overflow-auto">
                    <CardContent className="m-0 p-2 max-h-full">
                        <Form {...form} className="">
                            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="p-4 lg:ps-5">
                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                    <FormField
                                        control={form.control}
                                        name="client"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client</FormLabel>
                                                <div className="full">
                                                    <SearchableDropdown
                                                        options={clients}
                                                        selectedVal={invoiceField.client}
                                                        handleChange={(val) => {
                                                            setInvoiceField((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    client: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="Client"
                                                        label="client"
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="invoiceDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Invoice Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                {invoiceField.invoiceDate
                                                                    ? format(invoiceField.invoiceDate, Constent.DATE_FORMAT)
                                                                    : invoice_date}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            {...field}
                                                            selected={new Date(invoiceField.invoiceDate)}
                                                            onSelect={(e) => {
                                                                field.onChange(format(e, Constent.DATE_FORMAT))
                                                                setStartEnd(e)
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="process"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Process</FormLabel>
                                                <div className="full">
                                                <SearchableDropdown
                                                        options={process}
                                                        selectedVal={invoiceField.process}
                                                        handleChange={(val) => {
                                                            setProjectSearchParams((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    search: {
                                                                        ...prev.search,
                                                                        process: val,
                                                                    },
                                                                }
                                                            })
                                                            setInvoiceField((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    process: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="Process"
                                                        label="process"
                                                    />
                                                    {/* <Input value={invoiceField.process} placeholder="Process" readOnly={true} /> */}
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lofBusiness"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>LOF Business</FormLabel>
                                                <div className="w-full">
                                                    <Input value={invoiceField.lofBusiness} placeholder="LOF Business" readOnly={true} />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="projectId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project</FormLabel>
                                                <div className="full">
                                                    <SearchableDropdown
                                                        options={projects}
                                                        selectedVal={invoiceField.projectId}
                                                        handleChange={(val) => {
                                                            getProject(val)
                                                            setInvoiceField((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    projectId: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="Project"
                                                        label="id"
                                                        type="projectFromInvoice"
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        className="w-full"
                                        control={form.control}
                                        name="billingType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Billing Type</FormLabel>
                                                <div className="full">
                                                    <Input value={invoiceField.billingType} placeholder="Billing type" readOnly={true} />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem] mt-[20px]">
                                    <FormField
                                        control={form.control}
                                        name="billingFrom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Billing From</FormLabel>
                                                <div className="w-full">
                                                    <Input
                                                        {...field}
                                                        placeholder="Billing From"
                                                        value={invoiceField.billingFrom}
                                                        readOnly={true}
                                                        className="mb-5"
                                                    />
                                                    <Textarea
                                                        placeholder="billing from address"
                                                        value={invoiceField.billingFromAddress}
                                                        className="resize-none"
                                                        rows="3"
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="billingTo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Billing To</FormLabel>
                                                <div className="w-full">
                                                    <Input
                                                        {...field}
                                                        placeholder="Billing To"
                                                        value={invoiceField.billingTo}
                                                        readOnly={true}
                                                        className="mb-5"
                                                    />
                                                    <Textarea
                                                        placeholder="billing to address"
                                                        value={invoiceField.billingToAddress}
                                                        className="resize-none"
                                                        rows="3"
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="billingStartDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Start Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                {field.value ? format(field.value, Constent.DATE_FORMAT) : start_date}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={new Date(invoiceField.billingStartDate)}
                                                            onSelect={(e) => {
                                                                invoiceField.onChange(format(invoiceField.billingStartDate, Constent.DATE_FORMAT))
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="billingEndDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>End Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                {invoiceField.billingEndDate
                                                                    ? format(invoiceField.billingEndDate, Constent.DATE_FORMAT)
                                                                    : end_date}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={new Date(invoiceField.billingEndDate)}
                                                            onSelect={(e) => {
                                                                invoiceField.billingEndDate.onChange(format(e, Constent.DATE_FORMAT))
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                    {invoiceField?.billingType == 'Hourly Transactional' && (
                                        <>
                                            <FormField
                                                className="w-full"
                                                control={form.control}
                                                name="noOfChartReceive"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>No of charts recieved</FormLabel>
                                                        <div className="full">
                                                            <Input
                                                                type="number"
                                                                value={invoiceField.noOfChartReceive}
                                                                placeholder="No charts recieved"
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                className="w-full"
                                                control={form.control}
                                                name="timeTakenPerChart"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Time taken per chart</FormLabel>
                                                        <div className="full">
                                                            <Input
                                                                type="number"
                                                                value={invoiceField.timeTakenPerChart}
                                                                placeholder="Time taken per chart"
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                    {invoiceField?.billingType == 'FTE' && (
                                        <>
                                            <FormField
                                                className="w-full"
                                                control={form.control}
                                                name="noOfFTEDeployed"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>No of FTEs Deployed</FormLabel>
                                                        <div className="full">
                                                            <Input
                                                                type="number"
                                                                value={invoiceField.noOfFTEDeployed}
                                                                onChange={(e) =>
                                                                    setInvoiceField((prev) => {
                                                                        return { ...prev, noOfFTEDeployed: e.target.value }
                                                                    })
                                                                }
                                                                placeholder="No of FTEs Deployed"
                                                            />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                className="w-full"
                                                control={form.control}
                                                name="noOfWorkingDays"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>No of working days</FormLabel>
                                                        <div className="full">
                                                            <Input
                                                                type="number"
                                                                value={invoiceField.noOfWorkingDays}
                                                                placeholder="No of working days"
                                                                onChange={(e) =>
                                                                    setInvoiceField((prev) => {
                                                                        return { ...prev, noOfWorkingDays: e.target.value }
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                </div>
                                <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem] ">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border">
                                                <TableHead className="w-[35px] border">
                                                    <Checkbox onClick={changeAll} value={checkAll} checked={checkAll} />
                                                </TableHead>
                                                <TableHead className="w-[50px] border">Sr.No</TableHead>
                                                <TableHead className="w-[300px] border">Description of Service</TableHead>
                                                <TableHead className="w-[100px] border">
                                                    {project?.billingType == 'Per WorkItem Transactional' ? 'Charts' : 'Hours'}
                                                </TableHead>
                                                <TableHead className="w-[150px] border">
                                                    {project?.billingType == 'Per WorkItem Transactional' ? 'Rate per chart($)' : 'Rate per hour($)'}
                                                </TableHead>
                                                <TableHead className="w-[100px] border">Amount($)</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {rows.length == 0 ? (
                                                <tr>
                                                    <td colSpan="6">
                                                        <h6 className="text-center" style={{ margin: 0 }}>
                                                            No Data
                                                        </h6>
                                                    </td>
                                                </tr>
                                            ) : (
                                                rows.map(
                                                    (row, i) =>
                                                        !row?.isDeleted && (
                                                            <TableRow key={row.id} className="border">
                                                                <TableCell className="border">
                                                                    <Checkbox
                                                                        onClick={() => changeOne(row, i)}
                                                                        checked={row.checkbox}
                                                                        value={row.checkbox}
                                                                    />
                                                                    <input type="hidden" value={row.isDeleted} name="isDeleted" />
                                                                </TableCell>
                                                                <TableCell className="border">{row.id}</TableCell>
                                                                <TableCell className="border">
                                                                    <div className="w-full border-none">
                                                                        <Input
                                                                            type="text"
                                                                            value={row.description}
                                                                            placeholder="description"
                                                                            className="border-none shadow-none"
                                                                            onChange={(e) => {
                                                                                setRows((prev) => {
                                                                                    let updatedData = []
                                                                                    prev.map((item, i) => {
                                                                                        if (item.id == row.id) {
                                                                                            prev[i]['description'] = e.target.value
                                                                                        }
                                                                                        updatedData.push(item)
                                                                                    })
                                                                                    setInvoiceField((prev) => {
                                                                                        return {
                                                                                            ...prev,
                                                                                            totalAmount: updatedData.reduce(
                                                                                                (acc, item) => acc + item.amount,
                                                                                                0
                                                                                            ),
                                                                                        }
                                                                                    })
                                                                                    return updatedData
                                                                                })
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </TableCell>

                                                                <TableCell className="border p-0">
                                                                    <div className="flex items-center space-x-2 justify-center">
                                                                        <Input
                                                                            type="number"
                                                                            placeholder="Hours"
                                                                            value={row.hours}
                                                                            onChange={(e) => {
                                                                                let hours = e.target.value
                                                                                setRows((prev) => {
                                                                                    let updatedData = []
                                                                                    let amount = Number(row.rate) * Number(hours)

                                                                                    prev.map((item, i) => {
                                                                                        if (item.id == row.id) {
                                                                                            prev[i]['hours'] = hours
                                                                                            prev[i]['amount'] = amount
                                                                                        }
                                                                                        updatedData.push(item)
                                                                                    })
                                                                                    setInvoiceField((prev) => {
                                                                                        return {
                                                                                            ...prev,
                                                                                            totalAmount: updatedData.reduce(
                                                                                                (acc, item) => acc + item.amount,
                                                                                                0
                                                                                            ),
                                                                                        }
                                                                                    })
                                                                                    return updatedData
                                                                                })
                                                                            }}
                                                                            className="border-none shadow-none focus-visible:ring-0"
                                                                        />
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="border p-0">
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="Rate"
                                                                        value={row.rate}
                                                                        onChange={(e) => {
                                                                            let rate = e.target.value
                                                                            setRows((prev) => {
                                                                                let updatedData = []
                                                                                let amount = Number(row.hours) * Number(rate)
                                                                                prev.map((item, i) => {
                                                                                    if (item.id == row.id) {
                                                                                        prev[i]['rate'] = rate
                                                                                        prev[i]['amount'] = amount
                                                                                    }
                                                                                    updatedData.push(item)
                                                                                })
                                                                                setInvoiceField((prev) => {
                                                                                    return {
                                                                                        ...prev,
                                                                                        totalAmount: updatedData.reduce(
                                                                                            (acc, item) => acc + item.amount,
                                                                                            0
                                                                                        ),
                                                                                    }
                                                                                })
                                                                                return updatedData
                                                                            })
                                                                        }}
                                                                        className="border-none shadow-none focus-visible:ring-0"
                                                                    />
                                                                </TableCell>
                                                                <TableCell className="p-0">
                                                                    <Input
                                                                        placeholder="Amount"
                                                                        value={row.amount}
                                                                        disabled={true}
                                                                        className="border-none shadow-none focus-visible:ring-0"
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                    <Button
                                        type="button"
                                        className=""
                                        onClick={addRow}
                                        style={{
                                            padding: '0px 10px',
                                            height: '28px',
                                            backgroundColor: '#808080d6',
                                        }}
                                    >
                                        Add Row
                                    </Button>

                                    {!checkAll &&
                                    rows.filter((row) => {
                                        return row.checkbox
                                    }).length > 0 ? (
                                        <Button
                                            type="button"
                                            className="bg-primary-red ml-1"
                                            onClick={() => deleteone()}
                                            style={{ padding: '0px 10px', height: '28px' }}
                                        >
                                            Delete
                                        </Button>
                                    ) : (
                                        ''
                                    )}

                                    {checkAll && rows.length > 0 && (
                                        <Button
                                            type="button"
                                            className="bg-primary-red ml-1"
                                            onClick={deleteAll}
                                            style={{ padding: '0px 10px', height: '28px' }}
                                        >
                                            Delete All
                                        </Button>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                    <FormField
                                        control={form.control}
                                        name="note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Note Descripction</FormLabel>

                                                <div className="w-full">
                                                    <Textarea
                                                        value={invoiceField?.noteDescription ?? ''}
                                                        placeholder="Note Descriptions"
                                                        className="resize-none"
                                                        row="1"
                                                        onChange={(e) =>
                                                            setInvoiceField((prev) => {
                                                                return { ...prev, noteDescription: e.target.value }
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="totalAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Amount</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Total Amount" value={invoiceField.totalAmount} disabled={true} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        className="w-full"
                                        control={form.control}
                                        name="paymentStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <div className="w-full">
                                                    <Select
                                                        name="status"
                                                        defaultValue={'Pending'}
                                                        value={invoiceField.paymentStatus}
                                                        className=" w-full"
                                                        onValueChange={(val) =>
                                                            setInvoiceField((prev) => {
                                                                return { ...prev, paymentStatus: val }
                                                            })
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="shadow-none  w-full">
                                                                <SelectValue placeholder="Select Status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Processed">Processed</SelectItem>
                                                            <SelectItem value="Past Due">Past Due</SelectItem>
                                                            <SelectItem value="Hold">Hold</SelectItem>
                                                            <SelectItem value="Not due yet">Not due yet</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* <FormField
                                        control={form.control}
                                        name="paidAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount Paid</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        value={invoiceField.paidAmount}
                                                        placeholder="Amount Paid"
                                                        onChange={(e) => {
                                                            setInvoiceField((prev) => {
                                                                return { ...prev, paidAmount: e.target.value }
                                                            })
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    /> */}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default EditInvoice
