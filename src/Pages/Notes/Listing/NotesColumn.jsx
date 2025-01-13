
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
            accessorKey: 'noteName',
            header: 'Note Name',
        }
    ]
    return memoizedColumns
}

export default NoteColumns;
