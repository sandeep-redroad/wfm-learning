import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SearchableDropdown from '../../Components/Common/SearchableDropdown'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

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
        setcheckAll(false)
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
    function onSubmit(data) {
        Object.assign(data, noneValidatedValue)
        const filteredObj = Object.fromEntries(Object.entries(data).filter(([key, value]) => key !== 'comments' && value == ''))
        let key = Object.keys(filteredObj)[0]
        if (key == 'project') {
            toast.error('Please select Project ID')
            return
        }

        if (key == 'lob_process') {
            toast.error('Please select line of business')
            return
        }
        if (key == 'client') {
            toast.error('Please select client')
            return
        }

        let isSelect1Empty = rows.some(
            (item) => item.processtype === '' || item.billingtype === '' || item.employeeID == '' || item.employeeName == ''
        )
        if (isSelect1Empty) {
            rows.forEach((process, index) => {
                if (process.processtype === '') {
                    toast.error('Please select process name')
                    return
                } else if (process.billingtype == '') {
                    toast.error('Please select billing type')
                    return
                } else if (process.employeeID == '') {
                    toast.error('Please select employeeID')
                    return
                } else if (process.employeeName == '') {
                    toast.error('Please select employeeName')
                    return
                }
            })
        }

        data['process'] = rows

        console.log('abc : ', data)
    }
    const addRow = () => {
        setRows((prev) => {
            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1
            return [
                ...prev,
                {
                    id: newId,
                    checkbox: false,
                    employeeId: '',
                    employeeName: '',
                },
            ]
        })
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
            <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
            <Card className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                <CardContent className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                    <Form {...form}>
                        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="p-4 lg:ps-5">
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
                                                    selectedVal={noneValidatedValue.project}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                project: val,
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
                                    name="lob_process"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>LOB Process</FormLabel>
                                            <div className="w-full">
                                                <SearchableDropdown
                                                    options={lob_processes}
                                                    selectedVal={noneValidatedValue.lob_process}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                lob_process: val,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="LOB Process"
                                                />
                                            </div>
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
                                    name="process"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Process</FormLabel>
                                            <div className="w-full">
                                                <SearchableDropdown
                                                    options={clients}
                                                    selectedVal={noneValidatedValue.client}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                process: val,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="Process"
                                                />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="billingType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Billing Type</FormLabel>
                                            <div className="w-full">
                                                <SearchableDropdown
                                                    options={clients}
                                                    selectedVal={noneValidatedValue.client}
                                                    handleChange={(val) => {
                                                        setNoneValidatedValue((prev) => {
                                                            return {
                                                                ...prev,
                                                                billingType: val,
                                                            }
                                                        })
                                                    }}
                                                    placeholder="Billing Type"
                                                />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mt-[1.75rem] mb-[1.75rem] gap-y-[1.75rem]">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border">
                                            <TableHead className="w-[35px] border">
                                                <Checkbox onClick={changeAll} value={checkAll} checked={checkAll} />
                                            </TableHead>
                                            <TableHead className="w-[50px] border">Sr.No</TableHead>
                                            <TableHead className="border">Employee ID</TableHead>
                                            <TableHead className="border">Employee Name</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.length == 0 ? (
                                            <tr>
                                                <td colspan="6">
                                                    <h6 className="text-center" style={{ margin: 0 }}>
                                                        No Data
                                                    </h6>
                                                </td>
                                            </tr>
                                        ) : (
                                            rows.map((row, i) => (
                                                <TableRow key={row.id} className="border">
                                                    <TableCell className="border">
                                                        <Checkbox onClick={() => changeOne(row, i)} checked={row.checkbox} value={row.checkbox} />
                                                    </TableCell>
                                                    <TableCell className="border">{row.id}</TableCell>

                                                    <TableCell className="border">
                                                        <FormField
                                                            control={form.control}
                                                            name={`employeeID${i}`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <SearchableDropdown
                                                                            options={process_names}
                                                                            selectedVal={row.employeeId}
                                                                            className="border-none w-full outline-none ring-0 focus-visible:ring-0"
                                                                            handleChange={(val) => {
                                                                                setRows((prev) => {
                                                                                    let updatedData = []
                                                                                    prev.map((item, i) => {
                                                                                        if (item.id == row.id) {
                                                                                            prev[i]['employeeId'] = val
                                                                                        }
                                                                                        updatedData.push(item)
                                                                                    })
                                                                                    return updatedData
                                                                                })
                                                                            }}
                                                                            placeholder="Employee ID"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="border">
                                                        <FormField
                                                            control={form.control}
                                                            name={`employeeName${i}`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <SearchableDropdown
                                                                            options={process_names}
                                                                            selectedVal={row.employeeName}
                                                                            className="border-none w-full outline-none ring-0 focus-visible:ring-0"
                                                                            handleChange={(val) => {
                                                                                setRows((prev) => {
                                                                                    let updatedData = []
                                                                                    prev.map((item, i) => {
                                                                                        if (item.id == row.id) {
                                                                                            prev[i]['employeeName'] = val
                                                                                        }
                                                                                        updatedData.push(item)
                                                                                    })
                                                                                    return updatedData
                                                                                })
                                                                            }}
                                                                            placeholder="Employee Name"
                                                                        />
                                                                    </FormControl>
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
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            </div>
        </>
    )
}

export default EmployeeMapped
