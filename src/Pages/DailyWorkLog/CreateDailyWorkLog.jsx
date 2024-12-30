import { React, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { CalendarIcon, CloudCog } from 'lucide-react'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

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

const CreateDailyWorkLog = () => {
    const [checkAll, setcheckAll] = useState(false)
    const [rows, setRows] = useState([])
    const formRef = useRef(null)
    const date = new Date()
    const today = format(new Date(), 'MM-dd-yyyy')
    console.log(today)
    const customfields = [
        { label: 'Text Label', dataType: 'small Text', fieldType: 'test_label' },
        { label: 'Data Label', dataType: 'Data', fieldType: 'data_label' },
        { label: 'Date Label', dataType: 'Date', fieldType: 'date_label' },
    ]

    const [noneValidatedValue, setNoneValidatedValue] = useState({
        projectID: '',
        workitem: '',
        worked_hours: '',
        billing_type: '',
    })

    const form = useForm({
        defaultValues: {
            date: today,
        },
    })

    // const [projectData]
    const lob_processes = [
        {
            value: 'next.js',
            label: 'Next.js',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
    ]
    const projectleads = [
        {
            value: 'next.js',
            label: 'Next.js',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
    ]
    const clients = [
        {
            value: 'next.js',
            label: 'Next.js',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
    ]
    const departments = [
        {
            value: 'next.js',
            label: 'Next.js',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
    ]
    const process_names = [
        {
            value: 'next.js',
            label: 'Next.js',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
    ]

    function onSubmit(data) {
        Object.assign(data, noneValidatedValue)
        const filteredObj = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => key !== 'comments' && value == '') // Filter based on value
        )
        let key = Object.keys(filteredObj)[0]
        console.log('keys', Object.keys(filteredObj), key)
        if (key == 'projectID') {
            toast.error('Please select ProjectID')
            return
        }
        if (key == 'workitem') {
            toast.error('Please enter work item')
            return
        }
        if (key == 'worked_hours') {
            toast.error('Please enter worked hours')
            return
        }

        for (let i = 0; i < customfields.length; i++) {
            console.log(customfields[i].fieldType)
            if (customfields[i].fieldType === '') {
                toast.error('Please select process name')
                return
            }
        }
        data['customfields'] = customfields

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
                    process: '',
                    billingtype: '',
                    rate: '',
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

            <Card className="p-0 m-3 mt-[3rem]">
                <CardContent className="m-0 p-3">
                    <Form {...form}>
                        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="p-4 lg:ps-5">
                            <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                <FormField
                                    control={form.control}
                                    name="employeeID"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employee ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="employee ID"
                                                    onChange={(e) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                employeeID: e.target.value,
                                                            }
                                                        })
                                                    }}
                                                />
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
                                                <Input
                                                    placeholder="employeeName"
                                                    onChange={(e) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                employeeName: e.target.value,
                                                            }
                                                        })
                                                    }}
                                                />
                                            </FormControl>

                                            
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="projectID"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project ID</FormLabel>
                                            <div className="w-full">
                                                <SearchableDropdown
                                                    options={lob_processes}
                                                    selectedVal={noneValidatedValue.projectID}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                projectID: val,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="Project ID"
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
                                                            console.log('date', e)
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
                                                />
                                            </div>
                                            
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="workitem"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Work Items</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Work Items"
                                                    onChange={(e) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                workitem: e.target.value,
                                                            }
                                                        })
                                                    }}
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
                                            <div className="full">
                                                <SearchableDropdown
                                                    options={departments}
                                                    selectedVal={noneValidatedValue.department}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                process: val,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="Select Process"
                                                />
                                            </div>

                                            
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="worked_hours"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Worked Hours</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Worked Hours"
                                                    onChange={(e) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                worked_hours: e.target.value,
                                                            }
                                                        })
                                                    }}
                                                />
                                            </FormControl>

                                            
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
                                            <div className="w-full">
                                                <Select
                                                    onValueChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                billing_type: val,
                                                            }
                                                        })
                                                        handlebillingChange(val)
                                                    }}
                                                    defaultValue="Hourly Transactional"
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Per WorkItem Transactional">Per WorkItem Transactional</SelectItem>
                                                        <SelectItem value="FTE">FTE</SelectItem>

                                                        <SelectItem value="Hourly Transactional" selected>
                                                            Hourly Transactional
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <hr className="mt-[1.75rem] mb-[1.75rem]" />
                            <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                {customfields.map((cfield) => {
                                    console.log('custom fields', cfield)
                                    return cfield.dataType == 'small Text' || cfield.dataType == 'Data' ? (
                                        <FormField
                                            control={form.control}
                                            name={cfield.fieldType}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{cfield.label}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Worked Hours"
                                                            onChange={(e) => {
                                                                setNoneValidatedValue((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        workedhours: e.target.value,
                                                                    }
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
                                            name={cfield.fieldType}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>{cfield.label}</FormLabel>
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
                                                                    console.log('date', e)
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
                                    )
                                })}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default CreateDailyWorkLog
