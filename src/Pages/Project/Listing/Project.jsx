import React from 'react'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import ProjectColumns from './ProjectColumn'
import assets from '@/assets/assets'
import { Button } from '@/Components/ui/button'
import { Link } from 'react-router-dom'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'

const Project = () => {
    const handleSearch = (field, e) => {
        console.log('e : ',field , e)
    }
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Link className="button" to="/projects/new">
                    <Button className="bg-primary-purpal hover:bg-primary-purpal">
                        Add Project
                    </Button>
                </Link>
            </div>
            <div className="w-full my-2 grid grid-cols-5 gap-3 mt-5">
                <Input
                    type="text"
                    onChange={(e) => handleSearch('id', e)}
                    placeholder="ID"

                />
                <Input
                    type="text"
                    onChange={(e) => handleSearch('client', e)}
                    placeholder="Project Client"
                />
            </div>
            <Datatable
                columns={ProjectColumns()}
                data={assets.ProjectData}
                totalDataCount={10}
                type={DataTableEnumType.PROJECT}
            />
        </div>
    )
}

export default Project
