import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
const AddService = () => {
    const [Serviceno,setServiceno]=useState('');
    const [Vehicleno,setVehicleno]=useState('');
    const [Servicedetails,setServicedetails]=useState('');
    const [Vehicletype,setVehicletype]=useState('');
    const [Givendate,setGivendate]=useState('');
    const [Estimatedtime,setEstimatedtime]=useState('');
    const [Ownername,setOwnername]=useState('');
    const navigate =useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const newservice ={
          Serviceno,
          Vehicleno,
          Vehicletype,
          Givendate,
          Estimatedtime,
          Ownername,
          Servicedetails           
        }
        try{
            const response =  await fetch('/api/addvehicle',
                {
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(newservice)

                }
            )
          
              if(response.ok){
                alert("Service Added Successfully");
                navigate('/Home')

            }
            else{
                alert("Failed to Add Service");
            }
        }
        catch(error){
            console.error("this is the error",error);
        }
    }
  return (
        <div className=" flex items-center justify-center bg-red-100">
          <form
            onSubmit={handleSubmit} 
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mt-12">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Add Service Details</h2>
    
            <div className="mb-4">
              <label htmlFor="serviceno" className="block text-sm font-medium text-gray-700">Service Number</label>
              <input
                type="text"
                name="serviceno"
                value={Serviceno}
                onChange={(e)=>setServiceno(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Service Number"/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="vehicleno" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
              <input
                type="text"
                name="vehicleno"
                value={Vehicleno}
                onChange={(e)=>setVehicleno(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Vehicle Number"/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="vehicletype" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <input
                type="text"
                name="vehicletype"
                value={Vehicletype}
                onChange={(e)=>setVehicletype(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Vehicle Type"/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="serviceDetails" className="block text-sm font-medium text-gray-700">
                Service Details</label>
              <input
                type="text"
                name="servicetype"
                value={Servicedetails}
                onChange={(e)=>setServicedetails(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Service Type"/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="Givendate" className="block text-sm font-medium text-gray-700">Given Date</label>
              <input
                type="date"
                name="servicedate"
                value={Givendate}
                onChange={(e)=>setGivendate(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="Estimatedtime" className="block text-sm font-medium text-gray-700">Estimated Time
              </label>
              <input
                type="text"
                name="servicetime"
                value={Estimatedtime}
                onChange={(e)=>setEstimatedtime(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="ownername" className="block text-sm font-medium text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                name="ownername"
                value={Ownername}
                onChange={(e)=>setOwnername(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Owner Name"
              />
            </div>
    
            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
            >
              Submit Service Details
            </button>
          </form>
        </div>
      );
  
}

export default AddService