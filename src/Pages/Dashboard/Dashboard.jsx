import React, { useEffect } from 'react'
import { getCookie } from '@/utils/helper'
import { Card, CardContent } from '@/components/ui/card'
import DummyTable from '@/Components/Common/DummyTable'

const Dashboard = () => {
    return (
        <div >
            <Card className="p-0 mb-2 mx-0 rounded-none sticky top-16 w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <h1>Hello</h1>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[72px]">
                <CardContent className="m-0 p-3 overflow-y-auto">

                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard
