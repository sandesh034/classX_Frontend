import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";

function Calendar() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [classes, setClasses] = useState([])
    const [scheduleClass, setScheduleClass] = useState({
        title: null,
        date: null,
        time: null,
        duration: null
    });
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleChange = (e) => {
        setScheduleClass({
            ...scheduleClass,
            [e.target.name]: e.target.value
        })
        console.log(scheduleClass)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/routine/schedule/dfa7a586-8ed7-4039-8265-dc14d469e7f5`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scheduleClass),
                credentials: 'include'
            })
            const data = await response.json()
            if (response.ok) {
                setLoading(false)
                setIsModalOpen(false)
                fetchClasses()
                toast.success(data.message)
            }
            else {
                setLoading(false)
                console.log(data.message)
                toast.error(data.message)
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const fetchClasses = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/routine/dfa7a586-8ed7-4039-8265-dc14d469e7f5`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            const data = await response.json()
            if (response.ok) {
                setClasses(data.data)
                // console.log(data.data)
            }
            else {
                console.log(data.message)
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const handleEventClick = (info) => {
        navigate('/video-calling')

    };

    useEffect(() => {
        fetchClasses()
    }, [])



    return (
        <>
            <div className=' mx-auto border rounded-lg p-5 pb-5  bg-white mb-5'>
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-3">
                    <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                        Routine
                    </h3>

                    <button class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { setIsModalOpen(true) }}>
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        Add Class
                    </button>

                </div>
            </div>

            <div className=' mx-auto border rounded-lg p-5  bg-white mb-5'>
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                        start: "prev,next", // will normally be on the left. if RTL, will be on the right
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
                    }}
                    height={"60vh"}

                    // events={[
                    //     { title: 'event 1', start: '2024-07-13T10:00:00', end: '2024-07-13T12:00:00' },
                    //     { title: 'event 2', start: '2024-07-13T13:00:00', end: '2024-07-13T14:00:00' }
                    // ]}

                    events={classes}
                    eventClick={handleEventClick}
                />
            </div>


            {/* Modal */}
            < div >

                <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={handleCloseModal}></div>

                <div id="modal" className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>
                    <div className="relative p-4 w-full max-w-xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Schedule Class
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

                                    <form method='post' onSubmit={handleSubmit} className="p-4 pt-1 md:p-5">
                                        <div className="grid gap-4 mb-2 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title " onChange={handleChange} />
                                            </div>

                                        </div>


                                        <div class="grid gap-4 mb-4 grid-cols-2">
                                            <div class="col-span-2 sm:col-span-1">
                                                <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                                <input type="date" name="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" onChange={handleChange} />
                                            </div>
                                            <div class="col-span-2 sm:col-span-1">


                                                <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                                <div class="relative">
                                                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <input type="time" id="time" name='time' class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChange} />
                                                </div>


                                            </div>
                                        </div>
                                        <div className="grid gap-4 mb-5 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                                                <input type="text" name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Duration in minutes " onChange={handleChange} />
                                            </div>

                                        </div>

                                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                            Schedule
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div >




        </>
    );
}

export default Calendar;
