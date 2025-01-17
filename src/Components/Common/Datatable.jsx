import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { PaginationWithLinks } from './Pagination'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'
import Constent from '@/utils/constent'
import { format } from 'date-fns'
import { Checkbox } from '../ui/checkbox'

const Datatable = ({ columns, data, totalDataCount, type, allcheck, setDeleteId, deleteId }) => {
    const checkboxRef = useRef(null)
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

    const handleRedirect = (row) => {
        if (DataTableEnumType.PROJECT == type) {
            navigate(`/projects/${row.id}`)
        }
        if (DataTableEnumType.CLIENT == type) {
            navigate(`/clients/${row.client}`)
        }
        if (DataTableEnumType.DAILY_WORK_LOG == type) {
            navigate(`/daily-work-log/${row.id}`)
        }
        if (DataTableEnumType.BILLING_ENTITY == type) {
            navigate(`/master-settings/billing-entity/${row.billingEntity}`)
        }
        if (DataTableEnumType.CLIENT_ADDRESS == type) {
            navigate(`/master-settings/client-address/${row.contactPerson}`)
        }
        if (DataTableEnumType.NOTE == type) {
            navigate(`/master-settings/notes/${row.title}`)
        }
    }

    const handleCheckboxChange = (event, row) => {
        if (event) {
            console.log('in event', event)
            if (!deleteId?.includes(row._id)) {
                setDeleteId((prevDeleteId) => [...prevDeleteId, row._id])
            }
        } else {
            console.log('in else', event)
            if (deleteId?.includes(row._id)) {
                // If the ID is already in the deleteId array, pop it
                setDeleteId((prevDeleteId) => prevDeleteId.filter((item) => item !== row._id))
            }
        }
        console.log('in one check', deleteId)
    }

    const handleCheckboxClick = (event) => {
        event.stopPropagation()
    }
    const handleAllChange = (event, rows) => {
        console.log('in handleAll change', rows)
        if (event) {
            rows.map((row, index) => {
                if (!deleteId.includes(row.original._id)) {
                    setDeleteId((prevDeleteId) => [...prevDeleteId, row.original._id])
                }
            })
        } else {
            setDeleteId([])
        }
        console.log('in one check', deleteId)
        // if(event){
        //     for(let i=0;i<id;i++){
        //         rowsDelete.push(i)
        //     }
        //    getRowsToDelete(rowsDelete)
        // }
        // console.log(event)
        // onAllCheckboxChange(event)
    }

    return (
        <div className="gap-y-[1.75rem] border rounded-md pb-2">
            <div
                className='overflow-card-scroll'
                style={{
                    maxHeight: "calc(100vh - 350px)",
                    overflow: 'auto',
                    marginBottom: '2px',
                }}
            >
                <div className="relative w-full rounded-lg">
                    <div>
                        <div className="flex min-w-max bg-gray-100 border-b" style={{ position: 'sticky', top: '0px', width: '100%' }}>
                            {table.getHeaderGroups().map((headerGroup) =>
                                headerGroup.headers.map((header) => {
                                    return header.id == 'sl' ? (
                                        <div key={header.id} className="p-1 py-2 w-20 font-medium text-gray-700 ">
                                            {/* add this in above div if you want to add cell right border  border-r last:border-r-0 */}
                                            <Checkbox
                                                className="mx-3 my-1"
                                                onCheckedChange={(event) => handleAllChange(event, table.getRowModel().rows)}
                                            />
                                        </div>
                                    ) : (
                                        <div key={header.id} className="p-1 flex-1 py-2 font-medium text-gray-700">
                                            {/* add this in above div if you want to add cell right border  border-r last:border-r-0 */}
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </div>
                                    )
                                })
                            )}
                        </div>
                        <div className={`min-w-max ${table.getRowModel().rows?.length === 0 ? 'flex justify-center' : ''}`}>
                            {table.getRowModel().rows?.length === 0 ? (
                                <tr>
                                    <td colSpan={table.getRowModel().rows?.length + 2}>
                                        <div className="text-center py-4">No Data</div>
                                    </td>
                                </tr>
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, pI) => (
                                    <div
                                        key={pI}
                                        className="flex border-b  hover:bg-gray-50"
                                        onClick={() => handleRedirect(row.original)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <div className={`p-1  ${cell.column.id === 'sl' ? 'w-20' : 'flex-1'}`}> 
                                            {/* add this in above div if you want to add cell right border  border-r last:border-r-0 */}
                                                {DataTableEnumType.PROJECT == type ? (
                                                    cell.column.id === 'sl' ? (
                                                        allcheck ? (
                                                            <Checkbox
                                                            className="mx-3 my-1"
                                                                onCheckedChange={(event) => handleCheckboxChange(event, row.original)}
                                                                checked={allcheck}
                                                            />
                                                        ) : (
                                                            <Checkbox
                                                            className="mx-3 my-1"
                                                                onClick={(event) => handleCheckboxClick(event)}
                                                                onCheckedChange={(event) => handleCheckboxChange(event, row.original)}
                                                                checked={deleteId?.includes(row.original._id)}
                                                            />
                                                        )
                                                    ) : cell.column.id === 'status' ? (
                                                        <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                                                    ) : cell.column.id === 'date' || cell.column.id === 'created_at' ? (
                                                        <>{format(flexRender(cell.column.columnDef.cell, cell.getContext()), Constent.DATE_FORMAT)}</>
                                                    ) : (
                                                        <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                                                    )
                                                ) : cell.column.id === 'sl' ? (
                                                    allcheck ? (
                                                        <Checkbox
                                                        className="mx-3 my-1"
                                                            onCheckedChange={(event) => handleCheckboxChange(event, row.original)}
                                                            checked={allcheck}
                                                        />
                                                    ) : (
                                                        <Checkbox
                                                        className="mx-3 my-1"
                                                            onClick={(event) => handleCheckboxClick(event)}
                                                            onCheckedChange={(event) => handleCheckboxChange(event, row.original)}
                                                            checked={deleteId?.includes(row.original._id)}
                                                        />
                                                    )
                                                ) : cell.column.id === 'date' || cell.column.id === 'created_at' ? (
                                                    <>{format(cell.getValue(), Constent.DATE_FORMAT)}</>
                                                ) : (
                                                    <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <h1>Not found</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-end">
                <PaginationWithLinks totalCount={totalDataCount} />
            </div>
        </div>
    )
}

export default Datatable
