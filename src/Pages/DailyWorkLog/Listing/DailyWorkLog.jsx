import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import Datatable from '@/Components/Common/Datatable'
import DailyWorkLogColumns from './DailyWorkLogColumns'

const DailyWorkLog = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Daily Work Log</h1>
                <Link className="button" to="/daily-work-log/new">
                    <Button className="bg-primary-purpal hover:bg-primary-purpal">
                        Add Daily Work Log
                    </Button>
                </Link>
            </div>
            <div className="w-full my-2 grid grid-cols-4 mt-5">
                <Input type="text" onChange={handleSearch} placeholder="ID" />
            </div>
            <Datatable
                columns={DailyWorkLogColumns()}
                data={[]}
                totalDataCount={10}
            />
        </div>
    )
}

export default DailyWorkLog
