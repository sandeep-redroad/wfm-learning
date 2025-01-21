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

const Invoice = () => {
    const [invoices, setInvoices] = useState([])
    const [totalCount, setTotalCount] = useState(0)
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
    return (
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/invoices/new">
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
                    <CardContent className="m-0 p-3 overflow-y-auto">
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
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Invoice
