import React from 'react'
import assets from '@/assets/assets'
import BillingColumns from './BillingColumns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/Components/ui/button'
import CreateBillingType from '../CreateBillingType'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'

const Billing = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Billing Types</CardTitle>
                <div>
                    <Dialog>
                        <DialogTrigger className="">
                            <Button className="bg-primary-blue hover:bg-primary-blue-hover active:bg-primary-blue focus:bg-primary-blue">
                                Add Billing Type
                            </Button>
                        </DialogTrigger>
                        <CreateBillingType />
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="container mx-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Billing Type"
                        />
                    </div>
                    <Datatable
                        columns={BillingColumns}
                        data={assets.BillingData}
                        totalDataCount={10}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Billing
