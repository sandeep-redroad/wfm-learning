import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import InvoiceColumns from './InvoiceColumn'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const Invoice = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <div>
            <Card className="p-0 mb-[72px] mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/invoices/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Generate Invoice</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input type="text" onChange={handleSearch} placeholder="ID" />
                    </div>
                    <Datatable columns={InvoiceColumns()} data={[]} totalDataCount={10} />
                </CardContent>
            </Card>
            {/* <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Invoice</h1>
                <Link className="button" to="/invoices/new">
                    <Button className="bg-primary-purpal hover:bg-primary-purpal">
                        Generate Invoice
                    </Button>
                </Link>
            </div>
            <div className="w-full my-2 grid grid-cols-4 mt-5">
                <Input type="text" onChange={handleSearch} placeholder="ID" />
            </div>
            <Datatable
                columns={InvoiceColumns()}
                data={[]}
                totalDataCount={10}
            /> */}
        </div>
    )
}

export default Invoice
