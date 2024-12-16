import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { MenuSquare } from 'lucide-react'
import { PaginationWithLinks } from '@/Components/Common/Pagination'
import { useLocation } from 'react-router-dom'

const BillingDataTable = ({ columns, data }) => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const page = parseInt(searchParams.get('page') || 1)
    const pageSize = parseInt(searchParams.get('pageSize') || 20)
    const pageSizeSelectOptions = {
        pageSizeSearchParam: 'pageSize',
        pageSizeOptions: [10, 20, 30, 40, 50],
    }
    const totalCount = data.length
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-gray-200">
                    <TableRow>
                        {columns.map((header) => {
                            return (
                                <TableHead key={header.accessorKey}>
                                    {header.header}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length ? (
                        data.map((row, i) => (
                            <TableRow key={row.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default BillingDataTable
