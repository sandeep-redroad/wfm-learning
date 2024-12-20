import { React, useRef, useState } from 'react'
;('use client')
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { ToastContainer, toast } from 'react-toastify'
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
        defaultValues: {
            comments: '',
        },
    })

    const validateFields = () => {
        let isValid = true

        form.clearErrors()

        // Get current form values
        const values = form.getValues()

        // Validate Process Array
        values.process.forEach((process, index) => {
            const processName = process.name
            const billing = process.billing
            const rate = process.rate

            if (!processName.trim()) {
                form.setError(`process[${index}].name`, {
                    type: 'manual',
                    message: 'Process name is required',
                })
                isValid = false
            }
            if (!billing.trim()) {
                form.setError(`process[${index}].billing`, {
                    type: 'manual',
                    message: 'Billing is required',
                })
                isValid = false
            }
            if (!rate) {
                form.setError(`process[${index}].rate`, {
                    type: 'manual',
                    message: 'Rate is required',
                })
                isValid = false
            } else if (isNaN(rate) || rate < 0 || rate > 10000) {
                form.setError(`process[${index}].rate`, {
                    type: 'manual',
                    message: 'Rate must be a number between 0 and 10,000',
                })
                isValid = false
            }
        })

        return isValid
    }

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
        Object.assign(data,noneValidatedValue)
        const filteredObj = Object.fromEntries(
            Object.entries(data).filter(
                ([key, value]) =>
                    key !=="comments" && value == '' 
                  
            ) 
        )
        console.log("filteredObj : ",filteredObj)
        let key = Object.keys(filteredObj)[0]
        console.log("key ", key);
        if (key == 'lob_process') {
            toast.error('Please select line of buisness')
            return
        }
        if (key == 'client') {
            toast.error('Please select client')
            return;
        }
        if (key == 'department') {
            toast.error('Please select department')
            return;
        }
        if (key == 'projectlead') {
            toast.error('Please select Project lead')
            return;
        }

      let isSelect1Empty =rows.some(
            (item) => item.select1 === '' || item.select2 === ''
        );
        console.log("in is select",isSelect1Empty);
        if (!isSelect1Empty) {
           
            rows.forEach((process, index) => {
              if (process.processtype === '') {
                toast.error("Please select process name")
                return;
              } else if(process.billingtype==''){
                toast.error("Please select billing type");
                return;
              }
             });
            }
        
        data['process'] = rows;

        console.log('abc : ', filteredObj)
    }
   

    const onError = (errors, e) => {
        
        console.log('Error found 1 ', errors, e)
    }
   

    const addRow = () => {
        setRows([
            ...rows,
            {
                id: rows.length + 1,
                checkbox: false,
                switch: false,
                processtype: '',
                billingtype: '',
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
                        {/* <FormField
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
                                </FormItem>
                            )}
                        /> */}

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
