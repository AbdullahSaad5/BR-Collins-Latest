"use client";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../public/icons/home_page_icons";
import React, { useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { ICourseCategory } from "@/app/types/course-category.contract";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

const fetchCategories = async (): Promise<{
  data: (ICourseCategory & { coursesCount: number })[];
}> => {
  const response = await api.get("/course-categories/with-courses-count");
  return response.data;
};

const CourseCategories: React.FC = () => {
  const swiperRef = React.useRef<any>(null);

  const scrollLeft = (): void => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const scrollRight = (): void => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course-categories"],
    queryFn: fetchCategories,
    select: (data) => data.data,
  });

  const sliderItems = useMemo(
    () =>
      (categories || []).map((cat) => ({
        title: cat.name,
        courses: cat.coursesCount,
        categoryId: cat._id,
      })),
    [categories]
  );

  if (isLoading) {
    return (
      <section className="relative text-gray-900 mt-6">
        <div className="w-full max-w-[1326px] relative">
          <div className="flex flex-row overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth no-scrollbar">
            <div className="flex flex-nowrap gap-4 items-stretch">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="flex-shrink-0 py-1 h-full">
                  <div className="flex flex-col rounded-full mt-2 bg-gray-100 px-4 py-2 shadow-md border border-gray-100 h-full w-fit min-w-[200px] animate-pulse">
                    <div className="h-5 w-20 bg-gray-200 rounded mb-2 mx-auto mt-2" />
                    <div className="h-3 w-16 bg-gray-200 rounded mx-auto mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return <div className="w-full flex justify-center items-center py-8 text-red-500">Failed to load categories.</div>;
  }

  return (
    <section className="relative text-gray-900 mt-6">
      <div className="w-full max-w-[1326px] relative">
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute -mt-1 left-[-56px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <Swiper
          spaceBetween={24}
          modules={[Scrollbar]}
          // scrollbar={{ draggable: true, hide: false, dragSize: 64, snapOnRelease: true }}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 12 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 5, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 24 },
          }}
          className="category-swiper pb-8"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {sliderItems.map((item, index) => (
            <SwiperSlide key={index} className="!h-auto !w-fit py-2">
              <Link
                href={`/course?category=${item.categoryId}#courses-section`}
                className="flex flex-col rounded-full bg-[#F4F6F8] px-8 py-3  transition-all duration-300 border border-gray-100 hover:border-gray-100 transform hover:-translate-y-1 h-full w-fit min-w-[200px]"
              >
                <h2 className="font-bold  text-lg sm:text-lg text-black mb-0">{item.title}</h2>
                <p className="text-base text-[#5F6F7C]">({item.courses}) courses</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute -mt-1 right-[-56px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
        >
          <ArrowRightIcon className="w-4 h-4" />
        </button>
        <style jsx global>{`
          .category-swiper {
            width: 100%;
            overflow: hidden;
          }
          .category-swiper .swiper-scrollbar {
            max-width: 315px;
            height: 1px;
            background: rgba(0, 0, 0, 0.1);
            left: 50%;
            transform: translateX(-50%);
            bottom: 8px;
          }
          .category-swiper .swiper-scrollbar-drag {
            background: #2490e0;
            height: 3px;
            cursor: pointer;
          }
          .category-swiper .swiper-slide {
            height: auto;
          }
        `}</style>
      </div>
    </section>
  );
};

export default CourseCategories;
