import React, { useEffect, useState } from 'react'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'
import ClientColumns from './ClientColumns'
import assets from '@/assets/assets'
import { Input } from '@/Components/ui/input'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import ClientService from '@/Service/ClientService'

const Clients = () => {
    const [clients, setClients] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const location = useLocation()
    const getClient = async (page = 1) => {
        try {
            const resp = await ClientService.getClient({ page })
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setClients(resp.data.data)
            }
        } catch (err) {}
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = parseInt(searchParams.get('page') || 1)
        if (page === 0) {
            return false
        }
        getClient(page)
    }, [location.search])

    const handleSearch = (e) => {
        console.log('e : ', e)
    }

    return (
        <div className="">
            <Card className="p-0 mb-[72px] mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link to="/clients/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Client</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3">
                    <div className="w-full my-2 grid grid-cols-4 mt-5">
                        <Input type="text" onChange={handleSearch} placeholder="Client" />
                    </div>
                    <Datatable columns={ClientColumns()} data={clients} totalDataCount={totalCount} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Clients
