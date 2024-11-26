import React from 'react'
import ServiceCard from './ServiceCard'
import { useState,useEffect } from 'react';
const ServiceGrid = ({isHome}) => { 
    const [Service, setService] = useState([]);
    const serviceList = isHome?Service.slice(0,3):Service;
    useEffect(() => {
      const  fetchserviceDetails=async()=>{
        try{
          const res= await fetch('/api/viewvehicles');
          const data=await res.json();
          setService(data);
        }
        catch(error){
          console.log(error);
        }
     
      };
      fetchserviceDetails();
    },[]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10'>
    {serviceList.map((service)=>(
        <ServiceCard key={service.Serviceno}service={service}/>
    ))}
</div>
  )
}

export default ServiceGrid