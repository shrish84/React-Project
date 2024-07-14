import React, { useContext } from 'react'
import { DashboardContext } from '../context'

const Profiler = () => {
    const user= useContext(DashboardContext)
  return (
    <div>
      {user.name}
    </div>
  )
}

export default Profiler
