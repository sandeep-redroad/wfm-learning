import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { PaginationWithLinks } from './Pagination'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'
import { Badge } from '../ui/badge'

const Datatable = ({ columns, data, totalDataCount, type }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)
    const pageSize = parseInt(searchParams.get('pageSize') || 10)
    const [pageSerialStart, setPageSerialStart] = useState(1)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: pageSize,
    })

    const handleRowClick = (rowId) => {
        navigate(`/project/${rowId}`);
      };

    
    return (
        <div className="rounded-md">
            <Table
                style={{
                    borderCollapse: 'separate',
                    borderSpacing: '0 3px',
                }}
            >
                <TableHeader className="bg-black hover:bg-black">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="shadow-md border border-black "
                        >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <>
                                        {header.id == 'sl' ? (
                                            <TableHead
                                                key={header.id}
                                                className="text-white"
                                                style={{width : "20px", whiteSpace: "nowrap"}}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        ) : (
                                            <TableHead
                                                key={header.id}
                                                className="text-white"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        )}
                                    </>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, pI) => (
                            <TableRow
                                key={row.id}
                                className="border-b shadow-md cursor-pointer"
                                onClick={() => DataTableEnumType.PROJECT == type ? handleRowClick(row.original.id) : false}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.column.id}>
                                        {DataTableEnumType.PROJECT == type ? (
                                            cell.column.id === 'sl' ? (
                                                <>{pageSerialStart + pI}</>
                                            ) : cell.column.id === 'status' ? (
                                                <>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </>
                                            )
                                        ) : cell.column.id === 'sl' ? (
                                            <>{pageSerialStart + pI}</>
                                        ) : (
                                            <>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </>
                                        )}
                                    </TableCell>
                                ))}
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
            <div className="flex justify-end items-end">
                <PaginationWithLinks totalCount={totalDataCount} />
            </div>
        </div>
    )
}

export default Datatable
