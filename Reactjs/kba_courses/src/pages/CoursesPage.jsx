import React from 'react'
import MainLayout from '../layouts/MainLayout'
import CourseGrid from '../components/CourseGrid'
import CourseData from '../data/courses.json'

const CoursesPage = () => {
  return (
    <MainLayout>
        <h1></h1>
        <CourseGrid courses={CourseData} />

    </MainLayout>
  )
}

export default CoursesPage