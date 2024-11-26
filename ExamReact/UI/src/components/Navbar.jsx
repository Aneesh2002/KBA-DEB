import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    
    <div className="bg-red-600 p-4 shadow-lg">
        <nav className="flex  justify-end space-x-12">
        <Link className="text-xl text-white font-semibold hover:text-black"to="/Home" >Home</Link>
            <Link className="text-xl text-white font-semibold hover:text-black" to="/ViewService">Services</Link>
            <Link className="text-xl text-white font-semibold hover:text-black" to="/AddService">Addservice</Link>
        </nav>
   </div>

  )
}

export default Navbar