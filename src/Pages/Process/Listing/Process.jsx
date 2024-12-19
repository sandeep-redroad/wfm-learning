import React from 'react'
import ProcessColumns from './ProcessColumn'
import assets from '@/assets/assets'
import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import { Button } from '@/Components/ui/button'
import CreateProcess from '../CreateProcess'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'

const Process = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Process</h1>
                <Dialog>
                    <DialogTrigger className="">
                        <Button className="bg-primary-purpal hover:bg-primary-purpal">
                            Add Process
                        </Button>
                    </DialogTrigger>
                    <CreateProcess />
                </Dialog>
            </div>
            <div className="w-full my-2 grid grid-cols-4 mt-5">
                <Input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Process"
                />
            </div>
            <Datatable columns={ProcessColumns()} data={[]} totalDataCount={10} />
        </div>
    )
}

export default Process
