import React, { useState, useEffect } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useLocation, useParams, Link } from 'react-router-dom'
import { capitalizeFirstChar } from '@/utils/helper'

const MainBreadcrumb = () => {
    const [breadCrumb, setBreadCrumb] = useState([])
    const location = useLocation()
    const { projectId } = useParams()

    useEffect(() => {
        const bradcrumb = location.pathname.split('/').filter((path) => path)
        console.log(":bradcrumb L ", bradcrumb)
        let clickableBrad = []
        if (bradcrumb.length > 1) {
            for (let i = 0; i < bradcrumb.length - 1; i++) {
                clickableBrad.push(
                    <BreadcrumbItem className="hidden md:block" key={i}>
                        <BreadcrumbLink to={`/${bradcrumb.slice(0, i + 1).join('/')}`} className="hover:text-white cursor-pointer font-bold">
                            {capitalizeFirstChar(bradcrumb[i].replaceAll('-', ' '))}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )
                clickableBrad.push(<BreadcrumbSeparator className="hidden md:block" key={`separator-${i}`} />)
            }
            clickableBrad.push(
                <BreadcrumbItem key={bradcrumb.length - 1}>                    
                    <BreadcrumbPage className="text-white font-bold">
                        {projectId !== undefined ? bradcrumb[bradcrumb.length - 1] : capitalizeFirstChar(bradcrumb[bradcrumb.length - 1].replaceAll('-', ' '))}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            )
        } else if (bradcrumb.length === 1) {
            clickableBrad.push(
                <BreadcrumbItem key={0}>
                    <BreadcrumbPage className="text-white font-bold">
                        {capitalizeFirstChar(bradcrumb[bradcrumb.length - 1].replaceAll('-', ' '))}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            )
        } else {
            clickableBrad.push(
                <BreadcrumbItem key={0}>
                    <BreadcrumbPage className="text-white font-bold">Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
            )
        }

        setBreadCrumb(clickableBrad)
    }, [location])

    return (
        <Breadcrumb>
            <BreadcrumbList className="text-white">{breadCrumb}</BreadcrumbList>
        </Breadcrumb>
    )
}

export default MainBreadcrumb
