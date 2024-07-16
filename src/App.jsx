import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Registration from './components/Registration'
import Login from './components/Login'
import InstructorDashboard from './pages/InstructorDashboard'
import VideoCalling from './components/VideoCalling'
import AssignmentTable from './components/AssignmentTable'
import Homepage from './pages/Homepage'
import CreateCourse from './components/CreateCourse'
import CustomDropdown from './components/Test'
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
        <Route path='/instructor-dashboard' element={<InstructorDashboard />} />
        <Route path='/video-calling' element={<VideoCalling />} />
        <Route path='/assignment-submission/:assignment_id' element={<AssignmentTable />} />
        <Route path='/create-course' element={<CreateCourse />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>

  )
}

export default App

