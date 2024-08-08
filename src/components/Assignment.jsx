import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Assignment = () => {
    const { course_id } = useParams()
    // console.log(course_id)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitModelOpen, setIsSubmitModelOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [assignmentPost, setAssignmentPost] = useState({
        title: null,
        description: null,
        deadline_date: null,
        deadline_time: null,
        full_marks: null,
        pass_marks: null,
        attachment: null
    })

    const [assignments, setAssignments] = useState([{
        title: null,
        description: null,
        deadline_date: null,
        deadline_time: null,
        full_marks: null,
        pass_marks: null,
        attachment: null,
        instructor_name: null,
        instructor_image: null,
        total_submissions: null,
        assignment_id: null
    }]);

    const [assignmentSubmission, setAssignmentSubmission] = useState({
        title: null,
        description: null,
        attachment: null
    })
    const handleSubmitModelClose = () => {
        setIsSubmitModelOpen(false);
    }


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.name === 'attachment') {
            setAssignmentPost({
                ...assignmentPost,
                [e.target.name]: e.target.files[0]
            })
        }
        else {
            setAssignmentPost({
                ...assignmentPost,
                [e.target.name]: e.target.value
            })
        }
        // console.log(assignmentPost)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', assignmentPost.title);
        formData.append('description', assignmentPost.description);
        formData.append('deadline_date', assignmentPost.deadline_date);
        formData.append('deadline_time', assignmentPost.deadline_time);
        formData.append('full_marks', assignmentPost.full_marks);
        formData.append('pass_marks', assignmentPost.pass_marks);
        formData.append('attachment', assignmentPost.attachment);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/assignment/post/${course_id}`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok) {
                // console.log('Assignment uploaded successfully')
                toast.success(data.message);
                setLoading(false);
                setIsModalOpen(false);
                fetchAssignment();
            }

            else {
                // console.log('Assignment upload failed')
                toast.error(data.message);
                setLoading(false);
                setIsModalOpen(false);
            }

        } catch (error) {
            console.log(error)

        }
    }

    const fetchAssignment = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/assignment/get/${course_id}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok) {
                // console.log('Assignment fetched successfully')
                setAssignments(data.data)
            }

            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error)

        }
    }

    const handleAssignmentChange = (e) => {
        if (e.target.name === 'attachment') {
            setAssignmentSubmission({
                ...assignmentSubmission,
                [e.target.name]: e.target.files[0]
            })
        }
        else {
            setAssignmentSubmission({
                ...assignmentSubmission,
                [e.target.name]: e.target.value
            })
        }
        // console.log(assignmentSubmission)
    }

    const handleAssignmentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', assignmentSubmission.title);
        formData.append('description', assignmentSubmission.description);
        formData.append('attachment', assignmentSubmission.attachment);
        try {
            const url = `${import.meta.env.VITE_API_BASE_URL}/course/assignment/submit/${course_id}?assignment_id=${selectedAssignment}`
            console.log(url)
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok) {
                // console.log('Assignment submitted successfully')
                toast.success(data.message);
                setLoading(false);
                setIsSubmitModelOpen(false);
                fetchAssignment();
            }

            else {
                // console.log('Assignment submission failed')
                toast.error(data.message);
                setLoading(false);
                setIsSubmitModelOpen(false);
            }

        } catch (error) {
            console.log(error)

        }
    }


    useEffect(() => {
        fetchAssignment();
    }, [])

    // // console.log(assignments)
    // console.log(selectedAssignment)

    return (
        <>
            <div className=' mx-auto border rounded-lg p-5  bg-white mb-5'>
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-3">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Assignment
                    </h3>

                    {
                        localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user_type == 'instructor' &&

                        <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setIsModalOpen(true)}>
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add New
                        </button>
                    }

                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
                {
                    assignments && assignments.map((assignment) => {

                        return (
                            <>
                                <div className="block max-w-xl p-1 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 m-2">

                                    <div class="flex md:flex-row flex-row items-center bg-white  md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 mb-1 ">
                                        <svg class="min-w-24 min-h-24  text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clip-rule="evenodd" />
                                            <path fill-rule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clip-rule="evenodd" />
                                        </svg>
                                        <div class="flex flex-col justify-between p-4 leading-normal">
                                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {assignment.title}
                                            </h5>
                                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{assignment.description}</p>
                                            <div class="flex flex-col md:flex-row gap-6 mb-3">

                                                <div class="flex items-center gap-4">
                                                    <img class="w-10 h-10 rounded-full" src={assignment.instructor_image} alt="" />
                                                    <div class=" text-gray-900 dark:text-white" >
                                                        {assignment.instructor_name}
                                                    </div>
                                                </div>

                                                <div class="flex items-center text-gray-900 rounded-lg dark:text-white  group">
                                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                                                    </svg>
                                                    <span class="ms-3">{new Date(assignment.deadline_date).toLocaleDateString()}</span>
                                                </div>

                                                <div class="flex items-center text-gray-900 rounded-lg dark:text-white group">
                                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>

                                                    <span class="ms-3">{new Date('1970-01-01T' + assignment.deadline_time + 'Z').toLocaleTimeString('en-US', { hour12: true, timeZone: 'UTC' })}</span>
                                                </div>



                                            </div>

                                            <div class="flex flex-col justify-between md:flex-row gap-6">

                                                {/* {new Date() <= new Date(`${assignment.deadline_date.split('T')[0]}T${assignment.deadline_time}Z`) ?
                                                    <p>Status : <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Open</span></p>
                                                    :
                                                    <p> Status : <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Expired</span></p>
                                                } */}


                                                <button type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-0.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2" onClick={() => window.open(assignment.attachment, "_blank").focus()}>
                                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
                                                    </svg>
                                                    Download Resource
                                                </button>

                                            </div>

                                        </div>


                                    </div>
                                    <hr></hr>

                                    <div class="flex gap-5 md:flex-row md:max-w-xl justify-between my-2">
                                        <div class="flex flex-col items-center justify-center  px-3">
                                            <dt class="mb-1 text-sm font-bold">Full Marks</dt>
                                            <dd class="text-gray-500 dark:text-gray-400">{assignment.full_marks}</dd>
                                        </div>

                                        <div class="flex flex-col items-center justify-center  px-3">
                                            <dt class="mb-1 text-sm font-bold">Pass Marks</dt>
                                            <dd class="text-gray-500 dark:text-gray-400">{assignment.pass_marks}</dd>
                                        </div>

                                        <div class="flex flex-col items-center justify-center  px-3">
                                            <dt class="mb-1 text-sm font-bold">Submissions</dt>
                                            <dd class="text-gray-500 dark:text-gray-400">{assignment.total_submissions}</dd>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className='flex items-center justify-center cursor-pointer'>
                                        {
                                            localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user_type == 'instructor' ?
                                                (
                                                    <>
                                                        <button type="button" class={`text-center text-blue-700 hover:text-blue-800 font-medium rounded-lg text-md  py-2.5  inline-flex items-center dark:text-blue-600 dark:hover:text-blue-70 ${assignment.total_submissions < 1 ? 'cursor-not-allowed' : ''}`} onClick={() => navigate(`/assignment-submission/${course_id}/${assignment.assignment_id}`)}>
                                                            View Details
                                                            <svg class="rtl:rotate-180 w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                ) :
                                                (
                                                    <>
                                                        <button type="button" class="text-center text-blue-700 hover:text-blue-800 font-medium rounded-lg text-md  py-2.5  inline-flex items-center dark:text-blue-600 dark:hover:text-blue-70" onClick={() => {
                                                            setSelectedAssignment(assignment.assignment_id)
                                                            setIsSubmitModelOpen(true)
                                                        }}
                                                        >
                                                            Submit Assignment
                                                            <svg class="rtl:rotate-180 w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                            </svg>
                                                        </button>
                                                    </>

                                                )
                                        }

                                    </div>

                                </div >
                            </>
                        )

                    }
                    )
                }
            </div>
            {
                assignments == null && (
                    <>
                        <div className=' flex  flex-col items-center justify-center'>
                            <svg class="w-40 h-40 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path d="M10.5 15L13.5 12M13.5 15L10.5 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975M21.9913 16C21.9554 18.4796 21.7715 19.8853 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
                            </svg>
                            <p className='font-medium text-bold '>No Assignment Found</p>

                        </div>

                    </>
                )

            }

            {/* Modal */}
            < div >
                <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={handleCloseModal}></div>

                <div id="modal" className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>
                    <div className="relative p-4 w-full max-w-xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Add Assignment
                                </h3>
                                <button type="button" onClick={handleCloseModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {loading ? (
                                <>
                                    <div class="flex items-center justify-center w-40 mx-auto h-40 ">
                                        <div role="status">
                                            <svg aria-hidden="true" class="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>

                                    <form method='post' encType='multipart/form-data' onSubmit={handleSubmit} className="p-4 pt-1 md:p-5">
                                        <div className="grid gap-4 mb-2 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title " onChange={handleChange} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <textarea id="description" rows="3" name='description' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write description here" onChange={handleChange} ></textarea>
                                            </div>
                                        </div>


                                        <div class="grid gap-4 mb-4 grid-cols-2">
                                            <div class="col-span-2 sm:col-span-1">
                                                <label for="deadline_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline Date</label>
                                                <input type="date" name="deadline_date" id="deadline_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" onChange={handleChange} />
                                            </div>
                                            <div class="col-span-2 sm:col-span-1">
                                                {/* <label for="deadline_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline Time</label>
                                                <input type="time" name="deadline_time" id="deadline_time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" onChange={handleChange} /> */}

                                                <label for="deadline_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline Time</label>
                                                <div class="relative">
                                                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <input type="time" id="deadline_time" name='deadline_time' class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChange} />
                                                </div>


                                            </div>
                                        </div>

                                        <div class="grid gap-4 mb-2 grid-cols-2">

                                            <div class="col-span-2 sm:col-span-1">
                                                <label for="full_marks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Marks</label>
                                                <input type="text" name="full_marks" id="full_marks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" onChange={handleChange} />
                                            </div>
                                            <div class="col-span-2 sm:col-span-1">
                                                <label for="pass_marks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pass Marks</label>
                                                <input type="text" name="pass_marks" id="pass_marks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" onChange={handleChange} />

                                            </div>

                                        </div>
                                        <div class="grid mb-2 grid-cols-1">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="attachment">Upload file</label>
                                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="attachment" name='attachment' type="file" onChange={handleChange} />
                                        </div>


                                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                            Add
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div >



            {/* submit Modal */}
            < div >
                <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isSubmitModelOpen ? 'block' : 'hidden'}`} onClick={handleSubmitModelClose}></div>

                <div id="modal" className={`fixed inset-0 z-50 flex items-center justify-center ${isSubmitModelOpen ? 'block' : 'hidden'}`}>
                    <div className="relative p-4 w-full max-w-xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Submit Assignment
                                </h3>
                                <button type="button" onClick={handleSubmitModelClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {loading ? (
                                <>
                                    <div class="flex items-center justify-center w-40 mx-auto h-40 ">
                                        <div role="status">
                                            <svg aria-hidden="true" class="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>

                                    <form method='post' encType='multipart/form-data' onSubmit={handleAssignmentSubmit} className="p-4 pt-1 md:p-5">
                                        <div className="grid gap-4 mb-2 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title " onChange={handleAssignmentChange} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <textarea id="description" rows="3" name='description' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write description here" onChange={handleAssignmentChange} ></textarea>
                                            </div>
                                        </div>

                                        <div class="grid mb-2 grid-cols-1">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="attachment">Upload file</label>
                                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="attachment" name='attachment' type="file" onChange={handleAssignmentChange} />
                                        </div>


                                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                            Submit
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}


export default Assignment