import React from 'react'
const ServiceCard = ({service}) => {
  return (
    <div className=' bg-red-100  rounded-md shadow-xl flex flex-col items-start justify-center mx-5 my-5 py-10 px-8 '>
            <h3 className=' text-lg text-red-600 '>service number:<span className='text-black'>{service.serviceno}</span></h3>
            <h3 className=' text-lg text-red-600 '>Vehicle Number:<span className='text-black'>{service .vehicleno}</span></h3>
            <h3 className=' text-lg text-red-600 '>Vehicle Type:<span className='text-black'>{service .vehicletype}</span></h3>
            <h3 className=' text-lg text-red-600 '>Estimated Time:<span className='text-black'>{service .estimatedtime}</span></h3>
            <h3 className=' text-lg text-red-600 '> Given Date:<span className='text-black'>{service .givendate}</span></h3>
            <h3 className=' text-lg text-red-600 '>Owner Name:<span className='text-black'>{service .ownername}</span></h3>
            <h3 className=' text-lg text-red-600 '>Service Type:<span className='text-black'>{service .servicedetails}</span></h3>
       </div>
  )
}

export default ServiceCard