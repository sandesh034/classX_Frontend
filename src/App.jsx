import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Registration from './components/Registration'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import VideoCalling from './components/VideoCalling'
import AssignmentTable from './components/AssignmentTable'
import Homepage from './pages/Homepage'
import CreateCourse from './components/CreateCourse'
import Lobby from './components/Lobby'
import CourseDetail from './components/CourseDetail'
import Error404 from './components/Error404'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (

    <BrowserRouter>
      <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce />

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/:course_id' element={<Dashboard />} />
        <Route path='/video-calling' element={<VideoCalling />} />
        <Route path='/assignment-submission/:course_id/:assignment_id' element={<AssignmentTable />} />
        <Route path='/create-course' element={<CreateCourse />} />
        <Route path='/lobby' element={<Lobby />} />
        <Route path='/course-detail/:course_id' element={<CourseDetail />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>

  )
}

export default App

