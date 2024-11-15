import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import AddCourse from './pages/AddCourse'
import Contact from './pages/Contact'
import UpdateCourse from './pages/UpdateCourse'
import Courses from './pages/Courses'
import NotFound from './pages/NotFound'
import CoursesPage from './pages/CoursesPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Addcourse' element={<AddCourse />}></Route>
        <Route path='/Updatecourse/:id' element={<UpdateCourse />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/course/:id' element={<Courses />}></Route>
        {/* <Route path='/courses/:id' element={<Courses />}></Route> */}
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/coursespage' element={<CoursesPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App