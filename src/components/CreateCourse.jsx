import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const CreateCourse = () => {
    const [creadtedCourseId, setCreatedCourseId] = useState(null);
    const [course, setCourse] = useState({
        name: null,
        description: null,
        start_date: null,
        price: null,
        duration: null,
        image: null,
        instructor: []
    });

    const [instructors, setInstructors] = useState([{}]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'file') {
            setCourse({ ...course, [name]: e.target.files[0] });
        } else if (type === 'checkbox') {
            if (checked) {
                setCourse({ ...course, instructor: [...course.instructor, value] });
            } else {
                setCourse({ ...course, instructor: course.instructor.filter((instructor) => instructor !== value) });
            }
        } else {
            setCourse({ ...course, [name]: value });
        }

        console.log(course);
    };


    const fetchInstructors = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/list/instructors`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                // console.log(data);
                setInstructors(data.data);
            }
            else {
                // console.log(data.message);
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const createCourse = async (e) => {
        e.preventDefault();

        try {
            const createCourseResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course),
            });

            const createCourseData = await createCourseResponse.json();

            if (!createCourseResponse.ok) {
                toast.error(createCourseData.message || 'Failed to create course');
            }
            const courseId = createCourseData.data.course_id;
            setCreatedCourseId(courseId);

            await Promise.all(course.instructor.map(async (instructor) => {
                const assignInstructorResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/assign/instructor`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ course_id: courseId, instructor_id: instructor }),
                });

                const assignInstructorData = await assignInstructorResponse.json();

                if (!assignInstructorResponse.ok) {
                    toast.error(assignInstructorData.message || 'Failed to assign instructor');
                }

                toast.success(assignInstructorData.message);
            }));

            toast.success('Course created and instructors assigned successfully');
        } catch (error) {
            console.error('Error creating course:', error);
            toast.error('Failed to create course');
        }
    };


    useEffect(() => {
        fetchInstructors();
    }, []);


    return (
        <>
            <Navbar />
            <div className='max-w-screen-lg mx-auto'>
                <p className="mb-5 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">Create Course</p>

                <form method='post' encType='multipart/form-data' onSubmit={createCourse} className="p-4 pt-1 md:p-5">
                    <div className="grid gap-4 mb-2 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name of course" onChange={handleChange} />
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" rows="3" name='description' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write course description here" onChange={handleChange}></textarea>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="start_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                            <input type="date" name="start_date" id="start_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Price of course" onChange={handleChange} />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                            <input type="text" name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Duration in days" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid mb-2 grid-cols-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Image</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" name='image' type="file" onChange={handleChange} />
                    </div>

                    <div className="grid mb-2 grid-cols-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="instructor">Select Instructor</label>
                        <div className="w-full h-40 bg-white dark:bg-gray-700 overflow-y-scroll">

                            <ul className="pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                                {
                                    instructors && instructors.map((instructor) => {
                                        return (
                                            <>
                                                <li key={instructor.user_id}>
                                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                        <input id="checkbox-item-1" type="checkbox" value={instructor.user_id} className="w-4 h-4 me-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleChange} />

                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <img className="w-8 h-8 rounded-full" src={instructor.image == null ?
                                                                    'avatar.png' : instructor.image} alt="image" />
                                                            </div>
                                                            <div className="flex-1 min-w-0 ms-4">
                                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    {instructor.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                    {instructor.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                            </>
                                        )

                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Create
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateCourse;
