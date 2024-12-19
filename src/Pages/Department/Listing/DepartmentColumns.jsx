let memoizedColumns = []
const DepartmentColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }

    memoizedColumns = [
        {
            accessorKey: 'sl',
            header: 'Sr. No.',
        },
        {
            accessorKey: 'department',
            header: 'Department',
        }
    ]
    return memoizedColumns
}

export default DepartmentColumns
