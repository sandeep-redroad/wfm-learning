import './App.css'
import Navbar from '@/Components/Header/Navbar'
import PageSidebar from '@/Components/Sidebar/PageSidebar'
import Login from './Pages/Login'
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar'
import Project from './Components/Project/Project'



function App() {
    
    return (
        <>
            <SidebarProvider>
                <PageSidebar />
                <SidebarInset >
                    <Navbar />
                    <div className="flex flex-1 flex-col gap-2 p-10 ">
                        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="aspect-video rounded-xl bg-red-200" />
                            <div className="aspect-video rounded-xl bg-red-200" />
                            <div className="aspect-video rounded-xl bg-red-200" />
                        </div>
                      */}
                      
                        <Project />
                        
                    </div>
                </SidebarInset>
            </SidebarProvider>
            <div className="h-[calc(100vh-3.5rem)]">
           
            </div>
           
        </>
        // <Login />\
       
    )
}

export default App
