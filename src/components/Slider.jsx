import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

const CourseSlider = () => {
    const [courses, setCourses] = useState()
    const fetchCourses = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            if (response.ok) {
                setCourses(data.data)
            }
            else {
                // console.log(data.message)
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCourses()
    }, [])
    console.log(courses)
    return (

        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper "

        >
            {
                courses && courses.map((course) => {
                    return (
                        <SwiperSlide>
                            <a href='#'>
                                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                                    <div >
                                        <img class="rounded-t-lg" src="./course_img.png" alt="" />
                                    </div>
                                    <div class="p-5">
                                        <div >
                                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {course.name}
                                            </h5>
                                        </div>
                                        <p class="min-h-[80px] w-full mb-3 font-normal text-gray-700 dark:text-gray-400">{course.description}</p>

                                    </div>
                                </div>
                            </a>

                        </SwiperSlide>

                    )
                })
            }

        </Swiper>

    );
}

export default CourseSlider;
