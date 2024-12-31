import Datatable from '@/Components/Common/Datatable'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import React from 'react'
import { Link } from 'react-router-dom'
import UploadColumns from './UploadColumn'
import assets from '@/assets/assets'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'
import { Card, CardContent } from '@/components/ui/card'

const BulkUpload = () => {
    const handleSearch = (field, e) => {
        console.log('e : ', field, e)
    }
    return (
        <div className="">
            <Card className="p-0 mb-[72px] mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/bulk-upload/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal"> Add Bulk Upload</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input type="text" onChange={(e) => handleSearch('id', e)} placeholder="ID" />
                    </div>
                    <Datatable columns={UploadColumns()} data={assets.UploadData} totalDataCount={10} type={DataTableEnumType.UPLOAD} />
                </CardContent>
            </Card>
        </div>
    )
}

export default BulkUpload
