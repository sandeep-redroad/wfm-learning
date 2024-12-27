import { React, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import BillingData from '@/assets/data/BillingData'
import { Textarea } from '@/components/ui/textarea'
import SearchableDropdown from '../../Components/Common/SearchableDropdown'
import { Link } from 'react-router-dom'

const Invoicef = () => {
    const [checkAll, setcheckAll] = useState(false)
    const [rows, setRows] = useState([])
    const formRef = useRef(null)
    const [noneValidatedValue, setNoneValidatedValue] = useState({
        lob_process: '',
        client: '',
        department: '',
        projectlead: '',
    })

    const form = useForm({
        defaultValues: {
            comments: '',
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
    const status = [
      {
          value: 'Hold',
          label: 'Hold',
      },
      {
          value: 'Active',
          label: 'Active',
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
            Object.entries(data).filter(
                ([key, value]) => key !== 'comments' && value == ''
            ) // Filter based on value
        )
        let key = Object.keys(filteredObj)[0]
        if (key == 'lob_process') {
            toast.error('Please select line of buisness')
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
        if (key == 'projectlead') {
            toast.error('Please select Project lead')
            return
        }
        if (key == 'projectlead') {
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
            
                        <Card className="p-0 mb-[46px] mx-0 rounded-none sticky top-16 w-full z-10">
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
                        <Card className="p-0 m-3 ">
                            <CardContent className="m-0 p-3">
            <Form {...form} className="">
                <form
                    ref={formRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                   className="p-4 lg:ps-5"
                >
                    <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                        <FormField
                            control={form.control}
                            name="lob_process"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Invoice ID</FormLabel>
                                    <div className="w-full">
                                        <SearchableDropdown
                                            options={lob_processes}
                                            selectedVal={
                                                noneValidatedValue.lob_process
                                            }
                                            handleChange={(val) => {
                                                setNoneValidatedValue(
                                                    (prev) => {
                                                        return {
                                                            ...prev,
                                                            lob_process: val,
                                                        }
                                                    }
                                                )
                                            }}
                                            placeholder="Invoice ID"
                                        />
                                    </div>
                                    <FormMessage />
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
                                                <Button
                                                    variant={'outline'}
                                                    className="w-full pl-3 text-left font-normal"
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP'
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
   <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project ID</FormLabel>
                                    <div className="full">
                                        <SearchableDropdown
                                            options={departments}
                                            selectedVal={
                                                noneValidatedValue.department
                                            }
                                            handleChange={(val) => {
                                                setNoneValidatedValue(
                                                    (prev) => {
                                                        return {
                                                            ...prev,
                                                            department: val,
                                                        }
                                                    }
                                                )
                                            }}
                                            placeholder="Project ID"
                                        />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="client"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LOF Buisness</FormLabel>
                                    <div className="w-full">
                                        <SearchableDropdown
                                            options={clients}
                                            selectedVal={
                                                noneValidatedValue.client
                                            }
                                            handleChange={(val) => {
                                                setNoneValidatedValue(
                                                    (prev) => {
                                                        return {
                                                            ...prev,
                                                            client: val,
                                                        }
                                                    }
                                                )
                                            }}
                                            placeholder="LOF Buisness"
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                     

                        <FormField
                            control={form.control}
                            name="projectlead"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billing From</FormLabel>
                                    <div className="w-full">
                                        <SearchableDropdown
                                            options={projectleads}
                                            selectedVal={
                                                noneValidatedValue.projectlead
                                            }
                                            handleChange={(val) => {
                                                setNoneValidatedValue(
                                                    (prev) => {
                                                        return {
                                                            ...prev,
                                                            projectlead: val,
                                                        }
                                                    }
                                                )
                                            }}
                                            placeholder="Billing From"
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
                                    <FormLabel>Billing To</FormLabel>
                                    <div className="w-full">
                                        <SearchableDropdown
                                            options={projectleads}
                                            selectedVal={
                                                noneValidatedValue.projectlead
                                            }
                                            handleChange={(val) => {
                                                setNoneValidatedValue(
                                                    (prev) => {
                                                        return {
                                                            ...prev,
                                                            projectlead: val,
                                                        }
                                                    }
                                                )
                                            }}
                                            placeholder="Billing To"
                                        />
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
                                                <Button
                                                    variant={'outline'}
                                                    className="w-full pl-3 text-left font-normal"
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP'
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage />
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
                                                <Button
                                                    variant={'outline'}
                                                    className="w-full pl-3 text-left font-normal"
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP'
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem] ">
                        <Table>
                            <TableHeader>
                                <TableRow className="border">
                                    <TableHead className="w-[35px] border">
                                        <Checkbox
                                            onClick={changeAll}
                                            value={checkAll}
                                            checked={checkAll}
                                        />
                                    </TableHead>
                                    <TableHead className="w-[50px] border">
                                        Sr.No
                                    </TableHead>

                                    <TableHead className="w-[300px] border">
                                        Process
                                    </TableHead>
                                    <TableHead className="w-[200px] border">
                                        Billing
                                    </TableHead>
                                    <TableHead className="w-[100px] border">
                                        Hours
                                    </TableHead>
                                    <TableHead className="w-[100px] border">
                                       Rate
                                    </TableHead>
                                    <TableHead className="w-[100px] border">
                                       Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.length == 0 ? (
                                    <tr>
                                        <td colspan="6">
                                            <h6
                                                className="text-center"
                                                style={{ margin: 0 }}
                                            >
                                                No Data
                                            </h6>
                                        </td>
                                    </tr>
                                ) : (
                                    rows.map((row, i) => (
                                        <TableRow
                                            key={row.id}
                                            name="process"
                                            className="border"
                                        >
                                            <TableCell className="border">
                                                <Checkbox
                                                    onClick={() =>
                                                        changeOne(row, i)
                                                    }
                                                    checked={row.checkbox}
                                                    value={row.checkbox}
                                                />
                                            </TableCell>
                                            <TableCell className="border">
                                                {row.id}
                                            </TableCell>

                                            <TableCell className="border">
                                                <div className="w-full">
                                                    <SearchableDropdown
                                                        options={process_names}
                                                        selectedVal={
                                                            row.process
                                                        }
                                                        handleChange={(val) => {
                                                            setRows((prev) => {
                                                                let updatedData =
                                                                    []

                                                                prev.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => {
                                                                        if (
                                                                            item.id ==
                                                                            row.id
                                                                        ) {
                                                                            prev[
                                                                                i
                                                                            ][
                                                                                'process'
                                                                            ] =
                                                                                val
                                                                        }
                                                                        updatedData.push(
                                                                            item
                                                                        )
                                                                    }
                                                                )
                                                                return updatedData
                                                            })
                                                        }}
                                                        placeholder="Process"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="border">
                                                <Select
                                                    onValueChange={(value) =>
                                                        setRows((prev) => {
                                                            let updatedData = []

                                                            prev.map(
                                                                (item, i) => {
                                                                    if (
                                                                        item.id ==
                                                                        row.id
                                                                    ) {
                                                                        prev[i][
                                                                            'billingtype'
                                                                        ] =
                                                                            value
                                                                    }
                                                                    updatedData.push(
                                                                        item
                                                                    )
                                                                }
                                                            )
                                                            return updatedData
                                                        })
                                                    }
                                                    defaultValue={
                                                        row.billingtype
                                                    }
                                                    className="border-none w-full"
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="border-none shadow-none  w-full">
                                                            <SelectValue placeholder="Select Billing" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {BillingData.map(
                                                            (billing) => (
                                                                <SelectItem
                                                                    key={
                                                                        billing.id
                                                                    }
                                                                    value={
                                                                        billing.billingType
                                                                    }
                                                                >
                                                                    {
                                                                        billing.billingType
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="border">
                                                <div className="flex items-center space-x-2 justify-center">
                                                    <Input
                                                        placeholder="Hours"
                                                        onChange={(e) => {
                                                            setRows((prev) => {
                                                                let updatedData =
                                                                    []

                                                                prev.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => {
                                                                        if (
                                                                            item.id ==
                                                                            row.id
                                                                        ) {
                                                                            prev[
                                                                                i
                                                                            ][
                                                                                'work_item'
                                                                            ] =
                                                                                e.target.value
                                                                        }
                                                                        updatedData.push(
                                                                            item
                                                                        )
                                                                    }
                                                                )
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

                                                            prev.map(
                                                                (item, i) => {
                                                                    if (
                                                                        item.id ==
                                                                        row.id
                                                                    ) {
                                                                        prev[i][
                                                                            'hours'
                                                                        ] =
                                                                            e.target.value
                                                                    }
                                                                    updatedData.push(
                                                                        item
                                                                    )
                                                                }
                                                            )
                                                            return updatedData
                                                        })
                                                    }}
                                                    className="border-none shadow-none"
                                                />
                                            </TableCell>
                                            <TableCell>
                                            <Input
                                                        placeholder="Amount"
                                                        onChange={(e) => {
                                                            setRows((prev) => {
                                                                let updatedData =
                                                                    []

                                                                prev.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => {
                                                                        if (
                                                                            item.id ==
                                                                            row.id
                                                                        ) {
                                                                            prev[
                                                                                i
                                                                            ][
                                                                                'work_item'
                                                                            ] =
                                                                                e.target.value
                                                                        }
                                                                        updatedData.push(
                                                                            item
                                                                        )
                                                                    }
                                                                )
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
                                                                   <FormControl>
                                                                       <Textarea
                                                                           placeholder="You can write your note here"
                                                                           className="resize-none"
                                                                           row="1"
                                                                       />
                                                                   </FormControl>
                               
                                                                   <FormMessage />
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
                                        <Input
                                            placeholder="Total Amount"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <div className="w-full">
                                        <SearchableDropdown
                                            options={status}
                                            selectedVal={
                                                noneValidatedValue.status
                                            }
                                            handleChange={(val) => {
                                                setNoneValidatedValue(
                                                    (prev) => {
                                                        return {
                                                            ...prev,
                                                            status: val,
                                                        }
                                                    }
                                                )
                                            }}
                                            placeholder="Status"
                                        />
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
                                        <Input
                                            placeholder="Amount Paid"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                      
                    </div>
                </form>
            </Form>
               </CardContent>
                        </Card>
        </>
    )
}

export default Invoicef
