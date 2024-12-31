import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { PaginationWithLinks } from './Pagination'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'
import Constent from '@/utils/constent'

const Datatable = ({ columns, data, totalDataCount, type }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)
    const pageSize = Constent.PAGINATION_SIZE
    const currentPage = parseInt(searchParams.get('page') || 1)
    const tbodyRef = useRef(null)
    const [isScrollable, setIsScrollable] = useState(false)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: pageSize,
    })

    useEffect(() => {
        const checkIfScrollable = () => {
            if (tbodyRef.current) {
                const isScrollable = tbodyRef.current.scrollHeight > tbodyRef.current.clientHeight
                setIsScrollable(isScrollable)
            }
        }
        checkIfScrollable()
        window.addEventListener('resize', checkIfScrollable)
        return () => {
            window.removeEventListener('resize', checkIfScrollable)
        }
    }, [])

    const handleRowClick = (rowId) => {
        navigate(`/projects/${rowId}`)
    }

    return (
        <div className="rounded-md">
            <table
                className="text-left w-full text-sm"
                style={{
                    borderCollapse: 'separate',
                    borderSpacing: '0 3px',
                    width: '100%',
                    tableLayout: 'fixed',
                }}
            >
                <thead className="bg-black flex w-full">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr className="flex w-full shadow-md border border-black px-1" style={{ width: isScrollable ? 'calc(100% - 17px)' : '100%' }}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <>
                                        {header.id == 'sl' ? (
                                            <th
                                                key={header.id}
                                                className=" flex justify-start items-center h-10 align-middle text-white font-medium text-justify px-3 w-20"
                                            >
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ) : (
                                            <th
                                                key={header.id}
                                                className="w-1/6 flex justify-start items-center h-10 align-middle text-white font-medium text-justify px-3"
                                            >
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        )}
                                    </>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody ref={tbodyRef} className={`flex flex-col  overflow-y-auto w-full`} style={{ height: 'calc(100vh - 22rem)' }}>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, pI) => (
                            <tr
                                className="flex w-full border-b my-2 shadow-md cursor-pointer px-1"
                                onClick={() => (DataTableEnumType.PROJECT == type ? handleRowClick(row.original.id) : false)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        className={`p-1 text-justify px-3 flex justify-start items-center ${
                                            cell.column.id === 'sl' ? 'w-20' : 'w-1/6'
                                        }`}
                                    >
                                        {DataTableEnumType.PROJECT == type ? (
                                            cell.column.id === 'sl' ? (
                                                <>{(currentPage - 1) * Constent.PAGINATION_SIZE + pI + 1}</>
                                            ) : cell.column.id === 'status' ? (
                                                <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                                            ) : (
                                                <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                                            )
                                        ) : cell.column.id === 'sl' ? (
                                            <>{(currentPage - 1) * Constent.PAGINATION_SIZE + pI + 1}</>
                                        ) : (
                                            <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr className="flex w-full justify-center mb-4">
                            <td className="p-4 w-1/4">No results.</td>
                        </tr>
                    )}
                    {/* {!isScrollable && (
                        <div className="flex justify-end items-end">
                            <PaginationWithLinks totalCount={totalDataCount} />
                        </div>
                    )} */}
                </tbody>
            </table>
            <div className="flex justify-end items-end">
                <PaginationWithLinks totalCount={totalDataCount} />
            </div>
        </div>
    )
}

export default Datatable
