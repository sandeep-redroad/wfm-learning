let memoizedColumns = []
const DailyWorkLogColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'sl',
            header: 'Sr. No.',
        },
        {
            accessorKey: 'id',
            header: 'Id',
        },
        {
            accessorKey: 'projectId',
            header: 'Project Id',
        },
        {
            accessorKey: 'project.client',
            header: 'Client',
        },
        {
            accessorKey: 'employeeName',
            header: 'Employee Name',
        },
        {
            accessorKey: 'project.process',
            header: 'Process',
        },
        {
            accessorKey: 'project.billingType',
            header: 'Billing Type',
        },
        {
            accessorKey: 'date',
            header: 'Date',
        }
    ]
    return memoizedColumns
}

export default DailyWorkLogColumns;
