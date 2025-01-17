import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import InvoiceColumns from './InvoiceColumn'
import { Card, CardContent } from '@/components/ui/card'

const Invoice = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/invoices/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Invoice</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
                <Card className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                    <CardContent className="m-0 p-3 overflow-y-auto">
                        <div className="w-full my-2 grid grid-cols-4 gap-3 mb-3">
                            <Input type="text" onChange={handleSearch} placeholder="ID" />
                        </div>
                        <Datatable columns={InvoiceColumns()} data={[]} totalDataCount={10} />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Invoice
