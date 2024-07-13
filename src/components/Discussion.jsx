import React from 'react'
import { useState } from 'react'

const Discussion = () => {
    const [showFullContent, setShowFullContent] = useState(false);
    const toggleReadMore = () => {
        setShowFullContent(!showFullContent);
    };
    return (
        <>
            <div className=' mx-auto border rounded-lg p-5  bg-white mb-5'>
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-3">
                    <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                        Community Discussions
                    </h3>

                    <button class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        Create New
                    </button>

                </div>
            </div>
            <div className=' mx-auto border rounded-lg p-5  bg-white'>
                <article>
                    <div class="flex items-center mb-4">
                        <img class="w-10 h-10 me-4 rounded-full" src="/avatar.png" alt="" />
                        <div class="font-medium dark:text-white">
                            <p>Sandesh Dhital <time datetime="2024-07-13 19:00" class="block text-sm text-gray-500 dark:text-gray-400">Posted on 15<sup>th</sup> July 2024</time></p>
                        </div>
                    </div>


                    <p class={`mb-2  text-gray-500 dark:text-gray-400 text-justify ${showFullContent ? '' : 'line-clamp-2'}`}>"Imagine you're tasked with designing a database system for a large online retail platform like Amazon. Discuss which database model (relational, hierarchical, network, or object-oriented) you would choose and why. What are the key factors influencing your decision, such as scalability, performance, ease of maintenance, and data integrity? How might your choice impact the overall user experience and operational efficiency of such a platform?"

                        "Imagine you're tasked with designing a database system for a large online retail platform like Amazon. Discuss which database model (relational, hierarchical, network, or object-oriented) you would choose and why. What are the key factors influencing your decision, such as scalability, performance, ease of maintenance, and data integrity? How might your choice impact the overall user experience and operational efficiency of such a platform?"

                        "Imagine you're tasked with designing a database system for a large online retail platform like Amazon. Discuss which database model (relational, hierarchical, network, or object-oriented) you would choose and why. What are the key factors influencing your decision, such as scalability, performance, ease of maintenance, and data integrity? How might your choice impact the overall user experience and operational efficiency of such a platform?"
                    </p>
                    <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" onClick={toggleReadMore}>
                        {showFullContent ? 'Read less' : 'Read more'}
                    </a>

                    {/* <aside>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                <div class="flex items-center mt-3">
                    <a href="#" class="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Helpful</a>
                    <a href="#" class="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                </div>
            </aside> */}
                </article>

                <form>
                    <label for="chat" class="sr-only">Your message</label>
                    <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                            </svg>

                            <span class="sr-only">Upload image</span>
                        </button>

                        <input id="chat" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></input>
                        <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                            <span class="sr-only">Send message</span>
                        </button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Discussion