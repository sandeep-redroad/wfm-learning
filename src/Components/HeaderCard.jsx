import React from 'react'
import { Card, CardContent } from './ui/card'

const HeaderCard = ({ children }) => {
    return (
        <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
            <CardContent className="m-0 flex justify-between items-center p-3 w-full">{children}</CardContent>
        </Card>
    )
}

export default HeaderCard
