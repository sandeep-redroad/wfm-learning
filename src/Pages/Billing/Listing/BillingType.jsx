import React, { useEffect, useState } from 'react'
import assets from '@/assets/assets'
import BillingColumns from './BillingTypeColumns'
import { Button } from '@/Components/ui/button'
import CreateBillingType from '../CreateBillingType'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import BillingTypeService from '@/Service/BillingTypeService'
import { useLocation } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import Constent from '@/utils/constent'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'

const Billing = () => {
    const [billingTypes, setBillingTypes] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [debouncedValue] = useDebounce(search, Constent.DEBOUNCE_DELAY)
    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: '',
    })
    const location = useLocation()
    const getBillingTypes = async () => {
        try {
            console.log('queryParam : ', queryParam)
            const resp = await BillingTypeService.getBillingType(queryParam)
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setBillingTypes(resp.data.data)
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
        getBillingTypes()
    }, [queryParam.page, queryParam.search])

    useEffect(() => {
        setQueryParam((prev) => {
            return {
                ...prev,
                search: debouncedValue,
            }
        })
    }, [debouncedValue])

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
                                <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Billing Type</Button>
                            </DialogTrigger>
                            <CreateBillingType getBillingTypes={getBillingTypes} setIsOpen={setIsOpen} />
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Billing Type" />
                    </div>
                    <Datatable columns={BillingColumns()} data={billingTypes} totalDataCount={totalCount} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Billing
