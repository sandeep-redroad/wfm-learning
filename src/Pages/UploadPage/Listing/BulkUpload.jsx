import Datatable from '@/Components/Common/Datatable'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import React from 'react'
import { Link } from 'react-router-dom'
import UploadColumns from './UploadColumn'
import assets from '@/assets/assets'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'

const BulkUpload = () => {
    const handleSearch = (field, e) => {
        console.log('e : ', field, e)
    }
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Bulk Uploads</h1>
                <Link className="button" to="/bulk-upload/new">
                    <Button className="bg-primary-purpal hover:bg-primary-purpal">
                        Add Bulk Upload
                    </Button>
                </Link>
            </div>
            <div className="w-full my-2 grid grid-cols-5 gap-3 mt-5">
                <Input
                    type="text"
                    onChange={(e) => handleSearch('id', e)}
                    placeholder="ID"
                />
            </div>
            <Datatable
                columns={UploadColumns()}
                data={assets.UploadData}
                totalDataCount={10}
                type={DataTableEnumType.UPLOAD}
            />
        </div>
    )
}

export default BulkUpload
