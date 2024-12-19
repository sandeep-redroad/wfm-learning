let memoizedColumns = []
const ProjectColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'client',
            header: 'Client',
        },
        {
            accessorKey: 'lob_process',
            header: 'LOB Process',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'department',
            header: 'Department',
        },
    ]
    return memoizedColumns
}

export default ProjectColumns;
