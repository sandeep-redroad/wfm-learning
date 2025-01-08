import React, { useEffect, useState } from 'react'
import ProcessColumns from './ProcessColumn'

import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import { Button } from '@/Components/ui/button'
import CreateProcess from '../CreateProcess'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useLocation } from 'react-router-dom'
import ProcessService from '@/Service/ProcessService'
import { useDebounce } from 'use-debounce'
import Constent from '@/utils/constent'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'react-toastify'

const Process = () => {
    const [process, setProcess] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const [search, setSearch] = useState('')
    const [debouncedValue] = useDebounce(search, Constent.DEBOUNCE_DELAY)

    const [allcheck, setAllcheck] = useState(false)
    const [deleteId, setDeleteId] = useState([])

    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: '',
    })
    const getProcess = async () => {
        try {
            const resp = await ProcessService.getProcess(queryParam)
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setProcess(resp.data.data)
            }
        } catch (err) {}
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = parseInt(searchParams.get('page') || 1)
        if (page == 0) {
            return false
        }
        getProcess(page)
    }, [location.search])

    useEffect(() => {
        getProcess()
    }, [queryParam.page, queryParam.search])

    useEffect(() => {
        setQueryParam((prev) => {
            return {
                ...prev,
                search: debouncedValue,
            }
        })
    }, [debouncedValue])

    const deleteProcess = async () => {
     try {
            const resp = await ProcessService.deleteProcess(deleteId)
            console.log('response', resp)
            if (resp.data.success) {
                toast.success(resp.data.message)
                getProcess()
            }
        } catch (err) {
            console.log('error', err)
        }
    }
    const handleSearch = (e) => {
        console.log('e : ', e)
    }

    return (
        <div>
            <Card className="p-0 mb-[72px] mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
                            <DialogTrigger>
                                <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Process</Button>
                            </DialogTrigger>
                            <DialogTrigger></DialogTrigger>
                            <CreateProcess getProcess={getProcess} setIsOpen={setIsOpen} />
                        </Dialog>
                        <DropdownMenu className="ml-[10px] ">
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={`ml-[10px] ${deleteId.length > 0 ? 'block' : 'hidden'}`}>
                                    Action
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={deleteProcess}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Process" />
                    </div>
                    <Datatable
                        columns={ProcessColumns()}
                        data={process}
                        totalDataCount={totalCount}
                        allcheck={allcheck}
                        deleteId={deleteId}
                        setDeleteId={setDeleteId}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default Process
