import { React, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
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
    const team_leads = [
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
            )
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
            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1; 
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
                                    <TableHead className="w-[50px] border">
                                        Enable
                                    </TableHead>
                                    <TableHead className="w-[300px] border">
                                        Process
                                    </TableHead>
                                    <TableHead className="w-[200px] border">
                                        Billing
                                    </TableHead>
                                    <TableHead className="w-[100px] border">
                                        Rate
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
                                                <div className="flex items-center space-x-2 justify-center">
                                                    <Switch
                                                        checked={row.enable}
                                                        onCheckedChange={(
                                                            e
                                                        ) => {
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
                                                                                'enable'
                                                                            ] =
                                                                                e
                                                                        }
                                                                        updatedData.push(
                                                                            item
                                                                        )
                                                                    }
                                                                )
                                                                return updatedData
                                                            })
                                                        }}
                                                        className="bg-primary-grn"
                                                        name={`enabled${row.id}`}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="border">
                                                <div className="w-full">
                                                    <SearchableDropdown
                                                        options={process_names}
                                                        selectedVal={
                                                            row.process
                                                        }
                                                        className="border-none w-full outline-none ring-0 focus-visible:ring-0"
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
                                            <TableCell>
                                                <Input
                                                    placeholder="rate"
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
                                                                            'rate'
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
                </form>
            </Form>
        </>
    )
}

export default CreateProject
