import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import SearchableDropdown from '../../Components/Common/SearchableDropdown'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProjectService from '@/Service/ProjectService'
import { useAuth } from '@/Context/AuthContext'
import DailyWorkLogService from '@/Service/DailyWorkLogService'
import Constent from '@/utils/constent'

const EditDailyWorkLog = () => {
    const navigate = useNavigate()
    const form = useForm()
    const { dailyWorkLogId } = useParams()
    const { userInfo } = useAuth()
    const formRef = useRef(null)
    const [date, setDate] = useState(format(new Date(), Constent.DATE_FORMAT))
    const [product, setProduct] = useState(null)
    const [projects, setProjects] = useState([])
    const [customFields, setCustomFields] = useState([])
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

    const getProjects = async () => {
        try {
            const resp = await ProjectService.getProjects({})
            if (resp.data.success) {
                setProjects(resp.data.data)
            }
        } catch (err) {}
    }

    const getDailyWorkLog = async () => {
        try {
            const resp = await DailyWorkLogService.getDailyWork(dailyWorkLogId)
            if (resp.data.success) {
                if (!resp.data.data) {
                    navigate('/daily-work-log')
                    return
                }
                setProduct(resp.data.data.project)
                setCustomFields([...resp.data.data.customFields])
                setNoneValidatedValue((prev) => {
                    let customFieldData = {}
                    resp.data.data.customFields.map((fields) => {
                        customFieldData[fields['projectExtraFiled']['_id']] = fields
                    })
                    return {
                        ...prev,
                        ...resp.data.data,
                        date : format(resp.data.data.date, Constent.DATE_FORMAT),
                        customFields: customFieldData,
                    }
                })
            }
        } catch (err) {}
    }

    const getProject = async (projectId) => {
        try {
            const resp = await ProjectService.getProject(projectId)
            if (resp.data.success) {
                setProduct(resp.data.data)
                resp.data.data.customFields.map((fields) => {
                    noneValidatedValue.customFields[fields['_id']] = {
                        projectExtraFiledId: fields['_id'],
                        label: fields['label'],
                        value: '',
                    }
                })
                setCustomFields(resp.data.data.customFields)
            }
        } catch (err) {}
    }

    useEffect(() => {
        getDailyWorkLog()
        getProjects()
    }, [dailyWorkLogId])

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
            delete postData['project']
            delete postData['created_at']
            const resp = await DailyWorkLogService.updateDailyWorkLog(dailyWorkLogId,postData)
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
            <Card className="p-0 mb-[15px] mx-0 rounded-none sticky top-16 w-full z-10">
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

            <Card className="p-0 m-3 mt-[2.55rem]">
                <CardContent className="m-0 p-3">
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
                                                            {noneValidatedValue.date ? format(noneValidatedValue.date, Constent.DATE_FORMAT) : date}
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
                                                    value={noneValidatedValue.workItem}
                                                    type="number"
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
                                                    value={noneValidatedValue.workedHours}
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
                                <>
                                    <hr className="mt-[1.75rem] mb-[1.75rem]" />
                                    <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                        {customFields.map((cfield) => {
                                            return cfield['projectExtraFiled'].dataType !== 'date' ? (
                                                <FormField
                                                    control={form.control}
                                                    name={cfield['projectExtraFiled'].fieldName}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{cfield['projectExtraFiled'].label}</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder={cfield['projectExtraFiled'].label}
                                                                    type={cfield['projectExtraFiled'].dataType}
                                                                    value={
                                                                        noneValidatedValue.customFields[cfield['projectExtraFiled']['_id']]['value']
                                                                    }
                                                                    onChange={(e) => {
                                                                        setNoneValidatedValue((prev) => {
                                                                            prev.customFields[cfield['projectExtraFiled']['_id']]['value'] =
                                                                                e.target.value
                                                                            return prev
                                                                        })
                                                                        setCustomFields((prev) => {
                                                                            let updatedCustomeField = []
                                                                            prev.map((val) => {
                                                                                if (
                                                                                    val['projectExtraFiled']['_id'] ==
                                                                                    cfield['projectExtraFiled']['_id']
                                                                                ) {
                                                                                    val['value'] = e.target.value
                                                                                }
                                                                                updatedCustomeField.push(val)
                                                                            })
                                                                            return updatedCustomeField
                                                                        })
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            ) : (
                                                <FormField
                                                    control={form.control}
                                                    name={cfield['projectExtraFiled'].fieldName}
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel>{cfield['projectExtraFiled'].label}</FormLabel>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                            {cfield['value'] ? (
                                                                                format(cfield['value'], Constent.DATE_FORMAT)
                                                                            ) : (
                                                                                <span>Pick a date</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field['value']}
                                                                        onSelect={(e) => {
                                                                            setNoneValidatedValue((prev) => {
                                                                                if (
                                                                                    prev.customFields[cfield['projectExtraFiled']['_id']] !==
                                                                                    undefined
                                                                                ) {
                                                                                    prev.customFields[cfield['projectExtraFiled']['_id']]['value'] =
                                                                                        format(e, Constent.DATE_FORMAT)
                                                                                }
                                                                                return prev
                                                                            })
                                                                            setCustomFields((prev) => {
                                                                                let updatedCustomeField = []
                                                                                prev.map((val) => {
                                                                                    if (
                                                                                        val['projectExtraFiled']['_id'] ==
                                                                                        cfield['projectExtraFiled']['_id']
                                                                                    ) {
                                                                                        val['value'] = e
                                                                                    }
                                                                                    updatedCustomeField.push(val)
                                                                                })
                                                                                return updatedCustomeField
                                                                            })
                                                                        }}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </FormItem>
                                                    )}
                                                />
                                            )
                                        })}
                                    </div>
                                </>
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default EditDailyWorkLog
