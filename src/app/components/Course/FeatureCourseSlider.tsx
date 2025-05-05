"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCourseContext } from "../context/CourseContext";
import { FeatureCourse, FeatureCourseSkeleton } from "./FetureCourse";

export const FeatureCourseSlider: React.FC = () => {
  const { courses, isLoading, error } = useCourseContext();

  return (
    <div className="text-neutral-900 max-md:max-w-full mt-10 relative">
      <h2 className="text-3xl font-bold max-md:max-w-full">Featured courses</h2>
      <p className="mt-3 text-lg max-md:max-w-full">
        Many learners enjoyed this highly rated course for its engaging content.
      </p>

      <div className="mt-10 w-full max-w-[1326px] mx-auto max-md:max-w-full relative group">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".featured-swiper-next",
            prevEl: ".featured-swiper-prev",
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          className="featured-courses-swiper px-2"
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <SwiperSlide key={"skeleton-" + idx} className="!h-auto">
                  <div className="h-full p-2">
                    <FeatureCourseSkeleton />
                  </div>
                </SwiperSlide>
              ))
            : courses.map((course, index) => {
                const transformedCourse = {
                  ...course,
                  duration: `${course.noOfHours} Hrs`,
                  lessons: course.noOfLessons,
                  price: `$${course.discountPrice || course.price}`,
                  originalPrice: course.price ? `$${course.price}` : undefined,
                  isNew: course.bestSeller,
                  imageUrl: "/img/Course/Course.png",
                };
                return (
                  <SwiperSlide key={index} className="!h-auto">
                    <div className="h-full p-2">
                      <FeatureCourse {...transformedCourse} />
                    </div>
                  </SwiperSlide>
                );
              })}
        </Swiper>

        {/* Navigation Arrows */}
        <button className="featured-swiper-prev absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
          <ChevronLeft className="w-5 h-5 text-black" strokeWidth={2.5} />
        </button>
        <button className="featured-swiper-next absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
          <ChevronRight className="w-5 h-5 text-black" strokeWidth={2.5} />
        </button>
      </div>

      <style jsx global>{`
        .featured-courses-swiper {
          width: 100%;
        }
        .swiper-slide {
          height: auto;
        }
        .featured-swiper-prev.swiper-button-disabled,
        .featured-swiper-next.swiper-button-disabled {
          opacity: 0.2 !important;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .featured-swiper-prev,
          .featured-swiper-next {
            opacity: 1 !important;
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </div>
  );
};
