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
            accessorKey: 'process',
            header: 'Process',
        },
        {
            accessorKey: 'abbreviation',
            header: 'Abbreviation',
        }
    ]
    return memoizedColumns
}

export default ProcessColumns;
