import React from 'react'
import { Card, CardContent } from './ui/card'

const BodyCard = ({ children }) => {
    return (
        <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
            <Card className="h-full overflow-card-scroll w-full m-0 overflow-auto">
                {/* h-full overflow-card-scroll w-full p-3 ps-1 m-0 overflow-auto */}
                <CardContent className="m-0 p-2 max-h-full">{children}</CardContent>
            </Card>
        </div>
    )
}

export default BodyCard
