import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import InvoiceColumns from './InvoiceColumn'
import { Card, CardContent } from '@/components/ui/card'
import { useDebounce } from 'use-debounce'
import Constent from '@/utils/constent'
import InvoiceService from '@/Service/InvoiceService'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'react-toastify'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SearchableDropdown from '@/Components/Common/SearchableDropdown'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import ClientService from '@/Service/ClientService'
import assets from '@/assets/assets'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import ProcessService from '@/Service/ProcessService'
import ProjectService from '@/Service/ProjectService'
import GenerateInvoiceColumn from './GenerateInvoiceListColumns'
const Invoice = () => {
    const today = new Date()
    const [date, setDate] = useState({
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    })
    const [invoices, setInvoices] = useState([])
    const [projects, setProjects] = useState([])
    const [clients, setClients] = useState([])
    const [process, setProcess] = useState([])
    const [generateInvoiceFilter, setGenerateInvoiceFilter] = useState({
        client: '',
        status: '',
        process: '',
    })
    const [totalCount, setTotalCount] = useState(0)
    const [totalProjectCount, setTotalProjectCount] = useState(0)
    const [searchId, setSearchId] = useState('')
    const [searchClient, setSearchClient] = useState('')
    const [allcheck, setAllcheck] = useState(false)
    const [deleteId, setDeleteId] = useState([])
    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: {
            id: '',
            projectId: '',
        },
    })
    const [debounce1] = useDebounce(searchId, Constent.DEBOUNCE_DELAY)
    const [debounce2] = useDebounce(searchClient, Constent.DEBOUNCE_DELAY)
    const location = useLocation()
    const getInvoice = async () => {
        try {
            const resp = await InvoiceService.getInvoices(queryParam)
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setInvoices(resp.data.data)
            }
        } catch (err) {}
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = parseInt(searchParams.get('page') || 1)
        setQueryParam((prev) => {
            return {
                ...prev,
                page: page,
            }
        })
    }, [location.search])

    useEffect(() => {
        getInvoice()
    }, [queryParam.page, queryParam.search.id, queryParam.search.client])

    useEffect(() => {
        setQueryParam((prev) => {
            return {
                ...prev,
                search: {
                    id: debounce1,
                    client: debounce2,
                },
            }
        })
    }, [debounce1, debounce2])

    const deleteInvoice = async () => {
        try {
            const resp = await InvoiceService.deleteInvoice(deleteId)
            console.log('response', resp)
            if (resp.data.success) {
                toast.success(resp.data.message)
                getInvoice()
            }
        } catch (err) {
            console.log('error', err)
        }
    }

    useEffect(() => {
        getClients()
        getProcess()
    }, [])

    useEffect(() => {
        getProjects()
    }, [generateInvoiceFilter.client, generateInvoiceFilter.process, generateInvoiceFilter.status])

    const getClients = async () => {
        try {
            const resp = await ClientService.getClients()
            if (resp.data.success) {
                setClients(resp.data.data)
            }
        } catch (err) {}
    }

    const getProjects = async () => {
        try {
            let param = {
                search : generateInvoiceFilter
            }
            const resp = await ProjectService.getProjects(param)
            if (resp.data.success) {
                setProjects(resp.data.data)
                setTotalProjectCount(resp.data.pagination.totalRecords)
            }
        } catch (err) {}
    }

    const getProcess = async () => {
        try {
            const resp = await ProcessService.getProcess()
            if (resp.data.success) {
                setProcess(resp.data.data)
            }
        } catch (err) {}
    }

    return (
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/invoice/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Invoice</Button>
                        </Link>
                        <DropdownMenu className="ml-[10px] ">
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={`ml-[10px] ${deleteId.length > 0 ? 'block' : 'hidden'}`}>
                                    Action
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={deleteInvoice}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
            <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
                <Card className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                    <CardContent className="m-0 px-1 overflow-y-auto">
                        <Tabs defaultValue="invoice" className="relative mr-auto w-full">
                            <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                                <TabsTrigger
                                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 data-[state=active]:font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-black data-[state=active]:text-foreground data-[state=active]:shadow-none font-normal"
                                    value="invoice"
                                >
                                    Invoices
                                </TabsTrigger>
                                <TabsTrigger
                                    value="project"
                                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 data-[state=active]:font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-black data-[state=active]:text-foreground data-[state=active]:shadow-none font-normal"
                                >
                                    Projects
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="invoice">
                                <div className="w-full my-2 grid grid-cols-4 gap-3 mb-3">
                                    <Input type="text" placeholder="ID" />
                                </div>
                                <Datatable
                                    columns={InvoiceColumns()}
                                    data={invoices}
                                    totalDataCount={totalCount}
                                    type={DataTableEnumType.INVOICE}
                                    allcheck={allcheck}
                                    deleteId={deleteId}
                                    setDeleteId={setDeleteId}
                                />
                            </TabsContent>
                            <TabsContent value="project">
                                <div className="w-full my-2 grid grid-cols-4 gap-3 mb-3">
                                    <SearchableDropdown
                                        options={clients}
                                        selectedVal={generateInvoiceFilter.client}
                                        handleChange={(val) => {
                                            setGenerateInvoiceFilter((prev) => {
                                                return {
                                                    ...prev,
                                                    client: val,
                                                }
                                            })
                                        }}
                                        placeholder="Client"
                                        label="client"
                                    />
                                    <SearchableDropdown
                                        options={process}
                                        selectedVal={generateInvoiceFilter.process}
                                        handleChange={(val) => {
                                            setGenerateInvoiceFilter((prev) => {
                                                return {
                                                    ...prev,
                                                    process: val,
                                                }
                                            })
                                        }}
                                        placeholder="Process"
                                        label="process"
                                    />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="date"
                                                variant={'outline'}
                                                className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
                                            >
                                                <CalendarIcon />
                                                {date?.from ? (
                                                    date.to ? (
                                                        <>
                                                            {format(date.from, Constent.DATE_FORMAT)} to {format(date.to, Constent.DATE_FORMAT)}
                                                        </>
                                                    ) : (
                                                        format(date.from, Constent.DATE_FORMAT)
                                                    )
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={1}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Select
                                        className="w-full"
                                        onValueChange={(val) => setGenerateInvoiceFilter((prev) => ({ ...prev, status: val }))}
                                    >
                                        <SelectTrigger className="shadow-none  w-full">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {assets.InvoiceFilterData.map((val) => (
                                                <SelectItem value={val.id}>{val.status}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Datatable
                                    columns={GenerateInvoiceColumn()}
                                    data={projects}
                                    totalDataCount={totalProjectCount}
                                    type={DataTableEnumType.INVOICE_GENERATE}
                                    setDeleteId={setDeleteId}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Invoice
