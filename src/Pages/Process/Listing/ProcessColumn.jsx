let memoizedColumns = []
const ProcessColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'sl',
            header: 'Sr. No.',
        },
        {
            accessorKey: 'Process',
            header: 'Process',
        }
    ]
    return memoizedColumns
}

export default ProcessColumns;
