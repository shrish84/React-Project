import React, { useContext } from 'react'
import { DashboardContext } from '../context'

const SideBar = () => {
    const user= useContext(DashboardContext)
  return (
    <div>
        {user.name}
    </div>
  )
}

export default SideBar
