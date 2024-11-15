import React from 'react'
// import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from '../components/CourseGrid'
import ViewAllCourses from '../components/ViewAllCourses'
import CourseData from '../data/courses.json'
import MainLayout from '../layouts/MainLayout'

const Home = () => {
  const topCourses=CourseData.slice(0,3);
  return (

    
    <>
    <MainLayout>
    <Hero />
    <TopCourses />
    <CourseGrid courses={topCourses} />
    < ViewAllCourses />
    </MainLayout>
    </>
  )
}

export default Home