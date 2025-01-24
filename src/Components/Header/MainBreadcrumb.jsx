import React, { useState, useEffect } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useLocation, useParams, Link } from 'react-router-dom'
import { capitalizeFirstChar } from '@/utils/helper'

const MainBreadcrumb = () => {
    const [bradcrumb, setBreadCrumb] = useState([])
    const location = useLocation()
    const { projectId, invoiceId } = useParams()

    useEffect(() => {
        const bradcrumb = location.pathname.split('/').filter((path) => path)
        setBreadCrumb(bradcrumb)
    }, [location])

    return (
        <Breadcrumb>
            {/* <BreadcrumbList className="text-white">{breadCrumb}</BreadcrumbList> */}
            <BreadcrumbList className="text-white">
                {bradcrumb.length > 1 ? (
                    bradcrumb.map((val, i) => {
                        if (i < bradcrumb.length - 1) {
                            return (
                                <>
                                    <BreadcrumbItem className="hidden md:block" key={i}>
                                        {bradcrumb[i] == 'master-settings' ? (
                                            <BreadcrumbLink to={`#`} className="hover:text-white cursor-pointer font-bold">
                                                {capitalizeFirstChar(bradcrumb[i].replaceAll('-', ' '))}
                                            </BreadcrumbLink>
                                        ) : ['client-address', 'notes', 'process', 'lof-business', 'departments'].includes(bradcrumb[i]) ? (
                                            <Link to={`/master-settings/${bradcrumb[i]}`} className="  ">
                                                <BreadcrumbLink to={`#`} className="hover:text-white hover:underline cursor-pointer font-bold">
                                                    {capitalizeFirstChar(bradcrumb[i].replaceAll('-', ' '))}
                                                </BreadcrumbLink>
                                            </Link>
                                        ): (
                                            <Link to={`/${bradcrumb[i]}`}>
                                                <BreadcrumbLink to={`#`} className="hover:text-white hover:underline cursor-pointer font-bold">
                                                    {capitalizeFirstChar(bradcrumb[i].replaceAll('-', ' '))}
                                                </BreadcrumbLink>
                                            </Link>
                                        )}
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" key={`separator-${i}`} />
                                </>
                            )
                        } else {
                            return (
                                <BreadcrumbItem key={bradcrumb.length - 1}>
                                    <BreadcrumbPage className="text-white font-bold">
                                        {projectId !== undefined || invoiceId !== undefined
                                            ? bradcrumb[bradcrumb.length - 1]
                                            : capitalizeFirstChar(bradcrumb[bradcrumb.length - 1].replaceAll('-', ' '))}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            )
                        }
                    })
                ) : bradcrumb.length === 1 ? (
                    <BreadcrumbItem key={0}>
                        <BreadcrumbPage className="text-white font-bold">
                            {capitalizeFirstChar(bradcrumb[bradcrumb.length - 1].replaceAll('-', ' '))}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbItem key={0}>
                        <BreadcrumbPage className="text-white font-bold">Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default MainBreadcrumb
