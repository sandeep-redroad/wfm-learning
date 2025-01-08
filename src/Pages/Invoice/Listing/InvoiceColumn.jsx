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
            header: 'ID',
        },
        {
            accessorKey: 'project_id',
            header: 'Project Id',
        },
        {
            accessorKey: 'lob_process',
            header: 'LOB Process',
        },
        {
            accessorKey: 'total_amount',
            header: 'Total Amount',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'amount_paid',
            header: 'Amount Paid',
        },
    ]
    return memoizedColumns
}

export default InvoiceColumns;
