import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'

const DailyWork = () => {
  return (
    <div>
   <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">DailyWork</h1>
                  <Link className="button" to="/daily-work/new">
                      <Button className="bg-primary-purpal hover:bg-primary-purpal">
                          Add Daily Log
                      </Button>
                  </Link>
              </div>
    </div>
  )
}

export default DailyWork