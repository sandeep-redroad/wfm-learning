import React from 'react'
import DepartmentDataTable from './DepartmentDataTable'
import assets from '@/assets/assets'
import DepartmentColumns from './Columns'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const Departments = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl'>Department</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="container mx-auto">
                    <DepartmentDataTable
                        columns={DepartmentColumns}
                        data={assets.DepartmentData}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Departments
