import React from 'react'
let memoizedColumns = []
const ShiftRequestColumn = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'sl',
            header: 'Sr. No.',
        },
        {
            accessorKey: 'name',
            header: 'Id',
        },
        {
            accessorKey: 'shift_type',
            header: 'Shift Type',
        },
        {
            accessorKey: 'employee',
            header: 'Employee',
        },
        {
            accessorKey: 'employee_name',
            header: 'Employee Name',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'from_date',
            header: 'From Date',
        },
        {
            accessorKey: 'to_date',
            header: 'To Date',
        },
    ]
    return memoizedColumns
}

export default ShiftRequestColumn