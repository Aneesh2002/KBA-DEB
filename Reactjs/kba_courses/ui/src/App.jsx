import React from 'react'
import{createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
import Login from './pages/Login'
import SignupPage from './pages/SignupPage'
import AuthLayout from '../src/layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import CoursesPage from './pages/CoursesPage'
import Contact from './pages/Contact'
import AddCourse from './pages/AddCourse'
import UpdateCourse from './pages/UpdateCourse'
import Courses,{ courseLoader } from './pages/Courses'
import NotFound from './pages/NotFound'


const App = () => {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      {/* pubvlic routes */}
      <Route path='/' element={<Login />} ></Route>
      <Route path='/signup' element={<SignupPage />} />
      {/* protected routes */}
      <Route element={<AuthLayout />}>
      <Route element={<MainLayout />}>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/coursespage' element={<CoursesPage />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/Addcourse' element={<AddCourse />}></Route>
      <Route path='Updatecourse/:id' element={<UpdateCourse />} loader={courseLoader}></Route>
      <Route path='/course/:id' element={<Courses />} loader={courseLoader}></Route>

      </Route>
      </Route>

      {/* notfound */}
      <Route path='*' element={<NotFound />}></Route>

      </>
    )
  )
  return (
    <RouterProvider router={router} />
 
  )
}

export default App
