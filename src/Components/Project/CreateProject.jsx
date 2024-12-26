import { React, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

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
import SearchableDropdown from '../Common/SearchableDropdown'
import { Link } from 'react-router-dom'

const CreateProject = () => {
    const [checkAll, setcheckAll] = useState(false)
    const [checkhisotryAll, setchechistorykAll] = useState(false)
    const [rows, setRows] = useState([])
    const [historyrows, setHistoryrows] = useState([])
    const formRef = useRef(null)
    const today = format(new Date(), 'MM-dd-yyyy')
    
    console.log(today)
    // const date=new Date();
    const [noneValidatedValue, setNoneValidatedValue] = useState({
        lob_process: '',
        client: '',
        department: '',
        projectlead: '',
    })

    const form = useForm({
        defaultValues: {
            comments: '',
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
    const addHistoryrow = () => {
        setHistoryrows((prev) => {
            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1
            return [
                ...prev,
                {
                    id: newId,
                    checkbox: false,
                    status: '',
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

    return (
        <>
            <div className="flex justify-end items-center mb-3">
                <div className="flex items-center justify-end gap-2">
                    <Link className="button" to="/projects">
                        <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">
                            Back
                        </Button>
                    </Link>
                    <Button className="" onClick={handleSaveClick}>
                        Save
                    </Button>
                </div>
            </div>
            <Form {...form} className="">
                <form
                    ref={formRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=""
                >
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
                                            placeholder="Client"
                                        />
                                    </div>
                                    <FormMessage />
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
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="Inactive">
                                                    Inactive
                                                </SelectItem>

                                                <SelectItem value="On Hold">
                                                    On Hold
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lob_process"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LOF Process</FormLabel>
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
                                            placeholder="LOB Process"
                                        />
                                    </div>
                                    <FormMessage />
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
                                                <Button
                                                    variant={'outline'}
                                                    className="w-full pl-3 text-left font-normal"
                                                >
                                                    {field.value ? (
                                                        field.value
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
                            name="processs"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Process</FormLabel>
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
                                            placeholder="Process"
                                        />
                                    </div>

                                    <FormMessage />
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
                                            placeholder="Department"
                                        />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            className="w-full"
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billing Type</FormLabel>
                                    <div className="w-full">
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="billing type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Active">
                                                    Per WorkItem Transactional
                                                </SelectItem>
                                                <SelectItem value="Inactive">
                                                    FTE
                                                </SelectItem>

                                                <SelectItem value="On Hold">
                                                    Hourly Transactional
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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
                                    <FormLabel>Project Lead</FormLabel>
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
                                            placeholder="Project Lead"
                                        />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rate</FormLabel>
                                    <FormControl>
                                        <Input placeholder="rate" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="comments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comments</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="You can write your comments here"
                                            className="resize-none"
                                            row="1"
                                        />
                                    </FormControl>

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
                                        Label
                                    </TableHead>
                                    <TableHead className="w-[200px] border">
                                        Field Name
                                    </TableHead>
                                    <TableHead className="w-[200px] border">
                                        Data Type
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
                                                    <Input
                                                        placeholder="label"
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
                                                </div>
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input
                                                    placeholder="Field Name"
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
                                            <TableCell className="border">
                                                <div className="flex items-center space-x-2 justify-center">
                                                    <Input
                                                        placeholder="Data Type"
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
                        <h3 className="font-medium">History</h3>
                        <Table>
                            <TableHeader>
                                <TableRow className="border">
                                    <TableHead className="w-[35px] border">
                                        <Checkbox
                                            onClick={change_history_All}
                                            value={checkhisotryAll}
                                            checked={checkhisotryAll}
                                        />
                                    </TableHead>
                                    <TableHead className="w-[50px] border">
                                        Sr.No
                                    </TableHead>

                                    <TableHead className=" border">
                                        Status
                                    </TableHead>
                                    <TableHead className="w-[200px] border">
                                        Start Date
                                    </TableHead>
                                    <TableHead className="w-[200px] border">
                                        End Date
                                    </TableHead>
                                    <TableHead className=" border">
                                        Comments
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {historyrows.length == 0 ? (
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
                                    historyrows.map((historyrow, i) => (
                                        <TableRow
                                            key={historyrows.id}
                                            name="process"
                                            className="border"
                                        >
                                            <TableCell className="border">
                                                <Checkbox
                                                    onClick={() =>
                                                        change_history_One(
                                                            historyrow,
                                                            i
                                                        )
                                                    }
                                                    checked={
                                                        historyrow.checkbox
                                                    }
                                                    value={historyrow.checkbox}
                                                />
                                            </TableCell>
                                            <TableCell className="border">
                                                {historyrow.id}
                                            </TableCell>
                                            <TableCell className="border">
                                                <Select
                                                    onValueChange={(value) =>
                                                        setHistoryrows(
                                                            (prev) => {
                                                                let updatedData =
                                                                    []

                                                                prev.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => {
                                                                        if (
                                                                            item.id ==
                                                                            historyrow.id
                                                                        ) {
                                                                            prev[
                                                                                i
                                                                            ][
                                                                                'label'
                                                                            ] =
                                                                                value
                                                                        }
                                                                        updatedData.push(
                                                                            item
                                                                        )
                                                                    }
                                                                )
                                                                return updatedData
                                                            }
                                                        )
                                                    }
                                                    defaultValue={
                                                        historyrows.label
                                                    }
                                                    className="border-none w-full"
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="border-none shadow-none  w-full">
                                                            <SelectValue placeholder="Select Status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Active">
                                                            Active
                                                        </SelectItem>
                                                        <SelectItem value="Inactive">
                                                            Inactive
                                                        </SelectItem>

                                                        <SelectItem value="On Hold">
                                                            On Hold
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>

                                            <TableCell className="border">
                                                <div className="w-full">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={
                                                                    'outline'
                                                                }
                                                                className="w-full justify-start text-left font-normal border-none"
                                                            >
                                                                {historyrow.startdate
                                                                    ? format(
                                                                          historyrow.startdate,
                                                                          'MM-dd-yyyy'
                                                                      )
                                                                    : 'pick a date'}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="w-auto p-0 "
                                                            align="start"
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                key={historyrow.startdate}
                                                                
                                                                selected={
                                                                    historyrow.startdate
                                                                }
                                                                onSelect={(
                                                                    e
                                                                ) => {
                                                                    setHistoryrows(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            let updatedData =
                                                                                []

                                                                            prev.map(
                                                                                (
                                                                                    item,
                                                                                    i
                                                                                ) => {
                                                                                    if (
                                                                                        item.id ==
                                                                                        historyrow.id
                                                                                    ) {
                                                                                        prev[
                                                                                            i
                                                                                        ][
                                                                                            'startdate'
                                                                                        ] =
                                                                                        e
                                                                                    }
                                                                                    updatedData.push(
                                                                                        item
                                                                                    )
                                                                                }
                                                                            )
                                                                            return updatedData
                                                                        }
                                                                    )
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
                                                                variant={
                                                                    'outline'
                                                                }
                                                                className="w-full justify-start text-left font-normal border-none"
                                                            >
                                                                { historyrow.enddate
                                                                    ? format(
                                                                        historyrow.enddate,
                                                                          'MM-dd-yyyy'
                                                                      )
                                                                    : 'pick a date'}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start"
                                                        >
                                                        {console.log("historyrow : ",historyrow)}
                                                            <Calendar
                                                                key={historyrow.enddate}
                                                                mode="single"
                                                                selected={
                                                                    historyrow.enddate
                                                                }
                                                                onSelect={(
                                                                    e
                                                                ) => {
                                                                    setHistoryrows(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            let updatedData =
                                                                                []

                                                                            prev.map(
                                                                                (
                                                                                    item,
                                                                                    i
                                                                                ) => {
                                                                                    if (
                                                                                        item.id ==
                                                                                        historyrow.id
                                                                                    ) {
                                                                                        prev[
                                                                                            i
                                                                                        ][
                                                                                            'enddate'
                                                                                        ] =
                                                                                        e
                                                                                    }
                                                                                    updatedData.push(
                                                                                        item
                                                                                    )
                                                                                }
                                                                            )
                                                                            return updatedData
                                                                        }
                                                                    )
                                                                }}
                                                                
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    placeholder="Your Comments will come here"
                                                    onChange={(e) => {
                                                        setHistoryrows(
                                                            (prev) => {
                                                                let updatedData =
                                                                    []

                                                                prev.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => {
                                                                        if (
                                                                            item.id ==
                                                                            historyrow.id
                                                                        ) {
                                                                            prev[
                                                                                i
                                                                            ][
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
                                                            }
                                                        )
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

                    <div className="grid  gap-x-[3rem] gap-y-[1.75rem]">
                        {/* 
                        <FormField
                            control={form.control}
                            name="headcount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Head Count</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Head count"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        /> */}

                        {/* <FormField
                            control={form.control}
                            name="Ftedeployed"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>FTE Deployed</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="fte_deployed"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        /> */}
                    </div>
                </form>
            </Form>
        </>
    )
}

export default CreateProject
