import React from 'react'
import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'
import ClientColumns from './ClientColumns'
import assets from '@/assets/assets'
import CreateClient from '../CreateClient'
import { Input } from '@/Components/ui/input'

const Clients = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Clients</h1>
                <Dialog>
                    <DialogTrigger className="">
                        <Button className="bg-primary-purpal hover:bg-primary-purpal">
                            Add Client
                        </Button>
                    </DialogTrigger>
                    <CreateClient />
                </Dialog>
            </div>
            <div className="w-full my-2 grid grid-cols-4 mt-5">
                <Input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Client"
                />
            </div>
            <Datatable
                columns={ClientColumns()}
                data={assets.ClientData}
                totalDataCount={100}
            />
        </div>
    )
}

export default Clients
