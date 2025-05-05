"use client";
import { useRef, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";

import SubscriptionCards from "../components/pricing/SubscriptionCards";
// import CourseSwiper from "../components/Course/CourseSwiper";
import { ICourse } from "@/app/types/course.contract";
import { api } from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/autoplay";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../public/icons/home_page_icons";
import CourseSwiper from "../components/Course/CourseSwiper";
import CommunitySection from "../components/home/CommunitySection";
import HeroSection from "../components/home/HeroSection";
import OnSiteLearningSection from "../components/home/OnSiteLearningSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import { ICourseCategory } from "../types/course-category.contract";

interface SliderItem {
  title: string;
  courses: number;
}

interface Course {
  id: number;
  title: string;
  duration: string;
  lessons: number;
  rating: number;
  price: number;
}

interface BlogCategory {
  name: string;
  count: number;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
}

const fetchCourses = async (): Promise<{ data: ICourse[] }> => {
  const response = await api.get("/courses");
  return response.data;
};

const fetchCategories = async (): Promise<{
  data: (ICourseCategory & {
    coursesCount: number;
  })[];
}> => {
  const response = await api.get("/course-categories/with-courses-count");
  return response.data;
};

export const Homepage = () => {
  const [activeTab, setActiveTab] = useState<string>("e-learning");
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const {
    data: courses,
    isLoading: isCoursesLoading,
    error: coursesError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    select: (data) => data.data,
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["course-categories"],
    queryFn: fetchCategories,
    select: (data) => data.data,
  });

  const sliderItems: (SliderItem & { categoryId: string })[] = (categories || []).map((cat) => ({
    title: cat.name,
    courses: cat.coursesCount,
    categoryId: cat._id,
  }));

  const scrollLeft = (): void => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (): void => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      {/* Courses Section */}
      <section className="w-full p-4 md:p-4 xl:py-10 max-w-[1326px] mx-auto py-8 md:py-12">
        <section className="relative text-gray-900 w-full">
          <div className="w-full">
            <div className="flex flex-col w-full">
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-start text-gray-800">
                Your Complete Skill Set Starts Here
              </h2>

              <div className="flex flex-wrap gap-4 sm:gap-6 my-3">
                <button
                  onClick={() => setActiveTab("e-learning")}
                  className={`pb-2 px-1 transition-all duration-300 ${
                    activeTab === "e-learning"
                      ? "text-gray-800 font-bold border-b-4 border-[#F86537]"
                      : "text-gray-500 hover:text-gray-800 hover:border-b-4 hover:border-gray-300"
                  }`}
                >
                  E-Learning
                </button>
                <button
                  onClick={() => setActiveTab("blogs")}
                  className={`pb-2 px-1 transition-all duration-300 ${
                    activeTab === "blogs"
                      ? "text-gray-800 font-bold border-b-4 border-[#F86537]"
                      : "text-gray-500 hover:text-gray-800 hover:border-b-4 hover:border-gray-300"
                  }`}
                >
                  In-Person
                </button>
              </div>

              <hr className="border-gray-200" />
            </div>
          </div>
        </section>

        {/* Slider Section */}

        <section className="relative text-gray-900 mt-6">
          <div className="w-full max-w-[1326px] relative">
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute left-[-56px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>

            <div ref={sliderRef} className="flex flex-row overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth no-scrollbar">
              <div className="flex flex-nowrap gap-4 items-stretch">
                {sliderItems.map((item, index) => (
                  <div key={index} className="flex-shrink-0 py-1 h-full ">
                    <Link
                      href={`/course?category=${item.categoryId}#courses-section`}
                      className="flex flex-col rounded-full mt-2 bg-gray-100 px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-100 transform hover:-translate-y-1 h-full w-fit min-w-[120px]"
                    >
                      <h2 className="font-bold font-dm text-md sm:text-lg text-gray-800 mb-0 text-center  pt-1">
                        {item.title}
                      </h2>
                      <p className="text-xs text-gray-600 mt-1 text-center">{item.courses} courses</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-[-56px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </section>

        <CourseSwiper />
      </section>

      {/* Pricing Section */}
      <section className="bg-[#081B25]  px-1 py-20 md:px-0">
        <div className="w-full p-4 md:p-4 xl:p-0 flex flex-col justify-center gap-5 h-full py-10 items-center mx-auto max-w-[1326px]">
          <div className="flex flex-col justify-center items-center text-center mb-6">
            <h2 className="text-white font-hanken text-2xl md:text-[34px] font-bold">
              Flexible Pricing for Individuals and Teams
            </h2>
          </div>
          <SubscriptionCards />
        </div>
      </section>

      {/* Testimonials Section */}

      <TestimonialsSection />
      <div className="w-full px-4 h-auto items-center justify-around p-4 md:p-4 xl:p-0 lg:px-4 mx-auto flex flex-col max-w-[1326px] md:h-auto lg:h-[1502px] py-12">
        {/* On Site Learning Section */}
        <OnSiteLearningSection />
        {/* Community Section */}
        <CommunitySection />
      </div>
    </>
  );
};
