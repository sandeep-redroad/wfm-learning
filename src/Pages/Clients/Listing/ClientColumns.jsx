
let memoizedColumns = []
const ClientColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'sl',
            header: 'Sr. No.',
        },
        {
            accessorKey: 'client',
            header: 'Client',
        }
    ]
    return memoizedColumns
}

export default ClientColumns;
