import CustomCheckbox from '@/Components/Common/CustomCheckbox'
import React from 'react'
let memoizedColumns = []
const LofBusinessColumn = () => {
  if (memoizedColumns.length > 0) {
    return memoizedColumns
}

memoizedColumns = [
    {
        accessorKey: 'sl',
        header: <CustomCheckbox />,
    },
    {
        accessorKey: 'lofBusiness',
        header: 'LOF Business',
    }
]
return memoizedColumns
}

export default LofBusinessColumn;