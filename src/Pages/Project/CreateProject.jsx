import { React, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { ArrowLeft, CalendarIcon, CloudCog } from 'lucide-react'
import { format } from 'date-fns'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import SearchableDropdown from '@/Components/Common/SearchableDropdown'
import DepartmentService from '@/Service/DepartmentService'
import BillingTypeService from '@/Service/BillingTypeService'
import { Link, useNavigate } from 'react-router-dom'
import ClientService from '@/Service/ClientService'
import ProcessService from '@/Service/ProcessService'
import assets from '@/assets/assets'
import LofBusinessService from '@/Service/LofBusinessService'
import ProjectService from '@/Service/ProjectService'
import { lowerFirstChar } from '@/utils/helper'
import Constent from '@/utils/constent'
import NoteService from '@/Service/NoteService'
import ClientAddressService from '@/Service/ClientAddressService'
import BillingEntityService from '@/Service/BillingEntityService'

const CreateProject = ({ type }) => {
    const navigate = useNavigate()
    const [checkAll, setcheckAll] = useState(false)
    const [checkhisotryAll, setchechistorykAll] = useState(false)
    const [checkdescAll, setcheckdescAll] = useState(false)
    const [rows, setRows] = useState([])
    const [historyrows, setHistoryrows] = useState([])
    const formRef = useRef(null)
    const today = format(new Date(), Constent.DATE_FORMAT)
    const [departments, setDepartment] = useState([])
    const [clients, setClient] = useState([])
    const [lofBusiness, setLofBusiness] = useState([])
    const [projectleads, setProjectLead] = useState([{ id: 11, name: 'sandeep' }])
    const [process, setProcess] = useState([])
    const [notes, setNotes] = useState([])
    const [billingTo, setBillingTo] = useState([])
    const [billingFrom, setbillingFrom] = useState([])
    const [billing_type, setBillingType] = useState([])
    const [desc, setDesc] = useState([])
    const form = useForm()

    const getLofBusiness = async () => {
        try {
            const resp = await LofBusinessService.getLofBusiness()
            if (resp.data.success) {
                setLofBusiness(resp.data.data)
            }
        } catch (err) {}
    }
    const getBillingEntity = async () => {
        try {
            const resp = await BillingEntityService.getBillingEntities()
            if (resp.data.success) {
                setbillingFrom(resp.data.data)
            }
        } catch (err) {}
    }

    const getDepartment = async () => {
        try {
            const resp = await DepartmentService.getDepartment()
            if (resp.data.success) {
                setDepartment(resp.data.data)
            }
        } catch (err) {}
    }
    const getBillingTypes = async () => {
        try {
            const resp = await BillingTypeService.getBillingType()
            if (resp.data.success) {
                setBillingType(resp.data.data)
            }
        } catch (err) {}
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

    const getClientAddress = async (data) => {
        try {
            const resp = await ClientAddressService.getClientAddresses(data)
            if (resp.data.success) {
                //console.log(resp.data.success)
                setBillingTo(resp.data.data)
            }
        } catch (err) {}
    }

    const getNotes = async () => {
        try {
            const resp = await NoteService.getNotes()
            if (resp.data.success) {
                setNotes(resp.data.data)
            }
        } catch (err) {}
    }

    useEffect(() => {
        getLofBusiness()
        getDepartment()
        getClient()
        getBillingTypes()
        getProcess()
        getNotes()
        getBillingEntity()
    }, [])

    const [projectFields, setProjectFields] = useState({
        client: '',
        lofBusiness: '',
        process: '',
        department: '',
        billingType: '',
        projectLead: '',
        rate: '',
        timePerWorkItem: '',
        comments: '',
        note: '',
        noteDescription: '',
        date: today,
        status: 'Active',
        billingTo: '',
        billingToDescription: '',
        billingFrom: '',
        billingFromDescription: '',
    })

    async function onSubmit(data) {
        try {
            const filteredObj = Object.fromEntries(Object.entries(projectFields).filter(([key, value]) => key !== 'comments' && value == ''))
            let key = Object.keys(filteredObj)[0]

            if (key == 'lofBusiness') {
                toast.error('Please select line of business')
                return
            }
            if (key == 'client') {
                toast.error('Please select client')
                return
            }
            if (key == 'process') {
                toast.error('Please select process')
                return
            }
            if (key == 'department') {
                toast.error('Please select department')
                return
            }
            if (key == 'billingType') {
                toast.error('Please select billing type')
            }
            if (key == 'productLead') {
                toast.error('Please select Project lead')
                return
            }
            if (key == 'rate') {
                toast.error('Please enter rate')
                return
            }
            if (data.billingType == 'Per WorkItem Transactional') {
                if (key == 'timePerWorkItem') {
                    toast.error('Please enter time in minute')
                    return
                }
            }

            for (let i = 0; i < rows.length; i++) {
                if (rows[i].label === '') {
                    toast.error('Please enter label')
                    return
                } else if (rows[i].dataType == '') {
                    toast.error('Please select data type')
                    return
                }
            }
            projectFields['customFields'] = rows;
            projectFields['descriptions'] = desc;
            console.log("projectfields",projectFields)

            const resp = await ProjectService.createProject(projectFields)
            if (resp.data.success) {
                navigate('/projects')
            }
        } catch (err) {
            console.log('err : ', err)
            toast.error(err)
        }
    }

    const addHistoryrow = () => {
        setHistoryrows((prev) => {
            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1
            return [
                ...prev,
                {
                    id: newId,
                    checkbox: false,
                    hstatus: '',
                    startdate: '',
                    enddate: '',
                    comments: '',
                },
            ]
        })
    }

    const adddescRow = () => {
        setDesc((prev) => {
            const newId = prev.length > 0 ? parseInt(prev[prev.length - 1].id) + 1 : 1

            return [
                ...prev,
                {
                    id: newId,
                    description: '',
                },
            ]
        })
    }
    const deletedescone = (id) => {
        const updatedrows = desc.filter((row) => !row.checkbox)
        let newdata = updatedrows.length > 0 ? updatedrows : []
        setDesc(() => newdata)
    }
    const deletedescAll = () => {
        setDesc([])
    }

    const addRow = () => {
        setRows((prev) => {
            const newId = prev.length > 0 ? parseInt(prev[prev.length - 1].id) + 1 : 1

            return [
                ...prev,
                {
                    id: newId,
                    checkbox: false,
                    deleteForProject: false,
                    label: '',
                    dataType: '',
                    fieldName: '',
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
    const delete_history_one = () => {
        const updatedrows = historyrows.filter((row) => !row.checkbox)
        let newdata = updatedrows.length > 0 ? updatedrows : []

        setHistoryrows(() => newdata)
    }
    const delete_history_All = () => {
        setHistoryrows([])
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

    const changedescOne = (row) => {
        setDesc((prev) => {
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

    const changedescAll = () => {
        let isChecked = !checkdescAll
        setcheckdescAll((prev) => isChecked)

        setDesc((prev) => {
            let updatedData = []

            prev.map((item, i) => {
                prev[i]['checkbox'] = isChecked
                updatedData.push(item)
            })

            return updatedData
        })
    }

    const change_history_One = (row) => {
        setHistoryrows((prev) => {
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
    const change_history_All = () => {
        let isChecked = !checkhisotryAll
        setchechistorykAll((prev) => isChecked)

        setHistoryrows((prev) => {
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

    const handle_label_Change = (e, rowid) => {
        const value = e.target.value
        let isAlphabetic = /^[A-Za-z_ ]+$/.test(value)
        let fieldName = value.replaceAll(' ', '')
        if (value > 15) {
            toast.error('label should contain atmost 15 characters')
        } else if (!isAlphabetic && value !== '') {
            toast.error('label should contain only alphabets')
        } else {
            setRows((prev) => {
                let updatedData = []
                prev.map((item, i) => {
                    if (item.id == rowid) {
                        prev[i]['fieldName'] = lowerFirstChar(fieldName)
                    }

                    updatedData.push(item)
                })

                return updatedData
            })
        }
    }

    return (
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-between items-center p-3">
                    <div className="flex">
                        
                        <Link className="button bg-primary-back hover:bg-primary-purpal text-white rounded-[5px] p-[5px]" to="/projects">
                           <ArrowLeft />
                        </Link>
                    </div>
                    <div className="flex justify-end items-center">
                        <div className="flex items-center justify-end gap-2">
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
                        <Form {...form}>
                            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="p-4 lg:ps-5">
                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                    <FormField
                                        control={form.control}
                                        name="client"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client</FormLabel>
                                                <div className="w-full">
                                                    <SearchableDropdown
                                                        options={clients}
                                                        selectedVal={projectFields.client}
                                                        handleChange={(val) => {
                                                            getClientAddress({
                                                                search: {
                                                                    client: val,
                                                                },
                                                            })
                                                            setProjectFields((prev) => {
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
                                        className="w-full"
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <div className="w-full">
                                                    <Select
                                                        value={projectFields.status}
                                                        onValueChange={(val) => {
                                                            setProjectFields((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    status: val,
                                                                }
                                                            })
                                                        }}
                                                        defaultValue={projectFields.status}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {assets.ProjectStatusData.map((status) => (
                                                                <SelectItem key={status.key} value={status.key}>
                                                                    {status.value}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
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
                                                    <SearchableDropdown
                                                        options={lofBusiness}
                                                        selectedVal={projectFields.lofBusiness}
                                                        handleChange={(val) => {
                                                            setProjectFields((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    lofBusiness: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="LOB Process"
                                                        label="lofBusiness"
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                {projectFields.date ? format(projectFields.date, Constent.DATE_FORMAT) : today}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={projectFields.date}
                                                            onSelect={(e) => {
                                                                ;(prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        date: e,
                                                                    }
                                                                }
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
                                                        selectedVal={projectFields.process}
                                                        handleChange={(val) => {
                                                            setProjectFields((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    process: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="Process"
                                                        label="process"
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="department"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Department</FormLabel>
                                                <div className="full">
                                                    <SearchableDropdown
                                                        options={departments}
                                                        selectedVal={projectFields.department}
                                                        handleChange={(val) => {
                                                            setProjectFields((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    department: val,
                                                                }
                                                            })
                                                        }}
                                                        label="department"
                                                        placeholder="Department"
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
                                                <SearchableDropdown
                                                    options={billingTo}
                                                    selectedVal={projectFields.billingTo}
                                                    handleChange={(val) => {
                                                        //  console.log("billingtotttt",val)
                                                        let billingTodetails=`${val.address}\n${val.city},${val.state},${val.country}`;
                                                        setProjectFields((prev) => {
                                                            return {
                                                                ...prev,
                                                                billingTo: val.contactPerson,
                                                                billingToDescription:billingTodetails,
                                                            }
                                                        })
                                                    }}
                                                    label="contactPerson"
                                                    type="CREATE_PROJECT_BILLINGTO"
                                                    placeholder="Billing To"
                                                    className="mb-5"
                                                />
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Billing To"
                                                        className="resize-none"
                                                        row="1"
                                                        value={projectFields.billingToDescription}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="billingFrom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Billing From</FormLabel>
                                                {console.log(billingFrom)}
                                                <SearchableDropdown
                                                    options={billingFrom}
                                                    selectedVal={projectFields.billingFrom}
                                                    handleChange={(val) => {
                                                        let billingFromdetails=`${val.address}\n${val.city},${val.state},${val.country}`;
                                                        console.log(billingFromdetails);
                                                        setProjectFields((prev) => {
                                                            return {
                                                                ...prev,
                                                                billingFrom: val.contactPerson,
                                                                billingFromDescription: billingFromdetails,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="Billing From"
                                                    label="contactPerson"
                                                    type="CREATE_PROJECT_BILLINGFROM"
                                                    className="mb-5"
                                                />
                                                <FormControl>
                                                    <Textarea placeholder="Billing From" className="resize-none" row="1"  value={projectFields.billingFromDescription}/>
                                                </FormControl>
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
                                                    <SearchableDropdown
                                                        options={billing_type}
                                                        selectedVal={projectFields.billingType}
                                                        handleChange={(val) => {
                                                            setProjectFields((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    billingType: val,
                                                                }
                                                            })
                                                        }}
                                                        label="billingType"
                                                        placeholder="Billing Type"
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="projectLead"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project Lead</FormLabel>
                                                <div className="w-full">
                                                    <SearchableDropdown
                                                        options={projectleads}
                                                        selectedVal={projectFields.projectLead}
                                                        handleChange={(val) => {
                                                            setProjectFields((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    projectLead: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="Project Lead"
                                                        label="name"
                                                    />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="rate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {projectFields.billingType == 'Hourly transactional' ||
                                                        projectFields.billingType == 'Hourly Transactional'
                                                            ? 'Rate Per Chart'
                                                            : 'Rate Per Hour'}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="rate"
                                                            value={projectFields.rate}
                                                            onChange={(e) => {
                                                                setProjectFields((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        rate: e.target.value,
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        {projectFields.billingType == 'Hourly transactional' ||
                                            (projectFields.billingType == 'Hourly Transactional' && (
                                                <FormField
                                                    control={form.control}
                                                    name="timePerWorkItem"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Time taken per Chart (in minutes)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="minutes"
                                                                    value={projectFields.timePerWorkItem}
                                                                    onChange={(e) => {
                                                                        setProjectFields((prev) => {
                                                                            return {
                                                                                ...prev,
                                                                                timePerWorkItem: e.target.value,
                                                                            }
                                                                        })
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Note</FormLabel>
                                                <SearchableDropdown
                                                    options={notes}
                                                    selectedVal={projectFields.note}
                                                    handleChange={(val) => {
                                                        // console.log("notes",val)
                                                        setProjectFields((prev) => {
                                                            return {
                                                                ...prev,
                                                                note: val.title,
                                                                noteDescription: val.description,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="Note"
                                                    label="title"
                                                    className="mb-5"
                                                    type="CREATE_PROJECT_NOTE"
                                                />
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Note Description"
                                                        value={projectFields.noteDescription}
                                                        className="resize-none"
                                                        row="1"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem] ">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border">
                                                <TableHead className="w-[35px] border">
                                                    <Checkbox onClick={changeAll} value={checkAll} checked={checkAll} />
                                                </TableHead>
                                                <TableHead className="w-[50px] border">Sr.No</TableHead>

                                                <TableHead className="w-[300px] border">Field Label</TableHead>

                                                <TableHead className="w-[200px] border">Data Type</TableHead>
                                                <TableHead className="w-[200px] border">Field Name</TableHead>
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
                                                    <TableRow key={row.id} name="customfields" className="border">
                                                        <TableCell className="border">
                                                            <Checkbox onClick={() => changeOne(row, i)} checked={row.checkbox} value={row.checkbox} />
                                                        </TableCell>
                                                        <TableCell className="border">{row.id}</TableCell>

                                                        <TableCell className="border">
                                                            <div className="w-full">
                                                                <Input
                                                                    placeholder="label"
                                                                    onChange={(e) => {
                                                                        setRows((prev) => {
                                                                            let updatedData = []

                                                                            prev.map((item, i) => {
                                                                                if (item.id == row.id) {
                                                                                    prev[i]['label'] = e.target.value
                                                                                }
                                                                                updatedData.push(item)
                                                                            })
                                                                            return updatedData
                                                                        })
                                                                    }}
                                                                    onBlur={(e) => handle_label_Change(e, row.id)}
                                                                    className="border-none shadow-none"
                                                                />
                                                            </div>
                                                        </TableCell>

                                                        <TableCell className="border">
                                                            <div className="flex items-center space-x-2 justify-center">
                                                                <Select
                                                                    onValueChange={(value) =>
                                                                        setRows((prev) => {
                                                                            let updatedData = []

                                                                            prev.map((item, i) => {
                                                                                if (item.id == row.id) {
                                                                                    prev[i]['dataType'] = value
                                                                                }
                                                                                updatedData.push(item)
                                                                            })
                                                                            return updatedData
                                                                        })
                                                                    }
                                                                    defaultValue={rows.dataType}
                                                                    className="border-none w-full"
                                                                >
                                                                    <SelectTrigger className="border-none">
                                                                        <SelectValue placeholder="Data Type" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {assets.DataTypes.map((value) => (
                                                                            <SelectItem key={value.key} value={value.key}>
                                                                                {value.value}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border">
                                                            <Input
                                                                placeholder="Field Name"
                                                                name="fieldName"
                                                                value={row.fieldName}
                                                                className="border-none shadow-none"
                                                                disabled={true}
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
                                </div>

                                <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem] ">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border">
                                                <TableHead className="w-[35px] border">
                                                    <Checkbox onClick={changedescAll} value={checkdescAll} checked={checkdescAll} />
                                                </TableHead>
                                                <TableHead className="w-[50px] border">Sr.No</TableHead>

                                                <TableHead className="w-[300px] border">Description</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {desc.length == 0 ? (
                                                <tr>
                                                    <td colSpan="6">
                                                        <h6 className="text-center" style={{ margin: 0 }}>
                                                            No Data
                                                        </h6>
                                                    </td>
                                                </tr>
                                            ) : (
                                                desc.map((row, i) => (
                                                    <TableRow key={row.id} name="descriptions" className="border">
                                                        <TableCell className="border">
                                                            <Checkbox
                                                                onClick={() => changedescOne(row, i)}
                                                                checked={row.checkbox}
                                                                value={row.checkbox}
                                                            />
                                                        </TableCell>
                                                        <TableCell className="border">{row.id}</TableCell>

                                                        <TableCell className="border">
                                                            <Input
                                                                placeholder="Description"
                                                               
                                                                defaultValue={row.description}
                                                                onChange={(event) =>
                                                                {console.log(event.target.value);
                                                                    setDesc((prev) => {
                                                                        let updatedData = []
                                                                        prev.map((item, i) => {
                                                                            if (item.id == row.id) {
                                                                                prev[i]['description'] = event.target.value
                                                                            }
                                                                            updatedData.push(item)
                                                                        })
                                                                        return updatedData
                                                                    })}
                                                                }
                                                                className="border-none shadow-none"
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
                                        onClick={adddescRow}
                                        style={{
                                            padding: '0px 10px',
                                            height: '28px',
                                            backgroundColor: '#808080d6',
                                        }}
                                    >
                                        Add Row
                                    </Button>

                                    {!checkdescAll &&
                                    desc.filter((row) => {
                                        return row.checkbox
                                    }).length > 0 ? (
                                        <Button
                                            type="button"
                                            className="bg-primary-red ml-1"
                                            onClick={() => deletedescone()}
                                            style={{ padding: '0px 10px', height: '28px' }}
                                        >
                                            Delete
                                        </Button>
                                    ) : (
                                        ''
                                    )}

                                    {checkdescAll && desc.length > 0 && (
                                        <Button
                                            type="button"
                                            className="bg-primary-red ml-1"
                                            onClick={deletedescAll}
                                            style={{ padding: '0px 10px', height: '28px' }}
                                        >
                                            Delete All
                                        </Button>
                                    )}
                                </div>
                                <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem] ">
                                    <h3 className="font-medium mb-6">History</h3>
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border">
                                                <TableHead className="w-[35px] border">
                                                    <Checkbox onClick={change_history_All} value={checkhisotryAll} checked={checkhisotryAll} />
                                                </TableHead>
                                                <TableHead className="w-[50px] border">Sr.No</TableHead>

                                                <TableHead className=" border">Status</TableHead>
                                                <TableHead className="w-[200px] border">Start Date</TableHead>
                                                <TableHead className="w-[200px] border">End Date</TableHead>
                                                <TableHead className=" border">Comments</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {historyrows.length == 0 ? (
                                                <tr>
                                                    <td colSpan="6">
                                                        <h6 className="text-center" style={{ margin: 0 }}>
                                                            No Data
                                                        </h6>
                                                    </td>
                                                </tr>
                                            ) : (
                                                historyrows.map((historyrow, i) => (
                                                    <TableRow key={historyrows.id} name="history" className="border">
                                                        <TableCell className="border">
                                                            <Checkbox
                                                                onClick={() => change_history_One(historyrow, i)}
                                                                checked={historyrow.checkbox}
                                                                value={historyrow.checkbox}
                                                            />
                                                        </TableCell>
                                                        <TableCell className="border">{historyrow.id}</TableCell>
                                                        <TableCell className="border">
                                                            <Select
                                                                name="hstatus"
                                                                onValueChange={(value) =>
                                                                    setHistoryrows((prev) => {
                                                                        let updatedData = []

                                                                        prev.map((item, i) => {
                                                                            if (item.id == historyrow.id) {
                                                                                prev[i]['label'] = value
                                                                            }
                                                                            updatedData.push(item)
                                                                        })
                                                                        return updatedData
                                                                    })
                                                                }
                                                                defaultValue={historyrows.label}
                                                                className="border-none w-full"
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className="border-none shadow-none  w-full">
                                                                        <SelectValue placeholder="Select Status" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="Active">Active</SelectItem>
                                                                    <SelectItem value="Inactive">Inactive</SelectItem>

                                                                    <SelectItem value="On Hold">On Hold</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </TableCell>

                                                        <TableCell className="border">
                                                            <div className="w-full">
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <Button
                                                                            variant={'outline'}
                                                                            className="w-full justify-start text-left font-normal border-none"
                                                                        >
                                                                            {historyrow.startdate
                                                                                ? format(historyrow.startdate, Constent.DATE_FORMAT)
                                                                                : ''}
                                                                        </Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0 " align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            key={historyrow.startdate}
                                                                            selected={historyrow.startdate}
                                                                            onSelect={(e) => {
                                                                                setHistoryrows((prev) => {
                                                                                    let updatedData = []

                                                                                    prev.map((item, i) => {
                                                                                        if (item.id == historyrow.id) {
                                                                                            prev[i]['startdate'] = e
                                                                                        }
                                                                                        updatedData.push(item)
                                                                                    })
                                                                                    return updatedData
                                                                                })
                                                                            }}
                                                                            initialFocus
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell className="border">
                                                            <div className="flex items-center space-x-2 justify-center">
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <Button
                                                                            variant={'outline'}
                                                                            className="w-full justify-start text-left font-normal border-none"
                                                                        >
                                                                            {historyrow.enddate
                                                                                ? format(historyrow.enddate, Constent.DATE_FORMAT)
                                                                                : ''}
                                                                        </Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0" align="start">
                                                                        <Calendar
                                                                            key={historyrow.enddate}
                                                                            mode="single"
                                                                            selected={historyrow.enddate}
                                                                            onSelect={(e) => {
                                                                                setHistoryrows((prev) => {
                                                                                    let updatedData = []

                                                                                    prev.map((item, i) => {
                                                                                        if (item.id == historyrow.id) {
                                                                                            prev[i]['enddate'] = e
                                                                                        }
                                                                                        updatedData.push(item)
                                                                                    })
                                                                                    return updatedData
                                                                                })
                                                                            }}
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                placeholder=" Comments"
                                                                onChange={(e) => {
                                                                    setHistoryrows((prev) => {
                                                                        let updatedData = []

                                                                        prev.map((item, i) => {
                                                                            if (item.id == historyrow.id) {
                                                                                prev[i]['hours'] = e.target.value
                                                                            }
                                                                            updatedData.push(item)
                                                                        })
                                                                        return updatedData
                                                                    })
                                                                }}
                                                                className="border-none shadow-none"
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
                                        onClick={addHistoryrow}
                                        style={{
                                            padding: '0px 10px',
                                            height: '28px',
                                            backgroundColor: '#808080d6',
                                        }}
                                    >
                                        Add Row
                                    </Button>

                                    {!checkhisotryAll &&
                                    historyrows.filter((historyrow) => {
                                        return historyrow.checkbox
                                    }).length > 0 ? (
                                        <Button
                                            type="button"
                                            className="bg-primary-red ml-1"
                                            onClick={() => delete_history_one()}
                                            style={{ padding: '0px 10px', height: '28px' }}
                                        >
                                            Delete
                                        </Button>
                                    ) : (
                                        ''
                                    )}

                                    {checkhisotryAll && historyrows.length > 0 && (
                                        <Button
                                            type="button"
                                            className="bg-primary-red ml-1"
                                            onClick={delete_history_All}
                                            style={{ padding: '0px 10px', height: '28px' }}
                                        >
                                            Delete All
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default CreateProject
