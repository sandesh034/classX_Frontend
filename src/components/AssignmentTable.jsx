import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const AssignmentTable = () => {
    const { assignment_id } = useParams();
    // console.log(assignment_id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [grading, setGrading] = useState({});
    const [assignmentSubmission, setAssignmentSubmission] = useState();
    const [selectedAssignmentSubmissionId, setselectedAssignmentSubmissionId] = useState();
    const [loading, setLoading] = useState(false);

    const fetchAssignmentSubmission = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/assignment/getSubmittion/dfa7a586-8ed7-4039-8265-dc14d469e7f5?assignment_id=${assignment_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();

            if (response.ok) {
                // console.log(data.data.submission);
                setAssignmentSubmission(data.data.submission);
            }
            else {
                // console.log(data.message);
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setGrading({
            ...grading, [e.target.name]: e.target.value
        });
        console.log(grading);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/assignment/grade/dfa7a586-8ed7-4039-8265-dc14d469e7f5?assignment_submit_id=${selectedAssignmentSubmissionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(grading)
            })
            const data = await response.json();
            if (response.ok) {
                // console.log(data.message);
                handleCloseModal()
                toast.success(data.message);
                fetchAssignmentSubmission();
                setLoading(false);
                setGrading({});
            }
            else {
                // console.log(data.message);
                toast.error(data.message);
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        fetchAssignmentSubmission();
    }, [])
    // console.log(assignmentSubmission);

    return (
        <>
            <Navbar />
            <div className="relative overflow-x-auto shadow-md ">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='bg-blue-600 text-white'>
                            <th scope="col" className="px-2 py-3 w-1/12">
                                Student
                            </th>
                            <th scope="col" className="px-2 py-3 text-center w-1/6">
                                Submission
                            </th>
                            <th scope="col" className="px-2 py-3 text-center w-1/12">
                                Obtained Marks
                            </th>
                            <th scope="col" className="px-2 py-3 text-center w-1/12">
                                Status
                            </th>
                            <th scope="col" className="px-2 py-3 text-center w-1/6">
                                Description
                            </th>
                            <th scope="col" className="px-2 py-3 text-center w-1/6">
                                Attachment
                            </th>

                            <th scope="col" className="px-2 py-3 text-center w-1/6">
                                Comment
                            </th>

                            <th scope="col" className="px-2 py-3 text-center w-1/12">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            assignmentSubmission && assignmentSubmission.map((submission) => {
                                return (
                                    <>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-2 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img className="w-10 h-10 rounded-full" src={submission.student_image || '/user.png'} alt="" />
                                                    <div className=" text-gray-900 dark:text-white" >
                                                        {submission.student_name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-4 text-center">
                                                <p >Submission Date: <span>{new Date(submission.submission_date).toLocaleDateString()}</span></p>
                                                <p >Submission Time: <span>{new Date('1970-01-01T' + submission.submission_time + 'Z').toLocaleTimeString('en-US', { hour12: true, timeZone: 'UTC' })}</span></p>
                                            </td>
                                            <td className='px-2 py-4 text-center'>
                                                {submission.obtained_marks == null ? '-' : submission.obtained_marks}
                                            </td>
                                            <td className="px-2 py-4 text-center">
                                                {
                                                    submission.status == 'Ungraded' && <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Ungraded</span>
                                                }
                                                {
                                                    submission.status == 'Pass' && <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Pass</span>
                                                }
                                                {
                                                    submission.status == 'Fail' && <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Fail</span>
                                                }
                                            </td>
                                            <td className={`px-2 py-4 ${submission.description == null ? 'text-center' : 'text-justify'}`}>
                                                {submission.description == null ? '-' : submission.description}

                                            </td>
                                            <td className={'px-2 py-4 text-center'}>
                                                {submission.attachment == null ? '-' : (
                                                    <>
                                                        <button type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-0.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2" onClick={() => window.open(submission.attachment, "_blank").focus()}>
                                                            <svg class="w-6 h-6 me-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                                <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>

                                                            View
                                                        </button>
                                                    </>
                                                )}

                                            </td>
                                            <td className={`px-2 py-4 ${submission.comment == null ? 'text-center' : 'text-justify'}`}>
                                                {submission.comment == null ? '-' : submission.comment}

                                            </td>
                                            <td className="px-2 py-4 ">
                                                <button
                                                    type="button"
                                                    className={`text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${submission.comment != null || submission.obtained_marks != null ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setselectedAssignmentSubmissionId(submission.assignment_submit_id);
                                                    }}
                                                    disabled={submission.comment != null || submission.obtained_marks != null}
                                                >
                                                    Grade
                                                </button>

                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>


            {/*modal*/}
            <div>

                <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={handleCloseModal}></div>

                <div id="modal" className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>
                    <div className="relative p-4 w-full max-w-xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Grade Assignment
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
                                    <div className="flex items-center justify-center w-40 mx-auto h-40 ">
                                        <div role="status">
                                            <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>

                                    <form method='post' onSubmit={handleSubmit} className="p-4 md:p-5">
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="obtained_marks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Obtained Marks</label>
                                                <input type="text" name="obtained_marks" id="obtained_marks" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Obtained Marks" onChange={handleChange} required value={grading.obtained_marks} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                                                <textarea id="comment" rows="4" name="comment" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write description here (optional)" onChange={handleChange} value={grading.comment}></textarea>
                                            </div>
                                        </div>

                                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setselectedAssignmentSubmissionId(submission.assignment_submit_id)}>
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

export default AssignmentTable