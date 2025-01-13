import React, { useEffect, useState } from 'react'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'
import ClientAddressColumns from './ClientAddressColumn'
import assets from '@/assets/assets'
import { Input } from '@/Components/ui/input'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import ClientAddressService from '@/Service/ClientAddressService'
import { useDebounce } from 'use-debounce'
import Constent from '@/utils/constent'
import { toast } from 'react-toastify'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'

const ClientAddress = () => {
    const [clientAddress, setClientAddress] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [search, setSearch] = useState('')
    const [debouncedValue] = useDebounce(search, Constent.DEBOUNCE_DELAY)
    const [allcheck, setAllcheck] = useState(false)
    const [deleteId, setDeleteId] = useState([])
    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: '',
    })
    const location = useLocation()
    const getClientAddress = async (page = 1) => {
        try {
            const resp = await ClientAddressService.getClientAddresses(queryParam)
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setClientAddress(resp.data.data)
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
        getClientAddress()
    }, [queryParam.page, queryParam.search])

    const deleteClientAddress = async () => {
        const updatedArray = clients.filter((value, index) => {
            console.log('in filter', index, !deleteId.includes(value._id))
            return !deleteId.includes(value._id)
        })
        try {
            const resp = await ClientAddressService.deleteClientAddress(deleteId)
            console.log('response', resp)
            if (resp.data.success) {
                toast.success(resp.data.message)
                getClientAddress()
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
                        <Link to="/master-settings/client-address/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Client Address</Button>
                        </Link>

                        <DropdownMenu className="ml-[10px] ">
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={`ml-[10px] ${deleteId.length > 0 ? 'block' : 'hidden'}`}>
                                    Action
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={deleteClientAddress}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
            <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
                <Card className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                    <CardContent className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                        <div className="w-full my-2 grid grid-cols-4 gap-3 mb-3">
                            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name" />
                            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Designation" />
                            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Client" />
                        </div>
                        <Datatable
                            columns={ClientAddressColumns()}
                            data={clientAddress}
                            totalDataCount={totalCount}
                            allcheck={allcheck}
                            deleteId={deleteId}
                            setDeleteId={setDeleteId}
                            type={DataTableEnumType.CLIENT_ADDRESS}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default ClientAddress
