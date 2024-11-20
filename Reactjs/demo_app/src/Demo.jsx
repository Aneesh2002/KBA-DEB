import React from 'react'

const Demo = () => {
    const my="Aneesh"
    const x=10;
    const y=20;
    const names=["Anandhu","gishnu","vinu","akhil","jithin","maneesh"]
    const loggedIn=false
  return (
    <>
    <div className='text-6xl text-white bg-orange-500 p-4 text-center shadow-xl m-12 '>MY REACT WEBSITE</div>
    <p className='text-2xl text-green-500 font-bold '>Hello "{my}"</p>
    <p>the sum of {x} and {y} is {x+y}</p>
    <ul>
      {
        names.map((name,index)=>(
          <li key={index}>{name}</li>
        ))
      }
    </ul>
    {
      loggedIn?<h1>Hello Member</h1>:<h1>Hello Guest</h1>
    }
    


    
    <div>demo</div>
  
    </>
    
  )
}

export default Demo