import React from 'react'
// import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from '../components/CourseGrid'
import ViewAllCourses from '../components/ViewAllCourses'
// import CourseData from '../data/courses.json'

const Home = () => {
  return (

    
    <>
    <Hero />
    <TopCourses />
    <CourseGrid isHome={true} />
    < ViewAllCourses />
    
    </>
  )
}

export default Home