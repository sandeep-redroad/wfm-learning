import React from 'react'
import assets from '@/assets/assets'
import DepartmentColumns from './DepartmentColumns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import { Button } from '@/Components/ui/button'
import CreateDepartment from '../CreateDepartment'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'

const Departments = () => {
    const handleSearch = (e) => {
        console.log('e : ', e)
    }
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Department</CardTitle>
                <div>
                    <Dialog>
                        <DialogTrigger className="">
                            <Button className="bg-primary-blue hover:bg-primary-blue-hover active:bg-primary-blue focus:bg-primary-blue">
                                Add Department
                            </Button>
                        </DialogTrigger>
                        <CreateDepartment />
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="container mx-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Department"
                        />
                    </div>
                    <Datatable
                        columns={DepartmentColumns}
                        data={assets.DepartmentData}
                        totalDataCount={10}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Departments
