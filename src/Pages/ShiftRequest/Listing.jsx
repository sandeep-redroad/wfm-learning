
import ShiftRequestColumn from './ShiftRequestColumn'
import AuthService from '@/Service/AuthService'
import React, { useEffect, useState } from 'react'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'

import assets from '@/assets/assets'
import { Input } from '@/Components/ui/input'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import ClientService from '@/Service/ClientService'
import { useDebounce } from 'use-debounce'
import Constent from '@/utils/constent'
import { toast } from 'react-toastify'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'

import { Dialog, DialogTrigger } from '@/Components/ui/dialog'


const Listing = () => {
    const [shift, setShift] = useState([])
    const [deleteId, setDeleteId] = useState([])
    const [totalCount, setTotalCount] = useState(20)
      const location = useLocation()
      const [search, setSearch] = useState('')
       const [allcheck, setAllcheck] = useState(false)
    const [debouncedValue] = useDebounce(search, Constent.DEBOUNCE_DELAY)
        const [queryParam, setQueryParam] = useState({
            page: 1,
            search: '',
        })
    const getShift = async () => {
        try {
            const resp = await AuthService.getShiftRequest(queryParam)
            if (resp.data.success) {
                // setTotalCount(resp.data.pagination.totalRecords)
                setShift(resp.data.data)
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
            setQueryParam((prev) => {
                return {
                    ...prev,
                    search: debouncedValue,
                }
            })
        }, [debouncedValue])
    
        useEffect(() => {
            getShift()
        }, [queryParam.page, queryParam.search])


        const deleteRequest = async () => {
                   try {
                        const resp = await AuthService.deleteRequest(deleteId)
                        console.log('response', resp)
                        if (resp.data.success) {
                            toast.success(resp.data.message)
                             getShift()
                        }
                    } catch (err) {
                        console.log('error', err)
                    }
                }
    return (
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/newshiftRequest">
                            <Button className="bg-primary-red hover:bg-primary-red">Add Shift Request</Button>
                        </Link>
                        <DropdownMenu className="ml-[10px] ">
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={`ml-[10px] ${deleteId.length > 0 ? 'block' : 'hidden'}`}>
                                    Action
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={deleteRequest}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
            <div className="p-3  mt-[63px] w-full" style={{ height: 'calc(100vh - 125px)' }}>
                <Card className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                    <CardContent className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                        {/* <div className="w-full my-2 grid grid-cols-5 gap-3 mb-3">
                            <Input type="text" onChange={(e) => setSearchId(e.target.value)} placeholder="ID" />
                            <Input type="text" onChange={(e) => setSearchClient(e.target.value)} placeholder="Project Client" />
                        </div> */}

                        <Datatable
                            columns={ShiftRequestColumn()}
                            data={shift}
                            totalDataCount={totalCount}
                            type={DataTableEnumType.SHIFT_REQUEST}
                            allcheck={allcheck}
                            deleteId={deleteId}
                            setDeleteId={setDeleteId}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Listing
