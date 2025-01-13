import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { CalendarIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import SearchableDropdown from '../../Components/Common/SearchableDropdown'
import { Link, useNavigate } from 'react-router-dom'
import ProjectService from '@/Service/ProjectService'
import { useAuth } from '@/Context/AuthContext'
import DailyWorkLogService from '@/Service/DailyWorkLogService'
import Constent from '@/utils/constent'
import { Checkbox } from '@/Components/ui/checkbox'
import assets from '@/assets/assets'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import DummyTable from '@/Components/Common/DummyTable'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'

const CreateDailyWorkLog = () => {
    const navigate = useNavigate()
    const form = useForm()
    // const [date, setDate] = React.useState<Date>()
    const { userInfo } = useAuth()
    const formRef = useRef(null)
    const [date, setDate] = useState(format(new Date(), Constent.DATE_FORMAT))
    const [product, setProduct] = useState(null)
    const [projects, setProjects] = useState([])
    const [customFields, setCustomFields] = useState([])
    const [extraFieldRecord, setExtraFieldRecord] = useState([])
    const [noneValidatedValue, setNoneValidatedValue] = useState({
        employeeEmail: '',
        employeeName: '',
        date: date,
        projectId: '',
        workItem: '',
        workedHours: '',
        customFields: {},
    })

    useEffect(() => {
        if (userInfo) {
            setNoneValidatedValue((prev) => {
                return {
                    ...prev,
                    employeeEmail: userInfo?.email,
                    employeeName: userInfo?.full_name,
                }
            })
        }
    }, [userInfo])

    const addRow = () => {
        setExtraFieldRecord((prev) => {
            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1
            let newFields = {}
            customFields.map((val) => {
                newFields = {
                    id: newId,
                    checkbox: false,
                    label: val.label,
                    dataType: val.dataType,
                    fieldName: val.fieldName,
                    value: '',
                }
            })
            return [...prev, newFields]
        })
    }

    const getProjects = async () => {
        try {
            const resp = await ProjectService.getProjects({})
            if (resp.data.success) {
                setProjects(resp.data.data)
            }
        } catch (err) {}
    }

    const getProject = async (projectId) => {
        try {
            const resp = await ProjectService.getProject(projectId)
            if (resp.data.success) {
                setProduct(resp.data.data)

                setCustomFields(resp.data.data.customFields)
            }
        } catch (err) {}
    }

    useEffect(() => {
        getProjects()
    }, [])

    async function onSubmit(data) {
        try {
            let custmField = noneValidatedValue.customFields
            const filteredObj = Object.fromEntries(Object.entries(noneValidatedValue).filter(([key, value]) => value == ''))
            let key = Object.keys(filteredObj)[0]
            if (key == 'projectId') {
                toast.error('Please select ProjectId')
                return
            }
            if (key == 'workItem') {
                toast.error('Please enter work item')
                return
            }
            if (key == 'workedHours') {
                toast.error('Please enter worked hours')
                return
            }
            let customFieldKeys = Object.keys(custmField)
            let customFieldWithData = []
            for (let i = 0; i < customFieldKeys.length; i++) {
                customFieldWithData.push({
                    projectExtraFiledId: customFieldKeys[i],
                    value: custmField[customFieldKeys[i]]['value'],
                })
            }

            let postData = JSON.parse(JSON.stringify(noneValidatedValue))
            postData['customFields'] = customFieldWithData
            postData['date'] = String(postData['date'])
            const resp = await DailyWorkLogService.createDailyWorkLog(postData)
            if (resp.data.success) {
                navigate('/daily-work-log')
            }
        } catch (err) {
            toast.error(err)
        }
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
                            <Link className="button" to="/daily-work-log">
                                <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                            </Link>
                            <Button className="" onClick={handleSaveClick}>
                                Save
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="p-3" style={{height : "calc(100vh - 125px)"}}>
                <Card className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                    <CardContent className="m-0 p-2 max-h-full">
                        <Form {...form}>
                            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="p-4 lg:ps-5">
                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                    <FormField
                                        control={form.control}
                                        name="employeeEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employee Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Employee Email" value={noneValidatedValue.employeeEmail} disabled={true} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="employeeName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employee Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="employeeName" value={noneValidatedValue.employeeName} disabled={true} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="projectId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project Id</FormLabel>
                                                <div className="w-full">
                                                    <SearchableDropdown
                                                        options={projects}
                                                        selectedVal={noneValidatedValue.projectId}
                                                        handleChange={(val) => {
                                                            getProject(val)
                                                            setNoneValidatedValue((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    projectId: val,
                                                                }
                                                            })
                                                        }}
                                                        placeholder="Project Id"
                                                        label="id"
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
                                                            <Button variant={'outline'} disabled={true} className="w-full pl-3 text-left font-normal">
                                                                {noneValidatedValue.date
                                                                    ? format(noneValidatedValue.date, Constent.DATE_FORMAT)
                                                                    : date}
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
                                                                        date: format(e, Constent.DATE_FORMAT),
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
                                        name="client"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="client" value={product?.client ?? ''} disabled={true} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="workItem"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Work Items</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        onChange={(e) =>
                                                            setNoneValidatedValue((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    workItem: e.target.value,
                                                                }
                                                            })
                                                        }
                                                        type="number"
                                                        min="0"
                                                        placeholder="Work Items"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="process"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Process</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="process" value={product?.process ?? ''} disabled={true} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="workedHours"
                                        onOpenAutoFocus={(e) => e.preventDefault()}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Worked Hours</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        onChange={(e) =>
                                                            setNoneValidatedValue((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    workedHours: e.target.value,
                                                                }
                                                            })
                                                        }
                                                        type="text"
                                                        placeholder="Worked Hours"
                                                    />
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
                                                <FormControl>
                                                    <Input {...field} placeholder="Billing Type" value={product?.billingType ?? ''} disabled={true} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {customFields.length > 0 && (
                                    <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem] border rounded-md pb-2">
                                        <div style={{ width: 'calc(100vw - 370px)', maxHeight: '400px', overflow: 'auto', marginBottom:"2px" }}>
                                            <div className="relative w-full rounded-lg">
                                                <div>
                                                    <div className="flex min-w-max bg-gray-100 border-b" style={{ position: 'sticky', top: '0px' }}>
                                                        <div className="p-1 py-2 w-20 font-medium text-gray-700 border-r last:border-r-0">
                                                            <Checkbox className="mx-3 my-1" />
                                                        </div>
                                                        <div className="p-1 w-20 py-2 font-medium text-gray-700 text-center border-r last:border-r-0">Sr.No</div>
                                                        {customFields.map((row, i) => (
                                                            <div key={i} className="p-1 py-2 w-48 font-medium text-center text-gray-700 border-r last:border-r-0">
                                                                {row.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className={`min-w-max ${extraFieldRecord.length === 0 ? 'flex justify-center' : ''}`}>
                                                        {extraFieldRecord.length === 0 ? (
                                                            <tr>
                                                                <td colSpan={customFields.length + 2}>
                                                                    <div className="text-center py-4">No Data</div>
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            extraFieldRecord.map((row, i) => (
                                                                <div key={i} className="flex border-b last:border-b-0 hover:bg-gray-50">
                                                                    <div className="p-1 w-20 border-r">
                                                                        <Checkbox className="mx-3 my-1" onClick={() => console.log('ds')} />
                                                                    </div>
                                                                    <div className="p-1 w-20 border-r flex justify-start items-center">
                                                                        <span className="py-1 px-3">{row.id}</span>
                                                                    </div>
                                                                    {customFields.map((field) => (
                                                                        <div className="p-1 w-48 border-r">
                                                                            <div className="w-full">
                                                                                {field.dataType == 'date' ? (
                                                                                    <Popover>
                                                                                        <PopoverTrigger asChild>
                                                                                            <Button
                                                                                                variant={'outline'}
                                                                                                className={cn(
                                                                                                    'w-full border-0 shadow-none justify-start text-left font-normal bg-transparent',
                                                                                                    !date && 'text-muted-foreground'
                                                                                                )}
                                                                                            >
                                                                                                {date ? (
                                                                                                    format(date, Constent.DATE_FORMAT)
                                                                                                ) : (
                                                                                                    <span>Pick a date</span>
                                                                                                )}
                                                                                            </Button>
                                                                                        </PopoverTrigger>
                                                                                        <PopoverContent className="w-auto p-0" align="start">
                                                                                            <Calendar
                                                                                                mode="single"
                                                                                                selected={date}
                                                                                                onSelect={setDate}
                                                                                                initialFocus
                                                                                            />
                                                                                        </PopoverContent>
                                                                                    </Popover>
                                                                                ) : (
                                                                                    <Input
                                                                                        placeholder={field.label}
                                                                                        type={field.dataType}
                                                                                        onChange={(e) => {
                                                                                            setExtraFieldRecord((prev) => {
                                                                                                const updatedData = prev.map((item) => {
                                                                                                    if (item.id === row.id) {
                                                                                                        return { ...item, label: e.target.value }
                                                                                                    }
                                                                                                    return item
                                                                                                })
                                                                                                return updatedData
                                                                                            })
                                                                                        }}
                                                                                        className="border-none shadow-none focus-visible:ring-0 w-full"
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            className="mx-2"
                                            onClick={addRow}
                                            style={{
                                                padding: '0px 10px',
                                                height: '28px',
                                                backgroundColor: '#808080d6',
                                            }}
                                        >
                                            Add Row
                                        </Button>
                                        {false &&
                                        rows.filter((row) => {
                                            return row.checkbox
                                        }).length > 0 ? (
                                            <Button
                                                type="button"
                                                className="bg-primary-red ml-1"
                                                // onClick={() => deleteone()}
                                                style={{ padding: '0px 10px', height: '28px' }}
                                            >
                                                Delete
                                            </Button>
                                        ) : (
                                            ''
                                        )}

                                        {false && rows.length > 0 && (
                                            <Button
                                                type="button"
                                                className="bg-primary-red ml-1"
                                                // onClick={deleteAll}
                                                style={{ padding: '0px 10px', height: '28px' }}
                                            >
                                                Delete All
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default CreateDailyWorkLog
