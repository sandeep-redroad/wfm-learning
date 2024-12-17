import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'
import ClientColumns from './ClientColumns'
import assets from '@/assets/assets'
import CreateClient from '../CreateClient'
import { Input } from '@/Components/ui/input'

const Clients = () => {

    const handleSearch = (e) =>{
        console.log("e : ",e);
    }
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Clients</CardTitle>
                <div>
                    <Dialog>
                        <DialogTrigger className="">
                            <Button className="bg-primary-blue hover:bg-primary-blue-hover active:bg-primary-blue focus:bg-primary-blue">
                                Add Client
                            </Button>
                        </DialogTrigger>
                        <CreateClient />
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="container mx-auto">
                    <div className='w-full my-2 grid grid-cols-4'>
                        <Input type="text" onChange={handleSearch} placeholder="Client" />
                    </div>
                    <Datatable
                        columns={ClientColumns}
                        data={assets.ClientData}
                        totalDataCount={100}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Clients
