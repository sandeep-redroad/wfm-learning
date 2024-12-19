import CreateProject from '@/Components/Project/CreateProject'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'

const Project = () => {
    return (
        <div className="container mx-auto">
            <CreateProject />
        </div>
    )
}

export default Project
