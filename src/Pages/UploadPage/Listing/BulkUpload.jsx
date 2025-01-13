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
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/bulk-upload/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal"> Add Bulk Upload</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
                <Card className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                    <CardContent className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                        <div className="w-full my-2 grid grid-cols-4 gap-3 mb-3">
                            <Input type="text" onChange={(e) => handleSearch('id', e)} placeholder="ID" />
                        </div>
                        <Datatable columns={UploadColumns()} data={assets.UploadData} totalDataCount={10} type={DataTableEnumType.UPLOAD} />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default BulkUpload
