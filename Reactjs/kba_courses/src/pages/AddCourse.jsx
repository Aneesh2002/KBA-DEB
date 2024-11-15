import React from 'react'
// import NavBar from '../components/NavBar'
import MainLayout from '../layouts/MainLayout'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CourseData from '../data/courses.json'


const AddCourse = () => {
  const navigate=useNavigate();
  const [course,setCourse]=useState({
    title:'',
    courseId:'',
    type:'',
    description:'',
    price:'',
  })

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setCourse((prevCourse)=>({
      ...prevCourse,
      [name]:value,
    }))
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    CourseData.push(course);
    navigate('/coursespage')
  }
  return (
<>
<MainLayout >
<section className="bg-white mb-20">
    <div className="container m-auto max-w-2xl py-2">
      <div className="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
            Add Course
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
            <label className="block text-gray-700 font-bold mb-2">
              Course Id
            </label>
            <input
              type="text"
              id="courseId"
              name="courseId"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. 1"
              required
              value={course.courseId}
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
              placeholder="Small description on the course"
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
              className="bg-purple-500 hover:bg-purple-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  </MainLayout>

</> 
 )
}

export default AddCourse