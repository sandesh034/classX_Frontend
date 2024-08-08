import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Discussion = () => {
    const { course_id } = useParams()
    // console.log(course_id)
    const [showFullContent, setShowFullContent] = useState(false);
    const [activeDiscussion, setActiveDiscussion] = useState(null);
    const [showReply, setShowReply] = useState(false);
    const [discussions, setDiscussions] = useState([]);
    const [replyText, setReplyText] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [createDiscussion, setCreateDiscussion] = useState({
        title: null,
        description: null,
    });

    const handleDiscussionPostChange = (e) => {
        setCreateDiscussion({
            ...createDiscussion,
            [e.target.name]: e.target.value
        });
        // console.log(createDiscussion);
    }


    const postDiscussion = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/forum/post/${course_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(createDiscussion)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                fetchDiscussions();
                setIsModalOpen(false);
                setCreateDiscussion({
                    title: null,
                    description: null,
                })
                // console.log('posted successfully');
            }
            else {
                toast.error(data.message || 'An error occurred');
            }


        } catch (error) {
            toast.error(error.message);
            console.error('Fetch error:', error);
        }
    }


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const toggleReadMore = (id) => {
        setShowFullContent((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const toggleReply = (id) => {
        setShowReply((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleReplyChange = (e) => {
        setReplyText({
            ...replyText,
            [e.target.name]: e.target.value

        })
        // console.log(replyText);
    }

    const handlePostReply = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/forum/reply/${course_id}?forum_id=${activeDiscussion}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(replyText)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                fetchDiscussions();
                setReplyText({
                    reply_text: null
                })

                // console.log('posted successfully');
            } else {
                toast.error(data.message || 'An error occurred');
            }

        } catch (error) {
            toast.error(error.message);
            console.error('Fetch error:', error);

        }
    }


    const fetchDiscussions = async () => {
        // console.log('fetching discussions');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/forum/list/${course_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                setDiscussions(data.data);
            } else {
                toast.error(data.message || 'An error occurred');
            }
        } catch (error) {
            toast.error(error.message);
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchDiscussions();
    }, []);

    const indexOfLastDiscussion = currentPage * itemsPerPage;
    const indexOfFirstDiscussion = indexOfLastDiscussion - itemsPerPage;
    const currentDiscussions = discussions.slice(indexOfFirstDiscussion, indexOfLastDiscussion);
    return (
        <>
            <div className=' mx-auto border rounded-lg p-5  bg-white mb-5'>
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-3">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Community Discussions
                    </h3>

                    <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setIsModalOpen(true)}>
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Create New
                    </button>

                </div>
            </div>

            {

                currentDiscussions.map((discussion) => {
                    return (
                        <>
                            <div className=' mx-auto border rounded-lg p-5  bg-white mb-5'>
                                <article>
                                    <div className="flex items-center mb-4">
                                        <img className="w-10 h-10 me-4 rounded-full" src="/avatar.png" alt="" />
                                        <div className="font-medium dark:text-white">
                                            <p>{discussion.posted_by}<time datetime="2024-07-13 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Posted on {new Date(discussion.posted_at).toLocaleString()}</time></p>
                                        </div>
                                    </div>
                                    <p className={`mb-2 text-gray-500 dark:text-gray-400 text-justify ${showFullContent[discussion.forum_id] ? '' : 'line-clamp-2'}`}>
                                        {discussion.description}
                                    </p>

                                    <div className='flex items-center justify-between'>
                                        <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" onClick={() => toggleReadMore(discussion.forum_id)}>
                                            {showFullContent[discussion.forum_id] ? 'Read less' : 'Read more'}
                                        </a>

                                        <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" onClick={() => toggleReply(discussion.forum_id)}>
                                            {discussion.reply_count} Replies
                                        </a>
                                    </div>


                                </article >
                                <div className={`${showReply[discussion.forum_id] ? 'block' : 'hidden'}`}>
                                    <div className='my-3 font-bold text-xl'>Replies</div>
                                    <hr className='mb-5'></hr>
                                    {
                                        discussion.replies.map((reply) => {
                                            return (
                                                <div className="flex items-start gap-2.5 mb-3">
                                                    <img className="w-8 h-8 rounded-full" src={'/avatar.png'} alt="image" />
                                                    <div className="flex flex-col gap-1 w-full ]">
                                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{`${reply.replied_by}`}</span>
                                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{`${new Date()}) `}</span>
                                                        </div>
                                                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-50 rounded-e-xl rounded-es-xl">
                                                            <p className="text-sm font-normal text-gray-900 ">{`${reply.reply_text}`}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <form onSubmit={handlePostReply} method='post'>
                                    <label htmlFor="reply" className="sr-only">Your message</label>
                                    <div className="flex items-center pe-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">


                                        <input id="reply" className="block ms-2 me-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave your reply..." name='reply_text' onChange={handleReplyChange}></input>

                                        <button type="submit" onClick={() => setActiveDiscussion(discussion.forum_id)} className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                            </svg>
                                            <span className="sr-only">Send message</span>
                                        </button>
                                    </div>
                                </form>
                            </div >
                        </>
                    )
                })
            }

            <div>
                {/* Backdrop Overlay */}
                <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={handleCloseModal}></div>

                <div id="modal" className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>
                    <div className="relative p-4 w-full max-w-xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Post Discussion
                                </h3>
                                <button type="button" onClick={handleCloseModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <form method='post' onSubmit={postDiscussion} class="p-4 md:p-5">
                                <div class="grid gap-4 mb-4 grid-cols-2">
                                    <div class="col-span-2">
                                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                        <input type="text" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Discussion title" required onChange={handleDiscussionPostChange} value={createDiscussion.title} />
                                    </div>

                                    <div class="col-span-2">
                                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <textarea id="description" rows="4" name='description' class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write  description here" onChange={handleDiscussionPostChange} required value={createDiscussion.description}></textarea>
                                    </div>
                                </div>
                                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className={discussions.length < itemsPerPage ? 'hidden' : `flex items-center justify-center`}>
                <nav aria-label="Page navigation">
                    <ul className="inline-flex -space-x-px text-base h-10">
                        <li>
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Previous
                            </button>
                        </li>

                        {Array.from({ length: Math.ceil(discussions.length / itemsPerPage) }, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === Math.ceil(discussions.length / itemsPerPage)}
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>

    )
}

export default Discussion
