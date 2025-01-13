import React, { useEffect, useState } from 'react'
import DepartmentColumns from './DepartmentColumns'
import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import { Button } from '@/Components/ui/button'
import CreateDepartment from '../CreateDepartment'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useLocation } from 'react-router-dom'
import DepartmentService from '@/Service/DepartmentService'
import { useDebounce } from 'use-debounce'
import Constent from '@/utils/constent'
import { toast } from 'react-toastify'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const Departments = () => {
    const [department, setDepartment] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [search, setSearch] = useState('')
    const [allcheck, setAllcheck] = useState(false)
    const [deleteId, setDeleteId] = useState([])
    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: '',
    })
    const [debouncedValue] = useDebounce(search, Constent.DEBOUNCE_DELAY)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const getDepartment = async () => {
        try {
            const resp = await DepartmentService.getDepartment(queryParam)
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setDepartment(resp.data.data)
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
        getDepartment()
    }, [queryParam.page, queryParam.search])

    useEffect(() => {
        setQueryParam((prev) => {
            return {
                ...prev,
                search: debouncedValue,
            }
        })
    }, [debouncedValue])

    const deleteDepartment = async () => {
        const updatedArray = department.filter((value, index) => {
            console.log('in filter', index, !deleteId.includes(value._id))
            return !deleteId.includes(value._id)
        })
        try {
            const resp = await DepartmentService.deleteDepartment(deleteId)
            console.log('response', resp)
            if (resp.data.success) {
                toast.success(resp.data.message)
                getDepartment()
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
                        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
                            <DialogTrigger>
                                <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Department</Button>
                            </DialogTrigger>
                            <CreateDepartment getDepartment={getDepartment} setIsOpen={setIsOpen} />
                        </Dialog>

                        <DropdownMenu className="ml-[10px] ">
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={`ml-[10px] ${deleteId.length > 0 ? 'block' : 'hidden'}`}>
                                    Action
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={deleteDepartment}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
            <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
                <Card className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                    <CardContent className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                        <div className="w-full my-2 grid grid-cols-4">
                            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Department" />
                        </div>
                        <Datatable
                            columns={DepartmentColumns()}
                            data={department}
                            totalDataCount={totalCount}
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

export default Departments
