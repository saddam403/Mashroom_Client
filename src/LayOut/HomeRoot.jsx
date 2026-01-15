import React from 'react'


import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../Shared/Footer'

const HomeRoot = () => {
  return (
    <div className="min-h-screen">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default HomeRoot