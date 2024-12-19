import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
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
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-gray-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, pI) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell, cI) => {
                                    return DataTableEnumType.PROJECT == type ? (
                                        <>
                                            {cell.column.id == 'sl' ? (
                                                <TableCell key={cell.column.id}>
                                                    {pageSerialStart + pI}
                                                </TableCell>
                                            ) : cell.column.id == 'status' ? (
                                                <TableCell key={cell.column.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ) : (
                                                <TableCell key={cell.column.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {cell.column.id == 'sl' ? (
                                                <TableCell key={cell.column.id}>
                                                    {pageSerialStart + pI}
                                                </TableCell>
                                            ) : (
                                                <TableCell key={cell.column.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            )}
                                        </>
                                    )
                                })}
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
