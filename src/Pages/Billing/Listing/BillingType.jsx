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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'

const Billing = () => {
    const [billingTypes, setBillingTypes] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const getBillingTypes = async (page = 1) => {
        try {
            const resp = await BillingTypeService.getBillingType({ page })
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setBillingTypes(resp.data.data)
            }
        } catch (err) {}
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = parseInt(searchParams.get('page') || 1)
        if (page == 0) {
            return false
        }
        getBillingTypes(page)
    }, [location.search])

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
                        <Input type="text" onChange={handleSearch} placeholder="Billing Type" />
                    </div>
                    <Datatable columns={BillingColumns()} data={billingTypes} totalDataCount={totalCount} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Billing
