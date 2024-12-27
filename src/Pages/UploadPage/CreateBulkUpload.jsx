import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import UploadBox from '@/Components/UploadBox'
import { ExportExcel } from '@/utils/helper'
import DocumentTypeData from '@/assets/data/DocumentTypeData'
import DocumentTypeEnum from '@/Enums/DocumentTypeEnum'
import { toast } from 'react-toastify'
import { Card, CardContent } from '@/components/ui/card'

const CreateBulkUpload = () => {
    const [selectedDocumentType, setSelectedDocumentType] = useState('null')
    const [selectedProjectId, setSelectedProjectId] = useState('null')
    const handleDownloadTemplate = () => {
        //Column formate could be like this : [{ name: '', date: '', amount: '' }]
        switch (selectedDocumentType) {
            case DocumentTypeEnum.NOT_SELECTED:
                toast.info('Please select document type')
                break
            case DocumentTypeEnum.DAILY_WORK_LOG:
                const dailyWorkLogColumns = [{ NAME: '', DATE: '', AMOUNT: '' }]
                if(selectedProjectId == DocumentTypeEnum.NOT_SELECTED){
                    toast.info("Please select project")
                    return false;
                }
                ExportExcel(dailyWorkLogColumns, Date.now())
                break
            case DocumentTypeEnum.PROJECT:
                const projectColumns = []
                ExportExcel(projectColumns, Date.now())
                break
        }
    }
    
    return (

        
        <div className="container mx-auto">
         <Card className="p-0 mb-[75px] mx-0 rounded-none sticky top-16 w-full z-10">
                        <CardContent className="m-0 flex justify-end items-center p-3">
                            <div className="flex justify-end items-center">
                                <div className="flex items-center justify-end gap-2">
                                    <Link className="button" to="/bulk-upload">
                                        <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                                    </Link>
                                    
                                </div>
                            </div>
                        </CardContent>
                    </Card>
            {/* <div className="flex justify-end items-center mb-3">
                <div className="flex items-center justify-end gap-2">
                    <Link className="button" to="/bulk-upload">
                        <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                    </Link>
                </div>
            </div> */}
            <Card className="p-0 m-3 mt-[3rem]">
                            <CardContent className="m-0 p-3">
            <div>
                <div className="grid grid-cols-2 gap-3 items-end p-4 lg:ps-5">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Document Type
                        </span>
                        <Select className="w-full" onValueChange={(val) => setSelectedDocumentType(val)}>
                            <SelectTrigger className="w-full" showDropDownIcon={true}>
                                <SelectValue placeholder="--Document Type--" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="null" selected>
                                    --Document Type--
                                </SelectItem>
                                {DocumentTypeData.map((val) => (
                                    <SelectItem key={val.id} value={val.id}>
                                        {val.documentType}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {DocumentTypeEnum.DAILY_WORK_LOG === selectedDocumentType  && (
                        <div className="flex flex-col gap-2 w-full p-4 lg:ps-5">
                            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Project
                            </span>
                            <Select className="w-full" onValueChange={(val) => setSelectedProjectId(val)}>
                                <SelectTrigger className="w-full" showDropDownIcon={true}>
                                    <SelectValue placeholder="--Project--" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="null" selected>
                                        --Project--
                                    </SelectItem>
                                    {DocumentTypeData.map((val) => (
                                        <SelectItem key={val.id} value={val.id}>
                                            {val.documentType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <Button className="w-fit bg-primary-purpal hover:bg-primary-purpal" onClick={handleDownloadTemplate}>
                            Download Template
                        </Button>
                    </div>
                </div>
                <hr className="my-6" />
                <UploadBox />
            </div>
              </CardContent>
                        </Card>
        </div>
    )
}

export default CreateBulkUpload
