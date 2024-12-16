import { Separator } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import MainBreadcrumb from './MainBreadcrumb'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/Context/AuthContext'

const Navbar = () => {
    const { logout } = useAuth()
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b text-white px-4 bg-primary-red justify-between">
            <div className="flex items-center">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <MainBreadcrumb key={window.location.pathname} />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="flex items-end flex-col gap-0 cursor-pointer">
                        <Avatar className="text-sm h-7 w-7">
                            <AvatarImage src="" className="bg-white " />
                            <AvatarFallback className="text-black">
                                SA
                            </AvatarFallback>
                        </Avatar>
                        <span>Sandeepdsfasfdsafsdsd</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logout()}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}

export default Navbar
