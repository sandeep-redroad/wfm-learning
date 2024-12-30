import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import Datatable from '@/Components/Common/Datatable'
import DailyWorkLogColumns from './DailyWorkLogColumns'
import { Card, CardContent } from '@/components/ui/card'

const DailyWorkLog = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <div className="container mx-auto">
            <Card className="p-0 mb-[72px] mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/daily-work-log/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Daily Work Log</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3  mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input type="text" onChange={handleSearch} placeholder="ID" />
                    </div>
                    <Datatable columns={DailyWorkLogColumns()} data={[]} totalDataCount={10} />
                </CardContent>
            </Card>
        </div>
    )
}

export default DailyWorkLog
