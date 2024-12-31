import React from 'react'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import ProjectColumns from './ProjectColumn'
import assets from '@/assets/assets'
import { Button } from '@/Components/ui/button'
import { Link } from 'react-router-dom'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'
import { Card, CardContent } from '@/components/ui/card'

const Project = () => {
    const handleSearch = (field, e) => {
        console.log('e : ', field, e)
    }
    return (
        <div>
            <Card className="p-0 mb-2 mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/projects/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Project</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-5 gap-3">
                        <Input type="text" onChange={(e) => handleSearch('id', e)} placeholder="ID" />
                        <Input type="text" onChange={(e) => handleSearch('client', e)} placeholder="Project Client" />
                    </div>
                    <Datatable columns={ProjectColumns()} data={assets.ProjectData} totalDataCount={10} type={DataTableEnumType.PROJECT} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Project
