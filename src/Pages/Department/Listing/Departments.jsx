import React from 'react'
import assets from '@/assets/assets'
import DepartmentColumns from './DepartmentColumns'
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
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Departments</h1>
                <Dialog>
                    <DialogTrigger className="">
                        <Button className="bg-primary-purpal hover:bg-primary-purpal">
                            Add Department
                        </Button>
                    </DialogTrigger>
                    <CreateDepartment />
                </Dialog>
            </div>
            <div className="w-full my-2 grid grid-cols-4 mt-5">
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
    )
}

export default Departments
