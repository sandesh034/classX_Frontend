import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';



const Resources = () => {
    const [activeTab, setActiveTab] = useState('document');
    const [Resources, setResources] = useState();
    const [loading, setLoading] = useState(false);

    const [uploadResource, setUploadResource] = useState({
        title: null,
        description: null,
        attachment: null
    })

    const handleChange = (e) => {
        if (e.target.name === 'attachment') {
            setUploadResource({ ...uploadResource, [e.target.name]: e.target.files[0] })
        }
        else {
            setUploadResource({ ...uploadResource, [e.target.name]: e.target.value })
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    function getFileExtension(url) {
        const pathname = new URL(url).pathname;
        const fileExtension = pathname.split('.').pop();

        return fileExtension;
    }


    function getFileName(url) {
        const pathname = new URL(url).pathname;
        const fileName = pathname.substring(pathname.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, '');
        return fileName;
    }

    // async function getFileSize(url) {
    //     const response = await fetch(url, {
    //         method: 'HEAD',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     const size = response.headers.get('content-length')
    //     const sizeInMB = Math.ceil(size / (1024 * 1024));
    //     return sizeInMB;
    // }


    const imageExtensions = [
        "jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "webp", "svg", "heic", "raw", "ico",
        "jfif", "jpe", "jif", "jfi", "jp2", "jpx", "j2k", "j2c", "fpx", "pcd", "psd", "ai", "eps",
        "indd", "cdr", "svgz", "dwg", "dxf", "skp", "3ds", "dae", "stp", "obj", "max", "blend",
        "stl", "fbx", "ma", "mb", "lxo", "lwo", "lws", "abc", "ply", "obj", "x3d"
    ];

    const documentExtensions = ['pdf', 'docx', 'xlsx', 'pptx', 'txt']


    const fetchResources = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/resource/list/dfa7a586-8ed7-4039-8265-dc14d469e7f5`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            const data = await response.json()
            if (response.ok) {
                setResources(data.data)

            }
            else {
                toast.error(data.message)
                console.log(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('title', uploadResource.title);
        formData.append('description', uploadResource.description);
        formData.append('attachment', uploadResource.attachment);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/resource/upload/dfa7a586-8ed7-4039-8265-dc14d469e7f5`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(data.message)
                fetchResources()
                handleCloseModal()
                setLoading(false)
            }
            else {
                toast.error(data.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchResources()
    }, [])
    // console.log(Resources)

    return (
        <>
            <div className=' mx-auto border rounded-lg p-5  bg-white mb-5'>
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-3">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Resources
                    </h3>

                    <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setIsModalOpen(true)}>
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add New
                    </button>

                </div>
            </div>
            <div className=' mx-auto border rounded-lg p-5  bg-white mb-5'>
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" >
                        <li className="me-2">
                            <a
                                href="#"
                                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${activeTab === 'document'
                                    ? 'text-blue-600 border-blue-600'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                    } dark:text-gray-400 group`}
                                onClick={() => handleTabClick('document')}
                            >
                                <svg className="w-6 h-6 me-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4 4.69434V18.6943C4 20.3512 5.34315 21.6943 7 21.6943H17C18.6569 21.6943 20 20.3512 20 18.6943V8.69434C20 7.03748 18.6569 5.69434 17 5.69434H5C4.44772 5.69434 4 5.24662 4 4.69434ZM7.25 11.6943C7.25 11.2801 7.58579 10.9443 8 10.9443H16C16.4142 10.9443 16.75 11.2801 16.75 11.6943C16.75 12.1085 16.4142 12.4443 16 12.4443H8C7.58579 12.4443 7.25 12.1085 7.25 11.6943ZM7.25 15.1943C7.25 14.7801 7.58579 14.4443 8 14.4443H13.5C13.9142 14.4443 14.25 14.7801 14.25 15.1943C14.25 15.6085 13.9142 15.9443 13.5 15.9443H8C7.58579 15.9443 7.25 15.6085 7.25 15.1943Z" fill="#1C274D" />
                                    <path opacity="0.5" d="M18 4.00038V5.86504C17.6872 5.75449 17.3506 5.69434 17 5.69434H5C4.44772 5.69434 4 5.24662 4 4.69434V4.62329C4 4.09027 4.39193 3.63837 4.91959 3.56299L15.7172 2.02048C16.922 1.84835 18 2.78328 18 4.00038Z" fill="#1C274D" />
                                </svg>
                                Documents
                            </a>
                        </li>

                        <li className="me-2">
                            <a
                                href="#"
                                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${activeTab === 'image'
                                    ? 'text-blue-600 border-blue-600'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                    } dark:text-gray-400 group`}
                                onClick={() => handleTabClick('image')}
                            >
                                <svg className="w-6 h-6 me-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd" />
                                </svg>

                                Images
                            </a>
                        </li>

                        <li className="me-2">
                            <a
                                href="#"
                                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${activeTab === 'audio'
                                    ? 'text-blue-600 border-blue-600'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                    } dark:text-gray-400 group`}
                                onClick={() => handleTabClick('audio')}
                            >

                                <svg className="w-6 h-6 me-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.75 12.508L21.25 9.108V14.7609C20.7449 14.4375 20.1443 14.25 19.5 14.25C17.7051 14.25 16.25 15.7051 16.25 17.5C16.25 19.2949 17.7051 20.75 19.5 20.75C21.2949 20.75 22.75 19.2949 22.75 17.5C22.75 17.5 22.75 17.5 22.75 17.5L22.75 7.94625C22.75 6.80342 22.75 5.84496 22.6696 5.08131C22.6582 4.97339 22.6448 4.86609 22.63 4.76597C22.5525 4.24426 22.4156 3.75757 22.1514 3.35115C22.0193 3.14794 21.8553 2.96481 21.6511 2.80739C21.6128 2.77788 21.573 2.74927 21.5319 2.7216L21.5236 2.71608C20.8164 2.2454 20.0213 2.27906 19.2023 2.48777C18.4102 2.68961 17.4282 3.10065 16.224 3.60469L14.13 4.48115C13.5655 4.71737 13.0873 4.91751 12.712 5.1248C12.3126 5.34535 11.9686 5.60548 11.7106 5.99311C11.4527 6.38075 11.3455 6.7985 11.2963 7.25204C11.25 7.67831 11.25 8.19671 11.25 8.80858V16.7609C10.7448 16.4375 10.1443 16.25 9.5 16.25C7.70507 16.25 6.25 17.7051 6.25 19.5C6.25 21.2949 7.70507 22.75 9.5 22.75C11.2949 22.75 12.75 21.2949 12.75 19.5C12.75 19.5 12.75 19.5 12.75 19.5L12.75 12.508Z" fill="#1C274C" />
                                    <path opacity="0.5" d="M7.75 2C7.75 1.58579 7.41421 1.25 7 1.25C6.58579 1.25 6.25 1.58579 6.25 2V7.76091C5.74485 7.4375 5.14432 7.25 4.5 7.25C2.70507 7.25 1.25 8.70507 1.25 10.5C1.25 12.2949 2.70507 13.75 4.5 13.75C6.29493 13.75 7.75 12.2949 7.75 10.5V5.0045C8.44852 5.50913 9.27955 5.75 10 5.75C10.4142 5.75 10.75 5.41421 10.75 5C10.75 4.58579 10.4142 4.25 10 4.25C9.54565 4.25 8.9663 4.07389 8.51159 3.69837C8.0784 3.34061 7.75 2.79785 7.75 2Z" fill="#1C274C" />
                                </svg>
                                Audios
                            </a>
                        </li>

                        <li className="me-2">
                            <a
                                href="#"
                                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${activeTab === 'video'
                                    ? 'text-blue-600 border-blue-600'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                    } dark:text-gray-400 group`}
                                onClick={() => handleTabClick('video')}
                            >

                                <svg className="w-6 h-6 me-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.3276 7.54199H8.67239C5.29758 7.54199 3.61017 7.54199 2.66232 8.52882C1.71447 9.51565 1.93748 11.0403 2.38351 14.0895L2.80648 16.9811C3.15626 19.3723 3.33115 20.5679 4.22834 21.2839C5.12553 21.9999 6.4488 21.9999 9.09534 21.9999H14.9046C17.5512 21.9999 18.8745 21.9999 19.7717 21.2839C20.6689 20.5679 20.8437 19.3723 21.1935 16.9811L21.6165 14.0895C22.0625 11.0403 22.2855 9.51564 21.3377 8.52882C20.3898 7.54199 18.7024 7.54199 15.3276 7.54199ZM14.5812 15.7942C15.1396 15.448 15.1396 14.5519 14.5812 14.2057L11.2096 12.1156C10.6669 11.7792 10 12.2171 10 12.9098V17.0901C10 17.7828 10.6669 18.2207 11.2096 17.8843L14.5812 15.7942Z" fill="#1C274C" />
                                    <path opacity="0.4" d="M8.50956 2.00001H15.4897C15.7221 1.99995 15.9004 1.99991 16.0562 2.01515C17.164 2.12352 18.0708 2.78958 18.4553 3.68678H5.54395C5.92846 2.78958 6.83521 2.12352 7.94303 2.01515C8.09884 1.99991 8.27708 1.99995 8.50956 2.00001Z" fill="#1C274C" />
                                    <path opacity="0.7" d="M6.3102 4.72266C4.91958 4.72266 3.77931 5.56241 3.39878 6.67645C3.39085 6.69967 3.38325 6.72302 3.37598 6.74647C3.77413 6.6259 4.18849 6.54713 4.60796 6.49336C5.68833 6.35485 7.05367 6.35492 8.6397 6.35501H15.5318C17.1178 6.35492 18.4832 6.35485 19.5635 6.49336C19.983 6.54713 20.3974 6.6259 20.7955 6.74647C20.7883 6.72302 20.7806 6.69967 20.7727 6.67645C20.3922 5.56241 19.2519 4.72266 17.8613 4.72266H6.3102Z" fill="#1C274C" />
                                </svg>
                                Videos
                            </a>
                        </li>

                    </ul>
                </div>


                {/*tabcontent*/}


                <div className={`${activeTab === 'document' ? 'block' : 'hidden'} mt-8`}>
                    <div className='w-full mx-auto gap-3'>
                        {Resources && Resources.map((resource) => {
                            if (documentExtensions.includes(getFileExtension(resource.attachment))) {
                                return (
                                    <>
                                        <div className="flex items-start gap-2.5 mb-5">
                                            <img className="h-8 w-8 rounded-full" src={'/avatar.png'} alt="image" />
                                            <div className="flex flex-col gap-2.5">
                                                <div className="flex flex-col justify-start  space-x-2 rtl:space-x-reverse">
                                                    <div>
                                                        <span className="text-sm me-3 font-semibold text-gray-900 dark:text-white">
                                                            {resource.user_name}
                                                        </span>
                                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                            {`${new Date(resource.created_at).toLocaleString()}`}
                                                        </span>
                                                    </div>
                                                    <p className='mb-2 text-gray-500 dark:text-gray-400 text-justify'>
                                                        {resource.description}
                                                    </p>
                                                </div>
                                                <div className="leading-1.5 flex w-[300px] flex-col">
                                                    <div className="flex items-start bg-gray-50 dark:bg-gray-700 rounded-xl p-2">
                                                        <div className="me-2">
                                                            <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                                                                <svg class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-1 9a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm2-5a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3Z" clip-rule="evenodd" />
                                                                </svg>


                                                                {getFileName(resource.attachment)}
                                                            </span>
                                                            <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                                                                {/* {getFileSize(resource.attachment)} MB
                                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                                                    <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                                                                </svg> */}
                                                                {getFileExtension(resource.attachment).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="inline-flex self-center items-center ml-auto">
                                                            <button className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600" type="button" onClick={() => window.open(resource.attachment, "_blank").focus()}>
                                                                <svg className="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                                                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )
                            }
                        })}
                    </div>

                </div >


                <div className={`${activeTab === 'image' ? 'block' : 'hidden'} mt-8`}>

                    {
                        Resources && Resources.map((resource, index) => {
                            if (imageExtensions.includes(getFileExtension(resource.attachment))) {
                                return (
                                    <>
                                        <div className="flex  items-start gap-2.5 mb-5">
                                            <img className="w-8 h-8 rounded-full" src={resource.user_image} alt="Jese image" />
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-col justify-start  space-x-2 rtl:space-x-reverse">
                                                    <div>
                                                        <span className="text-sm  me-3 font-semibold text-gray-900 dark:text-white">
                                                            {resource.user_name}
                                                        </span>
                                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                            {`${new Date(resource.created_at).toLocaleString()}`}
                                                        </span>
                                                    </div>
                                                    <p className={`${resource.description != 'null' ? 'block' : 'hidden'} mb-2 text-gray-500 dark:text-gray-400 text-justify`}>
                                                        {resource.description}

                                                    </p>
                                                </div>
                                                <div className="flex flex-col w-full max-w-[320px] leading-1.5  border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">

                                                    <div className="group relative ">
                                                        <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                                            <button className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50" onClick={() => window.open(resource.attachment, "_blank").focus()}>
                                                                <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <img src={resource.attachment} className="rounded-lg" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div >

                                    </>
                                )

                            }
                        })
                    }


                </div>

            </div >



            {/*modal*/}
            <div>

                <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={handleCloseModal}></div>

                <div id="modal" className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>
                    <div className="relative p-4 w-full max-w-xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Upload Resource
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

                                    <form method='post' onSubmit={handleSubmit} className="p-4 md:p-5">
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title (optional)" onChange={handleChange} />
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <textarea id="description" rows="4" name='description' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write description here (optional)" onChange={handleChange}></textarea>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center w-full mb-4">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" name="attachment" onChange={handleChange} required />
                                            </label>
                                        </div>

                                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                            Upload
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
export default Resources