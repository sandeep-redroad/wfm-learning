import React from 'react'
import ProcessColumns from './ProcessColumn'

import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import { Button } from '@/Components/ui/button'
import CreateProcess from '../CreateProcess'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

const Process = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <div className="container mx-auto">
            <Card className="p-0 mb-[75px] mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Dialog>
                            <DialogTrigger className="">
                                <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Process</Button>
                            </DialogTrigger>
                            <CreateProcess />
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input type="text" onChange={handleSearch} placeholder="Process" />
                    </div>
                    <Datatable columns={ProcessColumns()} data={[]} totalDataCount={10} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Process
