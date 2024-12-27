import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import Constent from '@/utils/constent'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'

const TestComp = ({ columns, data, totalDataCount, type }) => {
    const location = useLocation()
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
                        <tr className="flex w-full shadow-md border border-black px-1" style={{width : isScrollable ? "calc(100% - 17px)" : "100%"}}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <>
                                        {header.id == 'sl' ? (
                                            <th
                                                key={header.id}
                                                className="w-1/6 flex justify-start items-center h-10 align-middle text-white font-medium text-justify px-3"
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
                <tbody ref={tbodyRef} className={`flex flex-col  overflow-y-auto w-full`} style={{ height: '50vh' }}>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, pI) => (
                            <tr className="flex w-full border-b mb-2 shadow-md cursor-pointer px-1">
                                {row.getVisibleCells().map((cell) => (
                                    <td className="p-1 w-1/6 text-justify px-3 flex justify-start items-center">
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
                        <tr className="flex w-full mb-4">
                            <td className="p-4 w-1/4">No results.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    //     <Table
    //     style={{
    //         borderCollapse: 'separate',
    //         borderSpacing: '0 3px',
    //         width: '100%',
    //         tableLayout: 'fixed'
    //     }}
    // >
    //     <TableHeader className="bg-black hover:bg-black" >
    //         {table.getHeaderGroups().map((headerGroup) => (
    //             <TableRow key={headerGroup.id} className="shadow-md border border-black  " style={{display :"table", width:"100%"}}>
    //                 {headerGroup.headers.map((header) => {
    //                     return (
    //                         <>
    //                             {header.id == 'sl' ? (
    //                                 <TableHead key={header.id} className="text-white" style={{ width: '20px', whiteSpace: 'nowrap', display: 'table-cell' }} >
    //                                     {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
    //                                 </TableHead>
    //                             ) : (
    //                                 <TableHead key={header.id} className="text-white" style={{ display: 'table-cell' }} >
    //                                     {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
    //                                 </TableHead>
    //                             )}
    //                         </>
    //                     )
    //                 })}
    //             </TableRow>
    //         ))}
    //     </TableHeader>
    //     <TableBody
    //         style={{
    //             maxHeight: '47vh', // Set the height for the body
    //             overflowY: 'auto', // Enable vertical scrolling
    //             display: 'block', // Ensure it behaves like a block for scrolling
    //             width:"100%"
    //         }}
    //         className="overflow-auto"
    //     >
    //         {table.getRowModel().rows?.length ? (
    //             table.getRowModel().rows.map((row, pI) => (
    //                 <TableRow
    //                     key={row.id}
    //                     style={{ display: 'table', width: '100%' }}
    //                     className="border-b shadow-md cursor-pointer"
    //                     onClick={() => (DataTableEnumType.PROJECT == type ? handleRowClick(row.original.id) : false)}
    //                 >
    //                     {row.getVisibleCells().map((cell) => (
    //                         <TableCell key={cell.column.id} style={{ display: 'table-cell' }}>
    //                             {DataTableEnumType.PROJECT == type ? (
    //                                 cell.column.id === 'sl' ? (
    //                                     <>{(currentPage - 1) * Constent.PAGINATION_SIZE + pI + 1}</>
    //                                 ) : cell.column.id === 'status' ? (
    //                                     <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
    //                                 ) : (
    //                                     <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
    //                                 )
    //                             ) : cell.column.id === 'sl' ? (
    //                                 <>{(currentPage - 1) * Constent.PAGINATION_SIZE + pI + 1}</>
    //                             ) : (
    //                                 <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
    //                             )}
    //                         </TableCell>
    //                     ))}
    //                 </TableRow>
    //             ))
    //         ) : (
    //             <TableRow>
    //                 <TableCell colSpan={columns.length} className="h-24 text-center">
    //                     No results.
    //                 </TableCell>
    //             </TableRow>
    //         )}
    //     </TableBody>
    // </Table>
    )
}

export default TestComp
