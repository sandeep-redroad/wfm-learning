import React, { useEffect, useState } from 'react'
import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import ProjectColumns from './ProjectColumn'
import assets from '@/assets/assets'
import { Button } from '@/Components/ui/button'
import { Link, useLocation } from 'react-router-dom'
import DataTableEnumType from '@/Enums/DataTableTypeEnum'
import { Card, CardContent } from '@/components/ui/card'
import Constent from '@/utils/constent'
import ProjectService from '@/Service/ProjectService'
import { useDebounce } from 'use-debounce'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'react-toastify'
const Project = () => {
    const [projects, setProjects] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [searchId, setSearchId] = useState('')
    const [searchClient, setSearchClient] = useState('')
    const [allcheck, setAllcheck] = useState(false)
    const [deleteId, setDeleteId] = useState([])
    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: {
            id: '',
            client: '',
        },
    })
    const [debounce1] = useDebounce(searchId, Constent.DEBOUNCE_DELAY)
    const [debounce2] = useDebounce(searchClient, Constent.DEBOUNCE_DELAY)
    const location = useLocation()
    const getProject = async () => {
        try {
            const resp = await ProjectService.getProjects(queryParam)
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setProjects(resp.data.data)
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
        getProject()
    }, [queryParam.page, queryParam.search.id, queryParam.search.client])

    useEffect(() => {
        setQueryParam((prev) => {
            return {
                ...prev,
                search: {
                    id: debounce1,
                    client: debounce2,
                },
            }
        })
    }, [debounce1, debounce2])

    const deleteProject = async () => {
        try {
            const resp = await ProjectService.deleteProject(deleteId)
            console.log('response', resp)
            if (resp.data.success) {
                toast.success(resp.data.message)
                getProject()
            }
        } catch (err) {
            console.log('error', err)
        }
    }

    return (
        <div>
            <Card className="p-0 mb-2 mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Link className="button" to="/projects/new">
                            <Button className="bg-primary-purpal hover:bg-primary-purpal">Add Project</Button>
                        </Link>
                        <DropdownMenu className="ml-[10px] ">
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={`ml-[10px] ${deleteId.length > 0 ? 'block' : 'hidden'}`}>
                                    Action
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={deleteProject}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-5 gap-3">
                        <Input type="text" onChange={(e) => setSearchId(e.target.value)} placeholder="ID" />
                        <Input type="text" onChange={(e) => setSearchClient(e.target.value)} placeholder="Project Client" />
                    </div>
                    <Datatable
                        columns={ProjectColumns()}
                        data={projects}
                        totalDataCount={totalCount}
                        type={DataTableEnumType.PROJECT}
                        allcheck={allcheck}
                        deleteId={deleteId}
                        setDeleteId={setDeleteId}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default Project
