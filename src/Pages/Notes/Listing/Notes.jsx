import React, { useEffect, useState } from 'react'
import { Button } from '@/Components/ui/button'
import Datatable from '@/Components/Common/Datatable'
import NoteColumns from './NotesColumn'
import assets from '@/assets/assets'
import { Input } from '@/Components/ui/input'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import ClientService from '@/Service/ClientService'
import { useDebounce } from 'use-debounce'
import Constent from '@/utils/constent'
import { toast } from 'react-toastify'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'
import NoteService from '@/Service/NoteService'
import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import CreateNotes from '../CreateNotes'

const Notes = () => {
    const [notes, setNotes] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [search, setSearch] = useState('')
    const [debouncedValue] = useDebounce(search, Constent.DEBOUNCE_DELAY)
    const [allcheck, setAllcheck] = useState(false)
    const [deleteId, setDeleteId] = useState([])
    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: '',
    })
    const location = useLocation()

    const getNotes = async (page = 1) => {
        try {
            const resp = await NoteService.getNotes(queryParam)
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setNotes(resp.data.data)
            }
        } catch (err) {}
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = parseInt(searchParams.get('page') || 1)
        setQueryParam((prev) => {
            return {
                ...prev,
                page: page,
            }
        })
    }, [location.search])

    useEffect(() => {
        setQueryParam((prev) => {
            return {
                ...prev,
                search: debouncedValue,
            }
        })
    }, [debouncedValue])

    useEffect(() => {
        getNotes()
    }, [queryParam.page, queryParam.search])

    const deleteNotes = async () => {
       try {
            const resp = await NoteService.deleteNotes(deleteId)
            console.log('response', resp)
            if (resp.data.success) {
                toast.success(resp.data.message)
                 getNotes()
            }
        } catch (err) {
            console.log('error', err)
        }
    }

    return (
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
                            <DialogTrigger>
                                <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Note</Button>
                            </DialogTrigger>
                            <CreateNotes setIsOpen={setIsOpen} getNotes={getNotes} />
                        </Dialog>

                        <DropdownMenu className="ml-[10px] ">
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={`ml-[10px] ${deleteId.length > 0 ? 'block' : 'hidden'}`}>
                                    Action
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={deleteNotes}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
            <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
                <Card className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                    <CardContent className="h-full overflow-card-scroll w-full p-3 m-0 overflow-auto">
                        <div className="w-full my-2 grid grid-cols-4 gap-3 mb-3">
                            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Title" />
                        </div>
                        <Datatable
                            columns={NoteColumns()}
                            data={notes}
                            totalDataCount={totalCount}
                            allcheck={allcheck}
                            deleteId={deleteId}
                            setDeleteId={setDeleteId}
                            type={DataTableEnumType.NOTE}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Notes
