import React, { useState } from 'react'

const AssignmentTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [grading, setGrading] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setGrading({
            ...grading, [e.target.name]: e.target.value
        });
        console.log(grading);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }


    const handleCloseModal = () => {
        setIsModalOpen(false);
        try {
            setLoading(true);


        } catch (error) {

        }
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='bg-blue-600 text-white'>
                            <th scope="col" className="px-2 py-3">
                                Student
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Submission
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Obtained Marks
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Description
                            </th>

                            <th scope="col" className="px-2 py-3">
                                Comment
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-2 py-4">
                                <div className="flex items-center gap-4">
                                    <img className="w-10 h-10 rounded-full" src="/avatar.png" alt="" />
                                    <div className=" text-gray-900 dark:text-white" >
                                        Sandesh Dhital
                                    </div>
                                </div>
                            </td>
                            <td className="px-2 py-4">
                                <p >Submission Date: <span>{new Date().toLocaleDateString()}</span></p>
                                <p >Submission Time: <span>{new Date().toLocaleTimeString()}</span></p>
                            </td>
                            <td className="px-2 py-4">
                                96
                            </td>
                            <td className="px-2 py-4">
                                <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">pass / fail/ ungraded</span>
                            </td>
                            <td className="px-2 py-4 ">
                                Well Done. But need to improve more.

                            </td>
                            <td className="px-2 py-4 ">
                                Well Done. But need to improve more.

                            </td>
                            <td className="px-2 py-4 ">
                                <button type="button" className="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={() => setIsModalOpen(true)}>Evaluate</button>

                            </td>
                        </tr>

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
                                                <input type="text" name="obtained_marks" id="obtained_marks" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Obtained Marks (0-FM)" onChange={handleChange} required />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                                                <textarea id="comment" rows="4" name="comment" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write description here (optional)" onChange={handleChange}></textarea>
                                            </div>
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

export default AssignmentTable