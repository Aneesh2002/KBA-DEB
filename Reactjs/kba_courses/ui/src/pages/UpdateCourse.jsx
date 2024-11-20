import React from 'react'
// import NavBar from '../components/NavBar'
import MainLayout from '../layouts/MainLayout'
import { useParams,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'

const UpdateCourse = () => {

  const {id}=useParams();
  const navigate=useNavigate();
  const [course,setCourse]=useState(null)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const fetchCourse = async()=>{
      try{
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        setCourse(data)
      }
      catch(error){
        console.log(`error fetching courses:`,error);
        

      }finally{
        setLoading(false)
      }
    }
    fetchCourse()

  },[id]);
 
  



  const handleChange=(e)=>{
    const {name,value}=e.target;
    setCourse((prevCourse)=>({
      ...prevCourse,
      [name]:value,
    }))
  }

 const submitForm = async (e)=>{
  e.preventDefault();
  try{
    const res =await fetch(`/api/courses/${id}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(course),
    })
    if(res.ok){
      navigate(`/course/${id}`);
    }
    else{
      console.log('failed to load course');
      
    }

  }catch(error){
    console.log('eroor updating course',error);
    

  }
 }
 if(loading){
  return (
    <MainLayout>
  <h1 className='text-center mt-10'>loading...</h1>
  </MainLayout>
  );
}
  if(!course){
    return(
      <MainLayout>
        <div className='text-center ml-10'>Course not Found</div>
      </MainLayout>
    )
  }




  return (
    
    
    <section className="bg-white mb-20">
  <div className="container m-auto max-w-2xl py-2">
    <div className="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
      <form onSubmit={submitForm}>
        <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
          Update Course
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Course Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="eg. Certified Blockchain Associate"
            required
            value={course.title}
            onChange={handleChange}
  
          />
        </div>



        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-gray-700 font-bold mb-2"
          >
            Course Type
          </label>
          <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
            value={course.type}
            onChange={handleChange}
      
          >
            <option value="Self-Paced">Self-Paced</option>
            <option value="Instructor-Led">Instructor-Led</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="add a short course description"
            value={course.description}
            onChange={handleChange}
        
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-gray-700 font-bold mb-2"
          >
            Price
          </label>
          <select
            id="price"
            name="price"
            className="border rounded w-full py-2 px-3"
            required
            value={course.price}
            onChange={handleChange}
         
          >
            <option value="Rs.5000">Rs.5000</option>
            <option value="Rs.3500">Rs.3500</option>
            <option value="Rs.15000">Rs.15000</option>
          </select>
        </div>

        <div>
          <button
            className="bg-purple-500 hover:bg-purple-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

    
  )
}

export default UpdateCourse