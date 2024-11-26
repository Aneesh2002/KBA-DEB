import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route,} from 'react-router-dom';
import Login from './pages/Login';
import Sign from './pages/Sign';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home'
import AddService from './pages/AddService';
import ViewService from './pages/ViewService';
import NotFound from './pages/NotFound';
const App = () => {
const router = createBrowserRouter(
    createRoutesFromElements(
    <>
    {/* public routes */}
    <Route path="/" element={<Login/>}/>
    <Route path="/Sign" element={<Sign/>}/>
      {/* protected Routes */}
      <Route element={<AuthLayout/>}>
      <Route element={<MainLayout/>}>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/AddService" element={<AddService/>}/>
      <Route path="/ViewService" element={<ViewService/>}/>
      {/* <Route path='/editcourse/:id' element={<EditCourse/>} loader={courseLoader}/>
      <Route path='/course/:id' element={<CoursePage/>} loader={courseLoader}/> */}
  </Route>
      </Route>
      {/* not found */}
      <Route path="*" element={<NotFound/>}/>
</>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App