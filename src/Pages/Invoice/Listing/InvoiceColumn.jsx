let memoizedColumns = []
const InvoiceColumns = () => {
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
            header: 'Invoie Id',
        },
        {
            accessorKey: 'projectId',
            header: 'Project Id',
        },
        {
            accessorKey: 'client',
            header: 'Client',
        },
        {
            accessorKey: 'billingType',
            header: 'Billing Type',
        },
        {
            accessorKey: 'paymentStatus',
            header: 'Status',
        },
        {
            accessorKey: 'invoiceDate',
            header: 'Date',
        },
    ]
    return memoizedColumns
}

export default InvoiceColumns;
