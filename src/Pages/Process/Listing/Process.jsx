import React from 'react'
import ProcessColumns from './ProcessColumn'
import assets from '@/assets/assets'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Process</CardTitle>
                <div>
                    <Dialog>
                        <DialogTrigger className="">
                            <Button className="bg-primary-blue hover:bg-primary-blue-hover active:bg-primary-blue focus:bg-primary-blue">
                                Add Process
                            </Button>
                        </DialogTrigger>
                        <CreateProcess />
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="container mx-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Process"
                        />
                    </div>
                    <Datatable
                        columns={ProcessColumns}
                        data={[]}
                        totalDataCount={10}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Process
