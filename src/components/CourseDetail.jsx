import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Syllabus from '../assets/syllabus'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'


const CourseDetail = () => {
    const { course_id } = useParams()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(1);
    const [instructors, setInstructors] = useState([]);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }
    const [course, setCourse] = useState(null);

    const fetchCourse = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/list/${course_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            if (response.ok) {
                setCourse(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchInstructors = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/instructors/${course_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            if (response.ok) {
                setInstructors(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }



    const enrollInCourse = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/student/enroll/${course_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            const data = await response.json()
            if (response.ok) {
                navigate(`/lobby`)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('An error occurred. Please try again later.')
        }
    }

    useEffect(() => {
        fetchCourse()
        fetchInstructors()
    }, [])
    // console.log(course)
    console.log(instructors)

    const activeModule = Syllabus.find(module => module.module === activeTab);
    return (
        <>
            <div className='max-w-screen-xl mx-auto'>
                <Navbar />
                {
                    course &&

                    <section class="bg-white dark:bg-gray-900">
                        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                            <div class="mr-auto place-self-center lg:col-span-7">
                                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none dark:text-white">{course.name}</h1>
                                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{
                                    course.description}</p>
                                < div onClick={enrollInCourse}
                                    role="button"
                                    class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                    Enroll Now
                                    <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </div>
                                <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                    View Syllabus
                                </a>
                            </div>
                            <div class="hidden  lg:mt-0 lg:col-span-5 lg:flex ">
                                <img src="/banner.avif" alt="banner" className='rounded-xl aspect-video object-cover' />
                            </div>
                        </div>
                    </section>
                }



                <section class="bg-white dark:bg-gray-900">
                    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                        <div class="mx-auto mb-8 max-w-screen-md lg:mb-16">
                            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Know Your Instructors</h2>
                            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Our team of instructors is a dynamic blend of industry professionals and passionate educators.  Whether you're embarking on a new learning journey or seeking to advance your skills, our instructors are here to help you achieve your goals.</p>
                        </div>

                        <div class="flex justify-center gap-20">
                            {
                                instructors && instructors.map((instructor) => {
                                    return (
                                        <div class="text-center text-gray-500 dark:text-gray-400">
                                            <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={instructor.image || '/user.png'} alt="Bonnie Avatar" />
                                            <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                <a href="#">{instructor.name}</a>
                                            </h3>
                                            <p>Instructor</p>
                                            <ul class="flex justify-center mt-4 space-x-4">
                                                <li>
                                                    <a href="#" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                                                        <svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd" />
                                                            <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                                                        </svg>

                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                    )

                                })

                            }

                        </div>
                    </div>
                </section >

                <section class="bg-white dark:bg-gray-900 ">
                    <div class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6 ">
                        <div class="mx-auto  max-w-screen-md ">
                            <h2 class=" text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Course Content</h2>
                        </div>
                    </div>
                    <div class="md:flex">
                        <ul class="flex-column  text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 w-1/2 max-h-[90%] overflow-y-scroll">
                            {
                                Syllabus.map((module) => {
                                    return (
                                        <>
                                            <li key={module.module}>
                                                <div onClick={() => handleTabChange(module.module)}
                                                    role="button"
                                                    class="inline-flex items-center px-4 py-3 text-black border-b-2 w-full cursor-pointer" >
                                                    <div class="flex flex-col">
                                                        <dt class="mb-1 text-gray-500 md:text-md dark:text-gray-400">{`Module ${module.module}`}</dt>
                                                        <dd class="text-lg font-semibold">{module.name}</dd>
                                                    </div>

                                                </div>
                                            </li>

                                        </>
                                    )
                                })
                            }

                        </ul>

                        <div class="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                            {activeModule && (
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {`Module ${activeModule.module}: ${activeModule.name}`}
                                    </h2>
                                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                                        {activeModule.description}
                                    </p>
                                    <h2 className="my-4 text-lg font-semibold text-gray-900 dark:text-white">
                                        Topics Covered
                                    </h2>
                                    <ul className="space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                        {activeModule.syllabus.map((topic, index) => (
                                            <li key={index} className="flex items-center">
                                                <svg
                                                    className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                </svg>
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div >
        </>
    )
}

export default CourseDetail