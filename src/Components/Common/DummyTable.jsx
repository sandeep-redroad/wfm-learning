import React from 'react'

const DummyTable = () => {
    const headers = [
        'Name',
        'Email',
        'Phone',
        'Address',
        'City',
        'Country',
        'Status',
        'Status',
        'Status',
        'Status',
        'Status',
        'Status',
        'Status',
        'Status',
    ]
    const data = Array(20)
        .fill(null)
        .map((_, index) => ({
            name: `User ${index + 1}`,
            email: `user${index + 1}@example.com`,
            phone: `+1 234 567 ${index.toString().padStart(4, '0')}`,
            address: `${index + 100} Main Street`,
            city: `City ${index + 1}`,
            country: `Country ${index + 1}`,
            status: index % 2 === 0 ? 'Active' : 'Inactive',
        }))

    return (
        <div style={{ width: "calc(100vw - 370px)" }}>
            <div className="relative w-full h-96 border rounded-lg shadow-sm">
                <div className="overflow-auto max-h-[calc(100%-57px)]">
                    <div className="flex min-w-max bg-gray-100 border-b" style={{position:"sticky", top:"0px"}}>
                        {headers.map((header, index) => (
                            <div key={index} className="p-4 w-48 font-medium text-gray-700 border-r last:border-r-0">
                                {header}
                            </div>
                        ))}
                    </div>
                    <div className="min-w-max">
                        {data.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex border-b last:border-b-0 hover:bg-gray-50">
                                <div className="p-4 w-48 border-r">{row.name}</div>
                                <div className="p-4 w-48 border-r">{row.email}</div>
                                <div className="p-4 w-48 border-r">{row.phone}</div>
                                <div className="p-4 w-48 border-r">{row.address}</div>
                                <div className="p-4 w-48 border-r">{row.city}</div>
                                <div className="p-4 w-48 border-r">{row.country}</div>
                                <div className="p-4 w-48 border-r last:border-r-0">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm ${
                                            row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {row.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DummyTable
