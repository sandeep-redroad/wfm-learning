import React from 'react'
import SidebarItems from './SidebarItems'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import assets from '@/assets/assets'
import SidebarMenuData from '@/assets/data/SideBarMenu'

const PageSidebar = (props) => {
    return (
        <Sidebar {...props} >
            <SidebarHeader className="bg-primary-purpal">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="hover:bg-transparent active:bg-transparent" asChild>
                            <Link to="/dashboard" className="flex justify-center">
                                <img
                                    src={assets.redroadwhitelogo}
                                    alt="Logo"
                                    className="w-36"
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="section-grad-sidebar">
                <SidebarItems items={SidebarMenuData.navMain} />
            </SidebarContent>
        </Sidebar>
    )
}

export default PageSidebar
