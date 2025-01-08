let memoizedColumns = []
const ProjectColumns = () => {
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
            header: 'ID',
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
