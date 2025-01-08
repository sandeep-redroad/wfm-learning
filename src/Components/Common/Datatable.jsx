import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { PaginationWithLinks } from './Pagination'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'
import Constent from '@/utils/constent'
import { format } from 'date-fns'
import { Checkbox } from '../ui/checkbox'

const Datatable = ({ columns, data, totalDataCount,type,allcheck ,setDeleteId,deleteId}) => {
    const checkboxRef = useRef(null); 
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)
    const pageSize = Constent.PAGINATION_SIZE
    const currentPage = parseInt(searchParams.get('page') || 1)
    const tbodyRef = useRef(null)
    const [isScrollable, setIsScrollable] = useState(false);
    const [rowsDelete,setRowsDelete]=useState([])
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

    const handleRedirect = (row) =>{
        if(DataTableEnumType.PROJECT == type){
            navigate(`/projects/${row.id}`)
        }
        if(DataTableEnumType.CLIENT == type){
            navigate(`/clients/${row.client}`)
        }
        if(DataTableEnumType.DAILY_WORK_LOG == type){
            navigate(`/daily-work-log/${row.id}`)
        }
        if(DataTableEnumType.BILLING_ENTITY == type){
            navigate(`/master-settings/billing-entity/${row.billingEntity}`)
        }
    }

    const handleCheckboxChange=(event, row)=>{
        if(event){
            console.log("in event",event)
            if (!deleteId?.includes(row._id)) {
                setDeleteId(prevDeleteId => [...prevDeleteId, row._id]);
               
              } 
           }else{
            console.log("in else",event)
            if (deleteId?.includes(row._id)) {
                // If the ID is already in the deleteId array, pop it
                setDeleteId(prevDeleteId => prevDeleteId.filter(item => item !== row._id));
              }
           }
              console.log("in one check",deleteId);
        
       
       

    }

    const handleCheckboxClick=(event)=>{
        event.stopPropagation();
    }
    const handleAllChange=(event,rows)=>{
        console.log("in handleAll change",rows);
       if(event){
        rows.map((row,index)=>{
            if (!deleteId.includes(row.original._id)) {
                setDeleteId(prevDeleteId => [...prevDeleteId, row.original._id]);
               
              } 
        })
       }else{
        setDeleteId([]);
       }
        console.log("in one check",deleteId);
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
                                                {/* <input type="checkbox" className='peer h-4 w-4 shrink-0 rounded-sm border border-neutral-200 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-neutral-50 dark:border-neutral-50 dark:focus-visible:ring-neutral-300 dark:data-[state=checked]:bg-neutral-50 dark:data-[state=checked]:text-neutral-900'/> */}
                                                <Checkbox id="terms" onCheckedChange={(event)=>handleAllChange(event,table.getRowModel().rows)} />
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
                                onClick={() => handleRedirect(row.original)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        className={`p-1 px-3 flex justify-start items-center ${
                                            cell.column.id === 'sl' ? 'w-20' : 'w-1/6'
                                        }`}
                                    >
                                        {DataTableEnumType.PROJECT == type ? (
                                            cell.column.id === 'sl' ? (
                                                allcheck?(<Checkbox onCheckedChange={(event)=>handleCheckboxChange(event, row.original)} checked={allcheck}/>):(<Checkbox onClick={(event)=>handleCheckboxClick(event)}  onCheckedChange={(event)=>handleCheckboxChange(event,row.original)}checked={deleteId?.includes(row.original._id)}/>)
                                            ) : cell.column.id === 'status' ? (
                                                <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                                            ) : cell.column.id === 'date' || cell.column.id === 'created_at' ? (
                                                <>{format(flexRender(cell.column.columnDef.cell, cell.getContext()), Constent.DATE_FORMAT)}</>
                                            ) : (
                                                <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                                            )
                                        ) : cell.column.id === 'sl' ? (
                                          allcheck?(<Checkbox onCheckedChange={(event)=>handleCheckboxChange(event, row.original)} checked={allcheck}/>):(<Checkbox onClick={(event)=>handleCheckboxClick(event)}  onCheckedChange={(event)=>handleCheckboxChange(event, row.original)}  checked={deleteId?.includes(row.original._id)}/>)
                                        ) : cell.column.id === 'date' || cell.column.id === 'created_at' ? (
                                            <>{format(cell.getValue(), Constent.DATE_FORMAT)}</>
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
