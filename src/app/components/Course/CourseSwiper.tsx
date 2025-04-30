"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

import { useCourseContext } from "../context/CourseContext";
import CourseCard from "./CourseCard";

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isNew: boolean;
  noOfHours: number;
  noOfLessons: number;
  discountPrice?: number;
  price: number;
  bestSeller: boolean;
  coverImageUrl?: string;
}

const CourseSwiper: React.FC = () => {
  const { courses: featuredCourses } = useCourseContext();

  if (!featuredCourses || featuredCourses.length === 0) {
    return <p className="mt-10 text-gray-500">No featured courses available.</p>;
  }

  return (
    <div className="mt-10 mx-auto max-w-[1326px] px-1">
      {" "}
      {/* Added container constraints */}
      <Swiper
        spaceBetween={32}
        modules={[Scrollbar]}
        scrollbar={{
          draggable: true,
          hide: false,
          dragSize: 64,
          snapOnRelease: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 14,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          1224: {
            slidesPerView: 5,
            spaceBetween: 14,
          },
          1274: {
            slidesPerView: 6,
            spaceBetween: 14,
          },
        }}
        className="custom-swiper"
      >
        {featuredCourses.map((course, index) => {
          const transformedCourse = {
            ...course,
            duration: `${course.noOfHours} Hrs`,
            lessons: course.noOfLessons,
            price: `$${course.discountPrice || course.price}`,
            originalPrice: course.price ? `$${course.price}` : undefined,
            isNew: course.bestSeller,
            imageUrl: course.coverImageUrl || "/img/Course/Course.png",
          };
          return (
            <SwiperSlide
              key={index}
              className="!w-[calc(100%/1.1)] sm:!w-[calc(100%/3.2)] lg:!w-[calc(100%/5.4)] xl:!w-[calc(100%/6.4)]"
            >
              <div className="h-full p-2">
                <CourseCard course={course} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>{`
        .custom-swiper {
          padding-bottom: 55px;
          width: 100%;
          overflow: hidden;
        }

        .custom-swiper .swiper-scrollbar {
          max-width: 315px;
          height: 1px;
          background: rgba(0, 0, 0, 0.1);
          left: 50%;
          transform: translateX(-50%);
          
          bottom: 8px;
        }

        .custom-swiper .swiper-scrollbar-drag {
          background: #2490e0;
          height: 3px;
          cursor: pointer;
        }

        .custom-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default CourseSwiper;
