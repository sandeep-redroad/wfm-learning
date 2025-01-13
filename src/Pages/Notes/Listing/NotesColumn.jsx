
let memoizedColumns = []
const NoteColumns = () => {
    if (memoizedColumns.length > 0) {
        return memoizedColumns
    }
    memoizedColumns = [
        {
            accessorKey: 'sl',
            header: 'Sr. No.',
        },
        {
            accessorKey: 'title',
            header: 'Title',
        }
    ]
    return memoizedColumns
}

export default NoteColumns;
