let memoizedColumns = []
const GenerateInvoiceColumn = () => {
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
            header: 'Project Id',
        },
        {
            accessorKey: 'client',
            header: 'Client',
        },
        {
            accessorKey: 'process',
            header: 'Process',
        },
        {
            accessorKey: 'billingType',
            header: 'Billing Type',
        }
    ]
    return memoizedColumns
}

export default GenerateInvoiceColumn;
