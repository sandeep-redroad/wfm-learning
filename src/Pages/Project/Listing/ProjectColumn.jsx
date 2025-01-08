let memoizedColumns = []
const ProjectColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'id',
            header: 'Project Id',
        },
        {
            accessorKey: 'client',
            header: 'Client',
        },
        {
            accessorKey: 'lofBusiness',
            header: 'LOF Business',
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
