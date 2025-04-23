"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CourseCard } from "./CourseCard";
import { useCourseContext } from "../context/CourseContext";

// Define the type for the course
interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isNew: boolean;
}

const CourseSwiper: React.FC = () => {
  const { courses: featuredCourses } = useCourseContext();

  if (!featuredCourses || featuredCourses.length === 0) {
    return <p className="mt-10 text-gray-500">No featured courses available.</p>;
  }

  return (
    <div className="flex flex-wrap gap-8 items-center self-stretch mt-10">
      <Swiper
        spaceBetween={32}
        breakpoints={{
          0: { slidesPerView: 1 },
          500: { slidesPerView: 1 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1274: { slidesPerView: 6 },
        }}
        className="mt-10"
      >
        {featuredCourses.map((course, index) => (
          <SwiperSlide key={index} className="w-full sm:max-w-[194px]">
            <CourseCard {...course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CourseSwiper;
