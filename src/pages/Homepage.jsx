import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CourseSlider from '../components/Slider'
import HeroSection from '../components/HeroSection'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const [courses, setCourses] = useState([])
const fetchCourses = async () => {
    try {

    } catch (error) {

    }
}
const Homepage = () => {

    return (
        <>
            <div class="bg-gradient-to-b from-blue-100 to-transparent dark:from-blue-900 w-full h-full ">

                <div className='max-w-screen-xl mx-auto'>

                    <Navbar />
                    <div className='flex items-center h-[650px]' id='home'>
                        <HeroSection className='h-[80%]' />
                    </div>
                </div>

            </div>
            <div className='max-w-screen-xl mx-auto'>

                <div className=' bg-gray-50 min-h-fit py-10 px-5 mb-10 rounded-lg' id='course'>
                    <p class="mb-16 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">Courses</p>
                    {

                    }
                    <CourseSlider
                        id='course1'
                        title='Popular Courses'
                        description='Explore our most popular courses'
                        image='/course1.jpg'
                    />
                </div>

                <div className='flex flex-col items-center min-h-screen p-5' id='contact'>
                    <Contact />
                </div>
                <Footer />
            </div>




        </>
    )
}

export default Homepage