import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'

const Invoice = () => {
  return (
    <div>  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">Invoice</h1>
    <Link className="button" to="/invoices/new">
        <Button className="bg-primary-purpal hover:bg-primary-purpal">
            Generate Invoice
        </Button>
    </Link>
</div></div>
  )
}

export default Invoice