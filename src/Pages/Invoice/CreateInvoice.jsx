import { React, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import BillingData from '@/assets/data/BillingData'
import { Textarea } from '@/components/ui/textarea'
import SearchableDropdown from '../../Components/Common/SearchableDropdown'
import { Link } from 'react-router-dom'
import Constent from '@/utils/constent'
import LofBusinessService from '@/Service/LofBusinessService'
import BillingTypeService from '@/Service/BillingTypeService'

import ClientService from '@/Service/ClientService'
import ProcessService from '@/Service/ProcessService'
import ProjectService from '@/Service/ProjectService'

const Invoicef = () => {
    const [checkAll, setcheckAll] = useState(false)
    const [rows, setRows] = useState([])
    const formRef = useRef(null)
    const [lob_processes, setLOBprocess] = useState([])
    const [projects, setProjects] = useState([])
    const [clients, setClient] = useState([])
    const [invoice_date, setInvoiceDate] = useState(format(new Date(), Constent.DATE_FORMAT))
    const [start_date, setStartDate] = useState(format(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), Constent.DATE_FORMAT))
    const [end_date, setEndDate] = useState(format(new Date(new Date().getFullYear(), new Date().getMonth(), 0), Constent.DATE_FORMAT))
    const [isbilling, setIsbilling] = useState(false)
    const [product, setProduct] = useState(null)
    const [process, setProcess] = useState([])
    const [billing_type, setBillingType] = useState([])
    const [noneValidatedValue, setNoneValidatedValue] = useState({
        client: '',
        billingType: '',
        department: '',
        projectlead: '',
        date: '',
        billingFrom: '',
        billingFromAddress: '',
        billingTo: '',
        billingToAddress: '',
        billingStartDate: '',
        billingEndDate: '',
    })

    const form = useForm({
        defaultValues: {
            comments: '',
            invoice_date: invoice_date,
            start_date: start_date,
            end_date: end_date,
        },
    })

    const setStartEnd = (e) => {
        let checkdate=e.getDate();
        console.log('in start end', e.getDate())
        console.log(parseInt(e))
        if(checkdate<25){
            console.log("is less than 25")
            setStartDate(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toLocaleDateString(), Constent.DATE_FORMAT)
            setEndDate(new Date(new Date().getFullYear(), new Date().getMonth(), 0).toLocaleDateString(), Constent.DATE_FORMAT)
        }else{
            console.log("is greater than 25")
            setStartDate(new Date(new Date().getFullYear(), new Date().getMonth() , 1).toLocaleDateString(), Constent.DATE_FORMAT)
            setEndDate(new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).toLocaleDateString(), Constent.DATE_FORMAT)
        }
    }

    // const getLofBusiness = async () => {
    //     try {
    //         const resp = await LofBusinessService.getLofBusiness()
    //         if (resp.data.success) {
    //             setLOBprocess(resp.data.data)
    //         }
    //         console.log(lob_processes)
    //     } catch (err) {}
    // }

    const getProjects = async () => {
        try {
            let queryParam = {
                search: {
                    client: noneValidatedValue.client,
                    billingType: noneValidatedValue.billingType,
                },
            }
            const resp = await ProjectService.getProjects(queryParam)
            if (resp.data.success) {
                setProjects(resp.data.data)
            }
            console.log('resp l : ', resp)
        } catch (err) {}
    }

    const getProject = async (projectId) => {
        try {
            const resp = await ProjectService.getProject(projectId)
            if (resp.data.success) {
                setProduct(resp.data.data)

                //setCustomFields(resp.data.data.customFields)
            }
        } catch (err) {}
    }

    useEffect(() => {
        // getLofBusiness()
        getProjects()
        getClient()
        getBillingTypes()
        getProcess()
    }, [])

    useEffect(() => {
        if (noneValidatedValue.client !== '' && noneValidatedValue.billingType !== '') {
            getProjects()
        }
    }, [noneValidatedValue.client, noneValidatedValue.billingType])

    const getBillingTypes = async () => {
        try {
            const resp = await BillingTypeService.getBillingType()
            if (resp.data.success) {
                setBillingType(resp.data.data)
            }
        } catch (err) {
            console.log('in billing', err)
        }
    }
    const getClient = async () => {
        try {
            const resp = await ClientService.getClients()
            if (resp.data.success) {
                setClient(resp.data.data)
            }
        } catch (err) {}
    }

    const getProcess = async () => {
        try {
            const resp = await ProcessService.getProcess()
            if (resp.data.success) {
                setProcess(resp.data.data)
            }
        } catch (err) {}
    }

    function onSubmit(data) {
        Object.assign(data, noneValidatedValue)
        const filteredObj = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => key !== 'comments' && value == '') // Filter based on value
        )
        let key = Object.keys(filteredObj)[0]
        if (key == 'lob_process') {
            toast.error('Please select line of business')
            return
        }
        if (key == 'client') {
            toast.error('Please select client')
            return
        }
        if (key == 'department') {
            toast.error('Please select department')
            return
        }
        if (key == 'billing_to') {
            toast.error('Please select Project lead')
            return
        }
        if (key == 'billing_from') {
            toast.error('Please select Project lead')
            return
        }

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].process === '') {
                toast.error('Please select process name')
                return
            } else if (rows[i].billingtype == '') {
                toast.error('Please select billing type')
                return
            }
        }
        data['process'] = rows

        console.log('final Data : ', data)
    }
    const addRow = () => {
        setRows((prev) => {
            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1
            return [
                ...prev,
                {
                    id: newId,
                    checkbox: false,
                    enable: false,
                    projectId: '',
                    process: '',
                    billingtype: '',
                    rate: '',
                    amount: '',
                },
            ]
        })
    }
    const deleteone = (id) => {
        const updatedrows = rows.filter((row) => !row.checkbox)
        let newdata = updatedrows.length > 0 ? updatedrows : []

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

    const calculateAmount = (row) => {
        console.log(row)

        setRows((prev) => {
            let updatedData = []
            prev.map((item, i) => {
                if (item.id == row.id) {
                    prev[i]['amount'] = prev[i]['rate'] * prev[i]['workItem']
                }
                updatedData.push(item)
            })
            console.log(updatedData)
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

    const handlebillingChange = (e) => {
        console.log('in handle bill change', e)
        if (e == 'Per WorkItem Transactional') {
            setIsbilling(true)
        } else {
            setIsbilling(false)
        }
        console.log('issbilling', isbilling)
    }
    return (
        <>
            <Card className="p-0 mb-[44px] mx-0 rounded-none sticky top-16 w-full z-10">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-end items-center">
                        <div className="flex items-center justify-end gap-2">
                            <Link className="button" to="/invoices">
                                <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                            </Link>
                            <Button className="" onClick={handleSaveClick}>
                                Save
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="overflow-auto">
                <Card className="p-0 m-3">
                    <CardContent className="m-0 p-3">
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
                                                        selectedVal={noneValidatedValue.client}
                                                        handleChange={(val) => {
                                                            setNoneValidatedValue((prev) => {
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
                                        name="invoice_date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Invoice Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                {noneValidatedValue.invoice_date ? format(noneValidatedValue.invoice_date, Constent.DATE_FORMAT) : invoice_date}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={noneValidatedValue.invoice_date}
                                                            onSelect={(e) => {
                                                                setNoneValidatedValue((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        invoice_date: e,
                                                                    }
                                                                })
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
                                        name="client"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project</FormLabel>
                                                <div className="full">
                                                    <SearchableDropdown
                                                        options={projects}
                                                        selectedVal={noneValidatedValue.project}
                                                        handleChange={(val) => {
                                                            getProject(val)
                                                            setNoneValidatedValue((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    project: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="Project"
                                                        label="id"
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lob_process"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>LOF Business</FormLabel>
                                                <div className="w-full">
                                                    <Input {...field} placeholder="LOF Business" value={product?.lofBusiness ?? ''} disabled={true} />
                                                </div>
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
                                                    <Input {...field} placeholder="Process" value={product?.process ?? ''} disabled={true} />
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
                                                    <Input {...field} placeholder="Billing type" value={product?.billingType ?? ''} disabled={true} />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem] mt-[20px]">
                                    <FormField
                                        control={form.control}
                                        name="billing_from"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Billing From</FormLabel>
                                                <div className="w-full">
                                                    <SearchableDropdown
                                                        options={projects}
                                                        selectedVal={noneValidatedValue.project}
                                                        handleChange={(val) => {
                                                            getProject(val)
                                                            setNoneValidatedValue((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    project: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="Billing From"
                                                        label="billing_from"
                                                        className="mb-5"
                                                    />
                                                    <Textarea placeholder="billing from" className="resize-none" row="1" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="billing_to"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Billing To</FormLabel>
                                                <div className="w-full">
                                                    <SearchableDropdown
                                                        options={projects}
                                                        selectedVal={noneValidatedValue.project}
                                                        handleChange={(val) => {
                                                            getProject(val)
                                                            setNoneValidatedValue((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    project: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="Billing To"
                                                        label="billing_to"
                                                        className="mb-5"
                                                    />
                                                    <Textarea placeholder="billing to" className="resize-none" row="1" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="start_date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Start Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                {noneValidatedValue.start_date
                                                                    ? format(noneValidatedValue.start_date, Constent.DATE_FORMAT)
                                                                    : start_date}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={noneValidatedValue.start_date}
                                                            onSelect={(e) => {
                                                                setNoneValidatedValue((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        start_date: e,
                                                                    }
                                                                })
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
                                        name="end_date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>End Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                {noneValidatedValue.end_date
                                                                    ? format(noneValidatedValue.end_date, Constent.DATE_FORMAT)
                                                                    : end_date}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={noneValidatedValue.end_date}
                                                            onSelect={(e) => {
                                                                setNoneValidatedValue((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        end_date: e,
                                                                    }
                                                                })
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                    {product?.billingType=="Hourly Transactional"&&
                                      <>
                                      <FormField
                                        className="w-full"
                                        control={form.control}
                                        name="billingType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>No of charts recieved</FormLabel>
                                                <div className="full">
                                                    <Input  type="number"{...field} placeholder="No charts recieved" value={product?.billingType ?? ''} disabled={true} />
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
                                                <FormLabel>Time taken per chart</FormLabel>
                                                <div className="full">
                                                    <Input type="number" {...field} placeholder="Time taken per chart" value={product?.billingType ?? ''} disabled={true} />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                      </>
                                    }
                                    {
                                        product?.billingType=="FTE"&&
                                    
                                     <>
                                     <FormField
                                        className="w-full"
                                        control={form.control}
                                        name="no_fte"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>No of FTEs Deployed</FormLabel>
                                                <div className="full">
                                                    <Input type="number"{...field} placeholder="No of FTEs Deployed"  />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                      <FormField
                                        className="w-full"
                                        control={form.control}
                                        name="no_work"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>No of working days</FormLabel>
                                                <div className="full">
                                                    <Input type="number" {...field} placeholder="No of working days"  />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                     </>
                                    }
                                </div>
                                <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem] ">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border">
                                                <TableHead className="w-[35px] border">
                                                    <Checkbox onClick={changeAll} value={checkAll} checked={checkAll} />
                                                </TableHead>
                                                <TableHead className="w-[50px] border">Sr.No</TableHead>
                                                <TableHead className="w-[300px] border">Description</TableHead>
                                                <TableHead className="w-[100px] border">{product?.billingType=="Per WorkItem Transactional" ? 'Charts' : 'Hours'}</TableHead>
                                                <TableHead className="w-[150px] border">{product?.billingType=="Per WorkItem Transactional"? 'Rate per chart' : 'Rate per hour'}</TableHead>
                                                <TableHead className="w-[100px] border">Amount</TableHead>
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
                                                rows.map((row, i) => (
                                                    <TableRow key={row.id} name="process" className="border">
                                                        <TableCell className="border">
                                                            <Checkbox onClick={() => changeOne(row, i)} checked={row.checkbox} value={row.checkbox} />
                                                        </TableCell>
                                                        <TableCell className="border">{row.id}</TableCell>

                                                        <TableCell className="border">
                                                            <div className="w-full border-none">
                                                                <SearchableDropdown
                                                                    options={process}
                                                                    selectedVal={row.process}
                                                                    handleChange={(val) => {
                                                                        setRows((prev) => {
                                                                            let updatedData = []

                                                                            prev.map((item, i) => {
                                                                                if (item.id == row.id) {
                                                                                    prev[i]['process'] = val
                                                                                }
                                                                                updatedData.push(item)
                                                                            })
                                                                            return updatedData
                                                                        })
                                                                    }}
                                                                    placeholder="Description"
                                                                    label="description"
                                                                    className="border-none"
                                                                />
                                                            </div>
                                                        </TableCell>

                                                        <TableCell className="border">
                                                            <div className="flex items-center space-x-2 justify-center">
                                                                <Input
                                                                    placeholder="Hours"
                                                                    onChange={(e) => {
                                                                        setRows((prev) => {
                                                                            let updatedData = []

                                                                            prev.map((item, i) => {
                                                                                if (item.id == row.id) {
                                                                                    prev[i]['workItem'] = e.target.value
                                                                                }
                                                                                updatedData.push(item)
                                                                            })
                                                                            return updatedData
                                                                        })
                                                                    }}
                                                                    className="border-none shadow-none"
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                placeholder="Rate"
                                                                onChange={(e) => {
                                                                    setRows((prev) => {
                                                                        let updatedData = []

                                                                        prev.map((item, i) => {
                                                                            if (item.id == row.id) {
                                                                                prev[i]['rate'] = e.target.value
                                                                            }
                                                                            updatedData.push(item)
                                                                        })
                                                                        return updatedData
                                                                    })
                                                                    calculateAmount(row)
                                                                }}
                                                                className="border-none shadow-none"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                placeholder="Amount"
                                                                onChange={(e) => {
                                                                    setRows((prev) => {
                                                                        let updatedData = []

                                                                        prev.map((item, i) => {
                                                                            if (item.id == row.id) {
                                                                                prev[i]['amount'] = e.target.value
                                                                            }
                                                                            updatedData.push(item)
                                                                        })
                                                                        return updatedData
                                                                    })
                                                                }}
                                                                className="border-none shadow-none"
                                                                value={row.amount}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
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
                                    {/* </Card> */}
                                </div>

                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                    <FormField
                                        control={form.control}
                                        name="note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Note</FormLabel>
                                                <SearchableDropdown
                                                    options={projects}
                                                    selectedVal={noneValidatedValue.project}
                                                    handleChange={(val) => {
                                                        getProject(val)
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                project: val,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="Note"
                                                    label="billing_to"
                                                    className="mb-5"
                                                />
                                                <FormControl>
                                                    <Textarea placeholder="You can write your note here" className="resize-none" row="1" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="headcount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Amount</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Total Amount" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        className="w-full"
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <div className="w-full">
                                                    <Select name="status" defaultValue={'Pending'} className=" w-full">
                                                        <FormControl>
                                                            <SelectTrigger className="shadow-none  w-full">
                                                                <SelectValue placeholder="Select Status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Pending">Pending</SelectItem>
                                                            <SelectItem value="Paid">Paid</SelectItem>

                                                            <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="headcount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount Paid</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Amount Paid" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Invoicef
