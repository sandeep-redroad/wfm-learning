
let memoizedColumns = []
const BillingEntityColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'sl',
            header: 'Sr. No.',
        },
        {
            accessorKey: 'billingEntity',
            header: 'Billing Entity',
        }
    ]
    return memoizedColumns
}

export default BillingEntityColumns;
