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
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
// import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const DailyWorkLog = () => {
    const [date, setDate] = useState({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })
    const [dailyWorkLogs, setDailyWorkLogs] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [searchId, setSearchId] = useState('')
    const [searchClient, setSearchClient] = useState('')
    const [searchEmployeeId, setSearchEmployeeId] = useState('')
    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: {
            id: '',
            client: '',
            employeeId: '',
        },
    })
    const [debounce1] = useDebounce(searchId, Constent.DEBOUNCE_DELAY)
    const [debounce2] = useDebounce(searchClient, Constent.DEBOUNCE_DELAY)
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
    }, [queryParam.page, queryParam.search.id, queryParam.search.client, queryParam.search.employeeId])

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
                    <div className="w-full my-2 grid grid-cols-5 gap-3">
                        <Input type="text" onChange={(e) => console.log(e.target.value)} placeholder="Project Id" />
                        <Input type="text" onChange={(e) => console.log(e.target.value)} placeholder="Client" />
                        <Input type="text" onChange={(e) => console.log(e.target.value)} placeholder="Employee Name" />
                        <Input type="text" onChange={(e) => console.log(e.target.value)} placeholder="Process" />
                        <div className={cn('grid gap-2')}>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={'outline'}
                                        className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
                                    >
                                        <CalendarIcon />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                                </>
                                            ) : (
                                                format(date.from, 'LLL dd, y')
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
                                        numberOfMonths={2}
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
