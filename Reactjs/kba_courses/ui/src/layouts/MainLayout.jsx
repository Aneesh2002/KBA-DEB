import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

const MainLayout = ({children}) => {
  return (
    <>
    <NavBar />
    <Outlet />
    {/* <main>{children}</main> */}
    </>
  )
}

export default MainLayout