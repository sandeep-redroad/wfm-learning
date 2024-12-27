import React from 'react'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'
import ClientColumns from './ClientColumns'
import assets from '@/assets/assets'
import { Input } from '@/Components/ui/input'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

const Clients = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }

    return (
        <div className="">
            <Card className="p-0 mb-[75px] mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link to="/clients/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Client</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-4 mt-5">
                        <Input type="text" onChange={handleSearch} placeholder="Client" />
                    </div>
                    <Datatable columns={ClientColumns()} data={assets.ClientData} totalDataCount={100} />
                </CardContent>
            </Card>
            {/* <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Clients</h1>
                <Link to="/clients/new">
                    <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Client</Button>
                </Link>
            </div>
            <div className="w-full my-2 grid grid-cols-4 mt-5">
                <Input type="text" onChange={handleSearch} placeholder="Client" />
            </div>
            <Datatable columns={ClientColumns()} data={assets.ClientData} totalDataCount={100} /> */}
        </div>
    )
}

export default Clients
