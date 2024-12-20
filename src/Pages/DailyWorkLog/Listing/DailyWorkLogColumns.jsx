let memoizedColumns = []
const DailyWorkLogColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'project_id',
            header: 'Project Id',
        },
        {
            accessorKey: 'client',
            header: 'Client',
        },
        {
            accessorKey: 'employee_id',
            header: 'Employee Id',
        },
        {
            accessorKey: 'created_at',
            header: 'Date',
        }
    ]
    return memoizedColumns
}

export default DailyWorkLogColumns;
