let memoizedColumns = []
const BillingColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'sl',
            header: 'Sr. No.',
        },
        {
            accessorKey: 'billingType',
            header: 'Billing Type',
        }
    ]
    return memoizedColumns
}

export default BillingColumns
