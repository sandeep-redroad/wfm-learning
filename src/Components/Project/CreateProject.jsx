import { React, useRef, useState } from 'react'
;('use client')
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { z } from 'zod'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
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

import { Textarea } from '@/components/ui/textarea'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import SearchableSelect from '../Common/SearchableSelect'
import CustomSelect from '../Common/CustomSelect'
import SearchableDropdown from '../Common/SearchableDropdown'
import { Link } from 'react-router-dom';

const formSchema = z.object({
    projectname: z.string().min(2, {
        required_error: 'Project name must be at least 2 characters.',
    }),
    headcount: z.number({
        required_error: 'headcount is required',
        invalid_type_error: 'headcount must be a number',
    }),
    Ftedeployed: z.number({
        required_error: 'fte deployed is required',
        invalid_type_error: 'fte deployed must be a number',
    }),
})

const CreateProject = () => {
    const [checkOne, setcheckOne] = useState(false)
    const [checkAll, setcheckAll] = useState(false)
    const [rows, setRows] = useState([])
    const formRef = useRef(null);
    const [noneValidatedValue, setNoneValidatedValue] = useState({
        lob_process: '',
        client: '',
        department: '',
        projectlead: '',
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectname: '',
            lob_process: '',
            client: '',
            department: '',
            process: [
                {
                    enable: true,
                    name: '',
                    billing: '',
                    rate: 0,
                },
            ],
            projectlead: '',
            headcount: '',
            Ftedeployed: '',
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

    function onSubmit(values) {
        console.log('values', values)
    }
    const onError = (errors, e) => {
        console.log('Error found ', errors, e)
    }

    const addRow = () => {
        setRows([
            ...rows,
            {
                id: rows.length + 1,
                checkbox: false,
                switch: false,
                select1: '',
                select2: '',
                input: '',
            },
        ])
    }
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
        // Manually trigger form submission
        if (formRef.current) {
            formRef.current.requestSubmit(); // This triggers the form's onSubmit
        }
    };

    return (
        <>
            <div className="flex justify-end items-center mb-3">
                <div className="flex items-center justify-end gap-2">
                    <Link className="button" to="/projects">
                        <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">  
                            Back
                        </Button>
                    </Link>
                    <Button className="" onClick={handleSaveClick}>Save</Button>
                </div>
            </div>
            <Form {...form} className="">
                <form
                    ref={formRef} 
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className=""
                >
                    <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                        <FormField
                            control={form.control}
                            name="projectname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Project Name"
                                            {...field}
                                        />
                                    </FormControl>

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
                                        <CustomSelect
                                            data={clients}
                                            name="Client"
                                            field={field}
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
                                        <CustomSelect
                                            data={departments}
                                            name="Department"
                                            field={field}
                                        />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem]">
                        {/* <Card className="m-0"> */}
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
                                                        className="bg-primary-grn"
                                                        name={`switch${row.id}`}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="border">
                                                <div className="w-full">
                                                    <FormField
                                                        control={form.control}
                                                        name="processName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <Select
                                                                    onValueChange={
                                                                        field.onChange
                                                                    }
                                                                    defaultValue={
                                                                        field.value
                                                                    }
                                                                    className="border-none"
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger className="border-none shadow-none w-full">
                                                                            <SelectValue placeholder="Select Process" />
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
                                                </div>
                                            </TableCell>
                                            <TableCell className="border">
                                                <FormField
                                                    control={form.control}
                                                    name="billing"
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
                                                    name={`inputs${i}`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="rate"
                                                                    {...field}
                                                                    className="border-none shadow-none"
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

                    <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                        <FormField
                            control={form.control}
                            name="projectlead"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Lead</FormLabel>
                                    <div className="w-full">
                                        <CustomSelect
                                            data={team_leads}
                                            name="Team leads"
                                            field={field}
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
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
                </form>
            </Form>
        </>
    )
}

export default CreateProject
