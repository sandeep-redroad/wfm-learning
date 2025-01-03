import React, { useEffect, useState } from 'react'
import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import { Button } from '@/Components/ui/button'

import Datatable from '@/Components/Common/Datatable'
import { Input } from '@/Components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useLocation } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import Constent from '@/utils/constent'
import CreateLofBuisness from '../CreateLofBuisness'
import LofBuisnessColumn from './LofBuisnessColumn'
import LofBuisnessService from '@/Service/LofBuisnessService'

const LofBuisness = () => {
    const [Lof_buisness, setLof] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [search, setSearch] = useState('')
    const [queryParam, setQueryParam] = useState({
        page: 1,
        search: '',
    })
    const [debouncedValue] = useDebounce(search, Constent.DEBOUNCE_DELAY)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const getLofBuisness = async () => {
        try {
            const resp = await LofBuisnessService.getLofBuisness(queryParam)
            if (resp.data.success) {
                setTotalCount(resp.data.pagination.totalRecords)
                setLof(resp.data.data)
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
        getLofBuisness()
    }, [queryParam.page, queryParam.search])

    useEffect(() => {
        setQueryParam((prev) => {
            return {
                ...prev,
                search: debouncedValue,
            }
        })
    }, [debouncedValue])

    return (
        <div>
            <Card className="p-0 mb-[72px] mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-between items-center">
                        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
                            <DialogTrigger>
                                <Button className="bg-primary-purpal hover:bg-primary-purpal">Add LOF Buisness</Button>
                            </DialogTrigger>
                            <CreateLofBuisness getLofBuisness={getLofBuisness} setIsOpen={setIsOpen} />
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[4.5rem]">
                <CardContent className="m-0 p-3 overflow-y-auto">
                    <div className="w-full my-2 grid grid-cols-4">
                        <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Lof Buisness" />
                    </div>
                    <Datatable columns={LofBuisnessColumn()} data={Lof_buisness} totalDataCount={totalCount} />
                </CardContent>
            </Card>
        </div>
    )
}

export default LofBuisness
