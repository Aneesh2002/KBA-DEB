import React,{useEffect,useState} from 'react'
// import NavBar from '../components/NavBar'
import MainLayout from '../layouts/MainLayout'
import Banner from '../assets/images/banner-kba.png'
import { useParams,Link,useLoaderData,useNavigate } from 'react-router-dom'
// import CourseData from '../data/courses.json'
import NotFound from '../pages/NotFound'
import getUserType from '../utiles/auth'

const Courses = () => {
  const {id}=useParams();
  const course=useLoaderData()
  const navigate=useNavigate();
  const userType=getUserType();

  const deleteCourse= async ()=>{
    const confirmDelete = window.confirm('Are you sure want to delete this course?');
    if(!confirmDelete)return;

    const res = await fetch(`/courses/${id}`,{
      method:"DELETE",
      credentials:'include',
    })
    if(res.ok){
      navigate('/coursepage')
    }else{
      alert('Error deleteting course')
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
        <NotFound/>
      </MainLayout>
    );course
  }
 
  



  
  return (
    
    
    <div className="bg-white text-gray-900 mb-10 pb-10">   
    <div className="max-w-4xl mx-auto p-5 ">
      
      <section>
      <Link  className="flex items-center my-5 gap-1 font-medium  " to = "/coursespage">  Back to Courses</Link>
      </section>

      <div className="bg-purple-100 shadow-lg rounded-lg overflow-hidden">
        <img
          src={Banner}
          alt="Course Thumbnail"
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h1 className="text-3xl font-bold text-purple-800">
              {course.title}
            </h1>
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="text-2xl text-red-500 font-semibold mr-4">
                {course.price}
              </span>
              <button className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
                Add to Cart
              </button>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-purple-800 mb-2">
              Description
            </h2>
            <p>{course.description} </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-purple-800 mb-2">
              Prerequisites
            </h2>
            <ul className="list-disc list-inside">
              <li>Basic understanding of blockchain technology</li>
              <li>Familiarity with programming languages</li>
              <li>Internet access</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-800 mb-2">
              Features
            </h2>
            <ul className="list-disc list-inside">
              <li>40 hours of content</li>
              <li>Certificate of completion</li>
              <li>Access to community forums</li>
              <li>Downloadable resources</li>
              <li>24/7 support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {userType==='admin' && (<div className="flex flex-row justify-end gap-4 mr-[205px] ">
      <Link to={`/Updatecourse/${course.courseId}`}  className="flex bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded-full h-10 w-32 focus:outline-none focus:shadow-outline justify-center items-center">Edit Course</Link>
      <button onClick={deleteCourse()} className="flex bg-red-500 hover:bg-red-600 text-white font-bold  rounded-full h-10 w-32 focus:outline-none focus:shadow-outline  justify-center items-center">Remove Course</button>
     
      </div>)
      }
  </div>


  


    
  )
}
const courseLoader = async ({params})=>{
  const res = await fetch(`/api/courses/${params.id}`,{
    credentials:'include',

  });
  if(!res.ok){
    throw new Response('Course not found',{status:400})
  }
  return res.json;
}

  
  
 

export {Courses as default,courseLoader}