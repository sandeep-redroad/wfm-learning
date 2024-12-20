import React, { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import SearchableDropdown from '../../Components/Common/SearchableDropdown'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'

const EmployeeMapped = () => {
     const formRef = useRef(null)
    const [checkAll, setcheckAll] = useState(false)
    const [rows, setRows] = useState([])
    const [noneValidatedValue, setNoneValidatedValue] = useState({
        lob_process: '',
        client: '',
        project: '',
    })

    const form = useForm({
        defaultValues: {},
    })
    const deleteone = (id) => {
        const updatedrows = rows.filter((row) => !row.checkbox)
        let newdata = updatedrows.length > 0 ? updatedrows : []

        setRows(() => newdata)
    }
    const deleteAll = () => {
        setRows([])
    }
    const changeOne = (row, i) => {
        setRows((prev) => {
            let updatedData = [];

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
    function onSubmit(data) {
        Object.assign(data, noneValidatedValue)
        const filteredObj = Object.fromEntries(
            Object.entries(data).filter(
                ([key, value]) => key !== 'comments' && value == ''
            )
        )
        console.log('filteredObj : ', filteredObj)
        let key = Object.keys(filteredObj)[0]
        console.log('key ', key)
        if (key == 'project') {
            toast.error('Please select Project ID')
            return
        }

        if (key == 'lob_process') {
            toast.error('Please select line of buisness')
            return
        }
        if (key == 'client') {
            toast.error('Please select client')
            return
        }

        let isSelect1Empty = rows.some(
            (item) => item.processtype === '' || item.billingtype === ''|| item.employeeID==''||item.employeeName==''
        )
        console.log('in is select', isSelect1Empty)
        if (isSelect1Empty) {
            rows.forEach((process, index) => {
                if (process.processtype === '') {
                    toast.error('Please select process name')
                    return
                } else if (process.billingtype == '') {
                    toast.error('Please select billing type')
                    return
                }
                else if (process.employeeID == '') {
                    toast.error('Please select employeeID')
                    return
                }
                else if (process.employeeName == '') {
                    toast.error('Please select employeeName')
                    return
                }
            })
        }

        data['process'] = rows

        console.log('abc : ', data)
    }
    const addRow = () => {
        setRows([
            ...rows,
            {
                id: rows.length + 1,
                process: '',
                billing: '',
                employeeID: '',
                employeeName: '',

            },
        ])
    }
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
    const projects = [
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
            <Form {...form}>
                <form ref={formRef}
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-x-[3rem] gap-y-[1.75rem]">
                        <FormField
                            control={form.control}
                            name="project"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project ID</FormLabel>
                                    <div className="full">
                                        <SearchableDropdown
                                            options={projects}
                                            selectedVal={
                                                noneValidatedValue.project
                                            }
                                            handleChange={(val) => {
                                                setNoneValidatedValue(
                                                    (prev) => {
                                                        return {
                                                            ...prev,
                                                            project: val,
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
                            name="lob_process"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LOB Process</FormLabel>
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

                        {/* <FormField
                            control={form.control}
                            name="projectlead"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Lead</FormLabel>
                                    <div className="w-full">
                                        <SearchableDropdown
                                            options={team_leads}
                                            selectedVal={
                                                noneValidatedValue.team_lead
                                            }
                                            handleChange={(val) => {
                                                setNoneValidatedValue(
                                                    (prev) => {
                                                        return {
                                                            ...prev,
                                                            team_lead: val,
                                                        }
                                                    }
                                                )
                                            }}
                                            placeholder="Project Lead"
                                        />
                                    </div>
                                </FormItem>
                            )}
                        /> */}
                    </div>

                    <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem]">
                        {/* <Card className="m-0"> */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[35px]">
                                        <Checkbox
                                            onClick={changeAll}
                                            value={checkAll}
                                            checked={checkAll}
                                        />
                                    </TableHead>
                                    <TableHead className="w-[50px] ">
                                        Sr.No
                                    </TableHead>
                                    <TableHead className="w-[50px]">
                                        Enable
                                    </TableHead>
                                    <TableHead className="">Process</TableHead>
                                    <TableHead className="">Billing</TableHead>
                                    <TableHead className="">
                                        Employee ID
                                    </TableHead>
                                    <TableHead className="">
                                        Employee Name
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
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <Checkbox
                                                    onClick={() =>
                                                        changeOne(row, i)
                                                    }
                                                    checked={row.checkbox}
                                                    value={row.checkbox}
                                                />
                                            </TableCell>
                                            <TableCell className="">
                                                {row.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2 justify-center">
                                                    <Switch
                                                        className="bg-primary-grn"
                                                        name={`switch${row.id}`}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="w-full">
                                                    <FormField
                                                        control={form.control}
                                                        name="processtype"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <SearchableDropdown
                                                                    options={
                                                                        process_names
                                                                    }
                                                                    selectedVal={
                                                                        noneValidatedValue.process_name
                                                                    }
                                                                    handleChange={(
                                                                        val
                                                                    ) => {
                                                                        setNoneValidatedValue(
                                                                            (
                                                                                prev
                                                                            ) => {
                                                                                return {
                                                                                    ...prev,
                                                                                    process_name:
                                                                                        val,
                                                                                }
                                                                            }
                                                                        )
                                                                    }}
                                                                    placeholder="Process"
                                                                />
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name="billingtype"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <Select
                                                                onValueChange={
                                                                    field.onChange
                                                                }
                                                                defaultValue={
                                                                    field.value
                                                                }
                                                                className="border-none w-full"
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className="border-none shadow-none  w-full">
                                                                        <SelectValue placeholder="Select Billing" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="m@example.com">
                                                                        m@example.com
                                                                    </SelectItem>
                                                                    <SelectItem value="m@google.com">
                                                                        m@google.com
                                                                    </SelectItem>
                                                                    <SelectItem value="m@support.com">
                                                                        m@support.com
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name={`employeeID${i}`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <SearchableDropdown
                                                                    options={
                                                                        process_names
                                                                    }
                                                                    selectedVal={
                                                                        noneValidatedValue.process_name
                                                                    }
                                                                    handleChange={(
                                                                        val
                                                                    ) => {
                                                                        setNoneValidatedValue(
                                                                            (
                                                                                prev
                                                                            ) => {
                                                                                return {
                                                                                    ...prev,
                                                                                    process_name:
                                                                                        val,
                                                                                }
                                                                            }
                                                                        )
                                                                    }}
                                                                    placeholder="Employee ID"
                                                                />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name={`employeeName${i}`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <SearchableDropdown
                                                                    options={
                                                                        process_names
                                                                    }
                                                                    selectedVal={
                                                                        noneValidatedValue.process_name
                                                                    }
                                                                    handleChange={(
                                                                        val
                                                                    ) => {
                                                                        setNoneValidatedValue(
                                                                            (
                                                                                prev
                                                                            ) => {
                                                                                return {
                                                                                    ...prev,
                                                                                    process_name:
                                                                                        val,
                                                                                }
                                                                            }
                                                                        )
                                                                    }}
                                                                    placeholder="Employee Name"
                                                                />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
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
                   
                </form>
            </Form>
        </>
    )
}

export default EmployeeMapped
