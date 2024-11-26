import React from 'react'
import ServiceGrid from '../components/ServiceGrid'
const ViewService = () => {
  return (
    <>
        <h1 className='text-center text-3xl text-red-600 font-bold mt-10'>All Services list</h1>
        <ServiceGrid isHome={false}/>
</>
  )
}

export default ViewService