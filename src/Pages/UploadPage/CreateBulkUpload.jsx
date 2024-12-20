import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { FormLabel } from '@/Components/ui/form'
import UploadBox from '@/Components/UploadBox'

const CreateBulkUpload = () => {
    return (
        <div className="container mx-auto">
            <div className="flex justify-end items-center mb-3">
                <div className="flex items-center justify-end gap-2">
                    <Link className="button" to="/bulk-upload">
                        <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">
                            Back
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                <div className='grid grid-cols-2 gap-3 items-end'>
                    <div className='flex flex-col gap-2 w-full'>
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Document Type
                        </span>
                        <Select className="w-full">
                            <SelectTrigger
                                className="w-full"
                                showDropDownIcon={true}
                            >
                                <SelectValue placeholder="Document Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Button className="w-fit">Download Template</Button>
                    </div>
                </div>
                <hr className='my-6' />
                <UploadBox />
            </div>
        </div>
    )
}

export default CreateBulkUpload
