import React from 'react'
let memoizedColumns = []
const LofBuisnessColumn = () => {
  if (memoizedColumns.length > 0) {
    return memoizedColumns
}

memoizedColumns = [
    {
        accessorKey: 'sl',
        header: 'Sr. No.',
    },
    {
        accessorKey: 'lofbuisness',
        header: 'LofBuisness',
    }
]
return memoizedColumns
}

export default LofBuisnessColumn;