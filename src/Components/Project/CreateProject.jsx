import { React, useEffect, useRef, useState } from 'react'
import { get, useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import BillingData from '@/assets/data/BillingData'
import { Textarea } from '@/components/ui/textarea'
import SearchableDropdown from '../Common/SearchableDropdown'
import DepartmentService from '@/Service/DepartmentService'
import BillingTypeService from '@/Service/BillingTypeService'
import { Link } from 'react-router-dom'
import ClientService from '@/Service/ClientService'
import ProcessService from '@/Service/ProcessService'
import LofBuisnessService from '@/Service/LofBuisnessService'

const CreateProject = ({ type }) => {
    const [checkAll, setcheckAll] = useState(false)
    const [checkhisotryAll, setchechistorykAll] = useState(false)
    const [rows, setRows] = useState([])
    const [historyrows, setHistoryrows] = useState([])
    const [isbilling, setIsbilling] = useState(false)
    const formRef = useRef(null)
    const today = format(new Date(), 'MM-dd-yyyy')
    const [departments, setDepartment] = useState([])
    const [clients, setClient] = useState([])
    const [lob_processes, setLOBprocess] = useState([])
    const [projectleads, setProjectLead] = useState([])
    const [process, setProcess] = useState([])
    const [billing_type, setBillingType] = useState([])

    const getLofBuisness = async () => {
        try {
            const resp = await LofBuisnessService.getLofBuisness()
            console.log('resp', resp)
            if (resp.data.success) {
                setLOBprocess(resp.data.data)
            }
            console.log(lob_processes)
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
        console.log('in billing')
        try {
            const resp = await BillingTypeService.getBillingType()
            console.log('response', resp.data.data)
            console.log('response', resp.data.success)
            if (resp.data.success) {
                setBillingType(resp.data.data)
            }
        } catch (err) {
            console.log('in billing', err)
        }
    }
    const getClient = async () => {
        try {
            const resp = await ClientService.getClient()
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

    useEffect(() => {
        getLofBuisness()
        getDepartment()
        getClient()
        getBillingTypes()
        getProcess()
    }, [])

    // const date=new Date();
    const [noneValidatedValue, setNoneValidatedValue] = useState({
        client: '',
        lob_process: '',
        process: '',
        department: '',
        billing_type: '',
        projectlead: '',
        rate: '',
        timeperworkitem: '',
        comments: '',
    })

    const form = useForm({
        defaultValues: {
            comments: '',
            date: today,
            client: '',
            lob_process: '',
            process: '',
            department: '',
            billing_type: '',
            projectlead: '',
            rate: '',
            timeperworkitem: '',
            status: 'Active',
        },
    })

    // const billing_type=[];

    // const [projectData]
    // const lob_processes = []
    // const projectleads = []
    // const clients = []

    // const process = []

    function onSubmit(data) {
        Object.assign(data, noneValidatedValue)

        const filteredObj = Object.fromEntries(Object.entries(data).filter(([key, value]) => key !== 'comments' && value == ''))

        let key = Object.keys(filteredObj)[0]

        if (key == 'lob_process') {
            toast('Please select line of buisness')
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
        if (key == 'billing_type') {
            toast.error('Please select billing type')
        }
        if (key == 'projectlead') {
            toast.error('Please select Project lead')
            return
        }
        if (key == 'rate') {
            toast.error('Please enter rate')
            return
        }
        if (data.billing_type == 'Per WorkItem Transactional') {
            if (key == 'timeperworkitem') {
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
        data['customfields'] = rows
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
    const addRow = () => {
        setRows((prev) => {
            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1

            return [
                ...prev,
                {
                    id: newId,
                    checkbox: false,
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
    const handlebillingChange = (e) => {
        if (e == 'Per WorkItem Transactional') {
            setIsbilling(true)
        } else {
            setIsbilling(false)
        }
    }
    const handle_label_Change = (e, rowid) => {
        const value = e.target.value
        let isAlphabetic = /^[A-Za-z_ ]+$/.test(value)
        let fieldName = value.split(' ').join('_')
        if (value > 15) {
            toast('label should contain atmost 15 characters')
        } else if (!isAlphabetic && value !== '') {
            toast('label should contain only alphabets')
        } else {
            setRows((prev) => {
                let updatedData = []

                prev.map((item, i) => {
                    if (item.id == rowid) {
                        prev[i]['fieldName'] = fieldName
                    }

                    updatedData.push(item)
                })

                return updatedData
            })
        }
    }

    return (
        <>
            <Card className="p-0 mb-[44px] mx-0 rounded-none sticky top-16 w-full z-10">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-end items-center">
                        <div className="flex items-center justify-end gap-2">
                            <Link className="button" to="/projects">
                                <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                            </Link>
                            <Button className="bg-primary-purpal hover:bg-primary-purpal" onClick={handleSaveClick}>
                                Save
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 ">
                <CardContent className="m-0 p-3">
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
                                    className="w-full"
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <div className="w-full">
                                                <Select
                                                    onValueChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                status: val,
                                                            }
                                                        })
                                                    }}
                                                    defaultValue={'Active'}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Active">Active</SelectItem>
                                                        <SelectItem value="Inactive">Inactive</SelectItem>

                                                        <SelectItem value="On Hold">On Hold</SelectItem>
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
                                            <FormLabel>LOF Buisness</FormLabel>
                                            <div className="w-full">
                                                <SearchableDropdown
                                                    options={lob_processes}
                                                    selectedVal={noneValidatedValue.lob_process}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                lob_process: val,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="LOB Process"
                                                    label="lofBuisness"
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
                                                            {noneValidatedValue.date ? format(noneValidatedValue.date, 'MM-dd-yyyy') : today}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={noneValidatedValue.date}
                                                        onSelect={(e) => {
                                                            setNoneValidatedValue((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    date: e,
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
                                    name="process"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Process</FormLabel>
                                            <div className="full">
                                                <SearchableDropdown
                                                    options={process}
                                                    selectedVal={noneValidatedValue.process}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
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
                                                    selectedVal={noneValidatedValue.department}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
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
                                    className="w-full"
                                    control={form.control}
                                    name="billing_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Billing Type</FormLabel>
                                            <div className="full">
                                                <SearchableDropdown
                                                    options={billing_type}
                                                    selectedVal={noneValidatedValue.billing_type}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                billing_type: val,
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
                                    name="projectlead"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Lead</FormLabel>
                                            <div className="w-full">
                                                <SearchableDropdown
                                                    options={projectleads}
                                                    selectedVal={noneValidatedValue.projectlead}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                projectlead: val,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="Project Lead"
                                                    label="project_lead"
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
                                                <FormLabel>Rate</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="rate"
                                                        onChange={(e) => {
                                                            setNoneValidatedValue((prev) => {
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
                                    {isbilling && (
                                        <FormField
                                            control={form.control}
                                            name="timeperworkitem"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Time per WorkItem</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="minutes"
                                                            onChange={(e) => {
                                                                setNoneValidatedValue((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        timeperworkitem: e.target.value,
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>

                                <FormField
                                    control={form.control}
                                    name="comments"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Comments</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="comments " className="resize-none" rows="4.5" />
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

                                            <TableHead className="w-[300px] border">Label</TableHead>

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
                                                                    <SelectItem value="data">Data</SelectItem>
                                                                    <SelectItem value="date">Date</SelectItem>
                                                                    <SelectItem value="smallText">Small Text</SelectItem>
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
                                                            disabled
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
                                                                        {historyrow.startdate ? format(historyrow.startdate, 'MM-dd-yyyy') : ''}
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
                                                                        {historyrow.enddate ? format(historyrow.enddate, 'MM-dd-yyyy') : ''}
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

                            <div className="grid  gap-x-[3rem] gap-y-[1.75rem]"></div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default CreateProject
