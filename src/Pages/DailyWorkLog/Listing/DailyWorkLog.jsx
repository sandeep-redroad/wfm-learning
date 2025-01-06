import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import Datatable from '@/Components/Common/Datatable'
import DailyWorkLogColumns from './DailyWorkLogColumns'
import { Card, CardContent } from '@/components/ui/card'
import { useDebounce } from 'use-debounce'
import DailyWorkLogService from '@/Service/DailyWorkLogService'
import Constent from '@/utils/constent'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const DailyWorkLog = () => {
    const today = new Date();
    const [date, setDate] = useState({
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    })
    const [dailyWorkLogs, setDailyWorkLogs] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [searchProjectId, setSearchProjectId] = useState('')
    const [searchClient, setSearchClient] = useState('')
    const [searchEmployeeName, setSearchEmployeeName] = useState('')
    const [searchProcess, setSearchProcess] = useState('')
    const [searchBillingType, setSearchBillingType] = useState('')
    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: {
            id: '',
            client: '',
            employeeName: '',
            process: '',
            billingType: '',
            startDate: '',
            endDate: '',
        },
    })
    const [debounceSearchProjectId] = useDebounce(searchProjectId, Constent.DEBOUNCE_DELAY)
    const [debounceSearchClient] = useDebounce(searchClient, Constent.DEBOUNCE_DELAY)
    const [debounceSearchEmployeeName] = useDebounce(searchEmployeeName, Constent.DEBOUNCE_DELAY)
    const [debounceSearchProcess] = useDebounce(searchProcess, Constent.DEBOUNCE_DELAY)
    const [debounceSearchBillingType] = useDebounce(searchBillingType, Constent.DEBOUNCE_DELAY)
    const location = useLocation()
    const getDailyWorkLogs = async () => {
        try {
            const resp = await DailyWorkLogService.getDailyworks(queryParam)
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setDailyWorkLogs(resp.data.data)
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
        getDailyWorkLogs()
    }, [queryParam.page, queryParam.search.projectId, queryParam.search.client, queryParam.search.employeeName, queryParam.search.process, queryParam.search.billingType, queryParam.search.endDate])

    useEffect(() => {
        setQueryParam((prev) => {
            return {
                ...prev,
                search: {
                    projectId: debounceSearchProjectId,
                    client: debounceSearchClient,
                    employeeName: debounceSearchEmployeeName,
                    process: debounceSearchProcess,
                    billingType: debounceSearchBillingType,
                    startDate: date?.from ? format(date.from, Constent.DATE_FORMAT) : '',
                    endDate: date?.to ? format(date.to, Constent.DATE_FORMAT) : '',
                },
            }
        })
    }, [date, debounceSearchProjectId, debounceSearchClient, debounceSearchEmployeeName, debounceSearchProcess, debounceSearchBillingType])
    return (
        <div>
            <Card className="p-0 mb-[72px] mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/daily-work-log/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Daily Work Log</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3  mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-7 gap-3">
                        <Input type="text" onChange={(e) => setSearchProjectId(e.target.value)} value={searchProjectId} placeholder="Project Id" />
                        <Input type="text" onChange={(e) => setSearchClient(e.target.value)} value={searchClient} placeholder="Client" />
                        <Input
                            type="text"
                            onChange={(e) => setSearchEmployeeName(e.target.value)}
                            value={searchEmployeeName}
                            placeholder="Employee Name"
                        />
                        <Input type="text" onChange={(e) => setSearchProcess(e.target.value)} value={searchProcess} placeholder="Process" />
                        <Input
                            type="text"
                            onChange={(e) => setSearchBillingType(e.target.value)}
                            value={searchBillingType}
                            placeholder="Billing Type"
                        />
                        <div className={cn('grid gap-2')}>
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
                        </div>
                    </div>
                    <Datatable columns={DailyWorkLogColumns()} data={dailyWorkLogs} totalDataCount={totalCount} />
                </CardContent>
            </Card>
        </div>
    )
}

export default DailyWorkLog
