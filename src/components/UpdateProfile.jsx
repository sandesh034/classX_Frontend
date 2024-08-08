import { name } from '@stream-io/video-react-sdk';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const UpdateProfile = ({ onUpdate }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: loggedInUser.name || '',
        phone: loggedInUser.phone || '',
        email: loggedInUser.email || '',
        user_type: loggedInUser.user_type || '',
        image: loggedInUser.image || './user.png',
        imageFile: null
    });
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (formData.imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(formData.imageFile);
        }
    }, [formData.imageFile]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prevData) => ({
                ...prevData,
                imageFile: files[0]
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('name', formData.name);
            formDataToSubmit.append('phone', formData.phone);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('user_type', formData.user_type);
            if (formData.imageFile) {
                formDataToSubmit.append('image', formData.imageFile);
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/update`, {
                method: 'PUT',
                body: formDataToSubmit,
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                // console.log(data);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                onUpdate({
                    name: data.data.user.name,
                    email: data.data.user.email,
                    image: data.data.user.image
                })
                setLoading(false);
                toast.success(data.message);

            } else {
                // console.log(data);
                setLoading(false);
                toast.error(data.message);

            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong');

        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // console.log(formData);

    return (
        <>
            <div className='flex justify-center items-center w-full h-screen'>
                <div className="w-[70%] bg-white rounded-lg dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    {
                        loading ?
                            (
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
                            ) :
                            (
                                <>
                                    <div className="py-2 px-4 space-y-4 md:space-y-6">
                                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Update Profile
                                        </h1>
                                        <form className="space-y-4 md:space-y-6" method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                                            <div className='flex justify-center'>
                                                <div onClick={handleImageClick} className="relative cursor-pointer">
                                                    <img className="w-40 h-40 rounded-full aspect-video object-cover" src={formData.image} alt="User" />
                                                    <span className="top-0 left-28 p-1 absolute flex items-center justify-center w-6 h-6 bg-black rounded-full">
                                                        <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    ref={fileInputRef}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                    accept="image/*"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.name} required="" onChange={handleChange} />
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                                <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.phone} required="" onChange={handleChange} />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.email} required="" onChange={handleChange} />
                                            </div>

                                            <div>
                                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                                <select id="role" name="user_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} value={formData.user_type}>
                                                    <option value="">Select Role</option>
                                                    <option value="student">Student</option>
                                                    <option value="instructor">Instructor</option>
                                                </select>
                                            </div>

                                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                                        </form>
                                    </div>
                                </>
                            )
                    }

                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
