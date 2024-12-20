import React, { useRef, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { X } from 'lucide-react'

const UploadBox = () => {
    const [uploadedData, setUploadedData] = useState('')
    const fileInput = useRef()
    const handleUploads = (e) => {
        const file = e.target.files[0]
        if (file) {
            setUploadedData(file.name)
        }
    }

    const handleDeleteSelected = () => {
        if (fileInput.current) {
            fileInput.current.value = ''
            setUploadedData('')
        }
    }

    // Handle drag events
    const handleDragOver = (event) => {
        event.preventDefault() // Prevent default behavior to allow drop
        event.stopPropagation()
    }

    const handleDragEnter = (event) => {
        event.preventDefault()
        event.stopPropagation()
    }

    const handleDrop = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const file = event.dataTransfer.files[0]
        if (file) {
            setUploadedData(file.name);
        }
    }

    return (
        <div
            className="border border-dashed rounded-md p-4 flex justify-center items-center flex-col cursor-pointer"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
        >
            <Input
                ref={fileInput}
                type="file"
                className="hidden"
                onChange={handleUploads}
                id="upload-data"
            />
            <Label
                htmlFor="upload-data"
                className="flex justify-center flex-col items-center"
            >
                <h4 className="mb-3 font-normal">
                    Drag and drop files here or upload from
                </h4>
                <div className="flex justify-center flex-col items-center cursor-pointer">
                    <svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx={15}
                            cy={15}
                            r={15}
                            fill="url(#paint0_linear)"
                        />
                        <path
                            d="M13.5 22V19"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.5 22V19"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10.5 22H19.5"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.5 16H22.5"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21 8H9C8.17157 8 7.5 8.67157 7.5 9.5V17.5C7.5 18.3284 8.17157 19 9 19H21C21.8284 19 22.5 18.3284 22.5 17.5V9.5C22.5 8.67157 21.8284 8 21 8Z"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear"
                                x1={0}
                                y1={0}
                                x2={0}
                                y2={30}
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#2C9AF1" />
                                <stop offset={1} stopColor="#2490EF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <h4 className="mt-3 font-normal">My Device</h4>
                </div>
            </Label>
            {uploadedData !== '' && (
                <Label class="mt-4 flex border border-gray-400 bg-gray-200 rounded-md items-center justify-center">
                    <span className="border-r border-r-gray-400 p-1">
                        {uploadedData}
                    </span>
                    <X
                        className="w-5 cursor-pointer p-1"
                        onClick={handleDeleteSelected}
                    />
                </Label>
            )}
        </div>
    )
}

export default UploadBox
