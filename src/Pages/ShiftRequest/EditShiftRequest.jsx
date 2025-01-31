import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/Components/ui/button'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import SearchableDropdown from '@/Components/Common/SearchableDropdown'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import Constent from '@/utils/constent'
import AuthService from '@/Service/AuthService'

const EditShiftRequest = () => {
    const [emp, setEmp] = useState()
    const [shift, setShift] = useState()
    const { name } = useParams()
    const [shiftrequest, setShiftRequest] = useState()
    const navigate = useNavigate()

    const formSchema = z.object({
        shift_type: z.string().min(1, {
            message: 'Shift Type is required',
        }),
        employee: z.string().min(1, {
            message: 'Employee is required',
        }),
        employee_name: z.string().min(1, {
            message: 'Employee Name is required',
        }),
        l1_supervisor_name: z.string().min(1, {
            message: 'Approver is required',
        }),
        approver: z.string().min(1, {
            message: 'Approver is required',
        }),

        from_date: z.date({
            errorMap: () => ({ message: 'From Date is required' }),
        }),

        to_date: z.date({
            errorMap: () => ({ message: 'To Date is required' }),
        }),
    })

    const form = useForm({
        // resolver: zodResolver(formSchema),
        defaultValues: {
            shift_type: '',
            employee: '',
            employee_name: '',
            approver: '',
            from_date: '',
            to_date: '',
            status: '',
        },
    })

    const formRef = useRef(null)
    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit()
        }
    }
    function onError(errors, e) {
        const errorKeys = Object.keys(errors)
        if (errorKeys.length > 0 && errors[errorKeys[0]]?.message) {
            toast.error(errors[errorKeys[0]].message)
        } else {
            toast.error('Something went wrong.')
        }
    }

    const getEmp = async () => {
        let empdata = await AuthService.getEmp()
        console.log('empdata', empdata.data.data[0])
        setEmp(empdata.data.data[0])
        //form.setValue('employee', empdata.data.data[0]?.employee)
        form.reset({
            employee: empdata.data.data[0]?.employee,
            employee_name: empdata.data.data[0]?.employee_name,
            department: empdata.data.data[0]?.department,
            l1_supervisor_name: empdata.data.data[0]?.l1_supervisor_name,
            approver: empdata.data.data[0]?.l1_supervisor_email,
            status: 'Draft',
        })
    }
    const getShift = async () => {
        let shiftdata = await AuthService.getShift()
        setShift(shiftdata.data.data)
        getShiftRequest(name)
        console.log('shiftdata', shiftdata.data.data)
    }
    const getShiftRequest = async () => {
        let shiftdata = await AuthService.getShiftRequest1(name)
        const { shift_type, employee, employee_name, approver, from_date, to_date, status } = shiftdata.data.data
        console.log({ shift_type, employee, employee_name, approver, from_date, to_date, status })
        form.reset({shift_type, employee, employee_name, approver, from_date, to_date, status})
        setShiftRequest(shiftdata.data.data)
        console.log('shifrequsettdata', shiftdata.data.data)
    }

    useEffect(() => {
        getEmp()
        getShift()
    }, [])
    async function onSubmit(data) {
        console.log("data",data)
        data['from_date'] = format(data['from_date'], Constent.DATE_FORMAT_HRMS)
        data['to_date'] = format(data['to_date'], Constent.DATE_FORMAT_HRMS)
        
        data['name'] = name
        try {
            const resp = await AuthService.updateShiftRequest(data)
            console.log("resp",resp.data.success)
            if (resp.data.success) {
                toast.success("Shift Request updated successfully")
                navigate('/shiftRequest')
                
            }
        } catch (err) {
            console.log('err : ', err)
            toast.error(err)
        }
    }

    return (
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-end items-center">
                        <div className="flex items-center justify-end gap-2">
                            <Link className="button" to="/master-settings/notes">
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
                        <Form {...form}>
                            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit, onError)} className="p-4 lg:ps-5">
                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                    <FormField
                                        className="w-full"
                                        control={form.control}
                                        name="shift_type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Shift Type</FormLabel>
                                                <div className="w-full">
                                                    <Select
                                                        {...field}
                                                        onValueChange={(val) => {
                                                            field.onChange(val)
                                                        }}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {shift?.map((val, index) => (
                                                                <SelectItem key={index} value={val.name}>
                                                                    {val.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        className="w-full"
                                        control={form.control}
                                        name="company"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company</FormLabel>
                                                <div className="w-full">
                                                    <Input {...field} placeholder="Billing From" value="Red Road" readOnly={true} className="mb-5" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
{console.log("form", form)}
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="employee"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Employee</FormLabel>
                                                    <div className="w-full">
                                                        <Input {...field} placeholder="Billing From" readOnly={true} className="mb-5" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="w-full">
                                                        <Input {...field} placeholder="status" readOnly={true} className="mb-5" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            className="w-full"
                                            control={form.control}
                                            name="employee_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Employee Name</FormLabel>
                                                    <div className="w-full">
                                                        <Input {...field} placeholder="Billing From" readOnly={true} className="mb-5" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            className="w-full"
                                            control={form.control}
                                            name="department"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Department</FormLabel>
                                                    <div className="w-full">
                                                        <Input {...field} placeholder="Billing From" readOnly={true} className="mb-5" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </>

                                    <div>
                                        {' '}
                                        <FormField
                                            className="w-full"
                                            control={form.control}
                                            name="l1_supervisor_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Approver</FormLabel>
                                                    <div className="w-full">
                                                        <Input {...field} placeholder="Approver" readOnly={true} className="mb-5" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            className="w-full"
                                            control={form.control}
                                            name="approver"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Approver Email</FormLabel>
                                                    <div className="w-full">
                                                        <Input {...field} placeholder="Approver" readOnly={true} className="mb-5" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="from_date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>From Date</FormLabel>
                                               
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                {field.value ? format(field.value, Constent.DATE_FORMAT) : ''}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={new Date(field.value)}
                                                            onSelect={(e) => {
                                                                field.onChange(e)
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
                                        name="to_date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>To Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                                {field.value ? format(field.value, Constent.DATE_FORMAT) : ''}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={new Date(field.value)}
                                                            onSelect={(e) => {
                                                                field.onChange(e)
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
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

export default EditShiftRequest
