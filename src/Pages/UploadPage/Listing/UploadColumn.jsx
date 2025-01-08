let memoizedColumns = []
const UploadColumns = () => {
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
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'uploaded_count',
            header: 'Uploaded Count',
        },
        {
            accessorKey: 'failed_count',
            header: 'Failed Count',
        },
        {
            accessorKey: 'uploaded_at',
            header: 'Uploaded At',
        },
    ]
    return memoizedColumns
}

export default UploadColumns;
