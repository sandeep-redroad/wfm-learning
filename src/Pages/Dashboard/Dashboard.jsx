import React, { useEffect } from 'react'
import { getCookie } from '@/utils/helper'

const Dashboard = () => {
  useEffect(() =>{
    console.log("cookies : ", getCookie("session_id"))
    console.log(document.cookie)
    console.log('routesds')
  },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard