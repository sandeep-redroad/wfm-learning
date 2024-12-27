import React, { useEffect, useState } from 'react'
import assets from '@/assets/assets'
import BillingColumns from './BillingColumns'
import { Button } from '@/Components/ui/button'
import CreateBillingType from '../CreateBillingType'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import BillingTypeService from '@/Service/BillingTypeService'
import { useLocation } from 'react-router-dom'

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
        } catch (err) {
            console.log("err : ",err)
        }
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = parseInt(searchParams.get('page') || 1)
        getBillingTypes(page)
    }, [location.search])

    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Billing Types</h1>
                <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
                    <DialogTrigger className="">
                        <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Billing Type</Button>
                    </DialogTrigger>
                    <CreateBillingType getBillingTypes={getBillingTypes} setIsOpen={setIsOpen} />
                </Dialog>
            </div>
            <div className="w-full my-2 grid grid-cols-4 mt-5">
                <Input type="text" onChange={handleSearch} placeholder="Billing Type" />
            </div>
            <Datatable columns={BillingColumns()} data={billingTypes} totalDataCount={totalCount} />
        </div>
    )
}

export default Billing
