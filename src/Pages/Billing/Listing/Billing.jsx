import React from 'react'
import BillingDataTable from './BillingDataTable'
import assets from '@/assets/assets'
import BillingColumns from './Columns'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const Billing = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl'>Billing Types</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="container mx-auto">
                    <BillingDataTable
                        columns={BillingColumns}
                        data={assets.BillingData}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Billing
