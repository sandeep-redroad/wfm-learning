
let memoizedColumns = []
const ClientAddressColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'sl',
            header: 'Sl',
        },
        {
            accessorKey: 'contactPerson',
            header: 'Contact Person',
        },
        {
            accessorKey: 'designation',
            header: 'Designation',
        },
        {
            accessorKey: 'client',
            header: 'Client',
        }
    ]
    return memoizedColumns
}

export default ClientAddressColumns;
