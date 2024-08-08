import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({});

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const checkLogin = () => {
        if (localStorage.getItem('user')) {
            setIsLogin(true);
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }
    useEffect(() => {
        checkLogin();
    }, []);


    return (
        <>
            <nav className="bg-transparent border-gray-200 dark:bg-gray-900 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">classX</span>
                    </Link>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {
                            isLogin ? (
                                <img className="w-8 h-8 rounded-full" src={user.image || './user.png'} alt="user photo"
                                    onClick={() => navigate('/lobby')} />

                            ) : (
                                <Link to='/login'>
                                    <button type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500">Login</button></Link>
                            )

                        }
                        <button onClick={toggleCollapse} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-expanded={!isCollapsed}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isCollapsed ? 'hidden' : ''}`} id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <HashLink to='#home' className="block py-2 px-3 text-white bg- rounded md:bg-transparent md:text-blue-600 md:p-0 md:dark:text-blue-600" aria-current="page">Home</HashLink>
                            </li>
                            <li>
                                <HashLink to='#course' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Courses</HashLink>
                            </li>
                            <li>
                                <HashLink to="#contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</HashLink>
                            </li>

                            {
                                user && user.user_type === 'admin' && (
                                    <li>
                                        <Link to='/create-course' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Course</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    );
};

export default Navbar;
