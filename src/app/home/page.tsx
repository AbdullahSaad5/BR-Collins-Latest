"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaBook, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import SubscriptionCards from "../components/pricing/SubscriptionCards";
// import CourseSwiper from "../components/Course/CourseSwiper";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { ICourse } from "@/app/types/course.contract";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import CourseCard from "../components/Course/CourseCard";
import CourseCardSlider from "../components/Course/CourseCardSlider";

import "swiper/css";
import "swiper/css/autoplay";
import { ICourseCategory } from "../types/course-category.contract";
import CourseSwiper from "../components/Course/CourseSwiper";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../../../public/icons/home_page_icons";
import TestimonialsSection from "../components/home/TestimonialsSection";

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
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // if (!isClient) {
  //   return <div className="h-[300px] lg:h-[500px] w-full" />;
  // }

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

  const sliderItems: SliderItem[] = [
    { title: "Business Writing ", courses: 100 },
    { title: "Anger Management", courses: 80 },
    { title: "Administrative", courses: 60 },
    { title: "Call Center Training", courses: 40 },
    { title: "Business Acumen", courses: 40 },
    { title: "App Developer", courses: 40 },
    { title: "Data Analysis", courses: 75 },
    { title: "Project Management", courses: 90 },
    { title: "Digital Marketing", courses: 65 },
  ];

  const blogCategories: BlogCategory[] = [
    { name: "Technology", count: 25 },
    { name: "Business", count: 18 },
    { name: "Personal Development", count: 12 },
    { name: "Marketing", count: 15 },
    { name: "Design", count: 8 },
    { name: "Business", count: 18 },
    { name: "Personal Development", count: 12 },
    { name: "Marketing", count: 15 },
    { name: "Design", count: 8 },
  ];

  const blogs: Blog[] = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Business",
      description:
        "Explore how AI is transforming business operations and what it means for the future of work.",
      category: "Technology",
      date: "May 15, 2024",
      image: "/assets/abouthome.png",
    },
    {
      id: 2,
      title: "Effective Time Management Strategies for Professionals",
      description:
        "Learn proven techniques to boost your productivity and achieve more in less time.",
      category: "Business",
      date: "April 28, 2024",
      image: "/assets/congrateicon.png",
    },
    {
      id: 3,
      title: "The Psychology of Consumer Behavior",
      description:
        "Understand what drives purchasing decisions and how to leverage this knowledge in marketing.",
      category: "Marketing",
      date: "April 15, 2024",
      image: "/assets/lowerlogo.png",
    },

  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

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


  const FeatureCard = ({
    title,
    description,
    iconSrc,
    className = "",
  }: {
    title: string;
    description: string;
    iconSrc: string;
    className?: string;
  }) => (
    <div className={`w-full rounded-none max-md:max-w-full ${className}`}>
      <div className="px-4 md:px-9 py-4 md:py-7 rounded-2xl bg-slate-100 max-md:max-w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          <div className="w-full md:w-[17%] max-md:ml-0">
            <img
              src={iconSrc}
              className="object-contain shrink-0 self-stretch my-auto aspect-[1.07] w-16 md:w-[93px]"
              alt={title}
            />
          </div>
          <div className="ml-0 md:ml-5 w-full md:w-[83%]">
            <div className="grow text-neutral-900">
              <h3 className="text-xl md:text-2xl font-bold leading-none max-md:max-w-full">
                {title}
              </h3>
              <p className="mt-2 md:mt-3 text-base md:text-lg leading-6 md:leading-7 max-md:max-w-full">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StatCard = ({
    number,
    label,
    bgColor,
  }: {
    number: string;
    label: string;
    bgColor: string;
  }) => (
    <div
      className={`rounded-2xl p-4 md:p-6 ${bgColor} h-full flex flex-col items-center justify-center`}
    >
      <h3 className="text-3xl md:text-[50px] font-medium text-neutral-900">
        {number}
      </h3>
      <p className="text-sm md:text-lg text-neutral-700 mt-1 md:mt-2">
        {label}
      </p>
    </div>
  );

  const StatsSection = () => (
    <div className="w-full lg:w-[50%] h-auto md:h-[410px] flex flex-col justify-between gap-4">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 h-[48%]">
        <div className="w-full md:w-[48%] h-[180px]">
          <StatCard
            number="500+"
            label="Learners & counting"
            bgColor="bg-rose-50"
          />
        </div>
        <div className="w-full sm:w-[48%] h-[180px]">
          <StatCard
            number="800+"
            label="Courses & Video"
            bgColor="bg-sky-100"
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 h-[48%]">
        <div className="w-full sm:w-[48%] h-[180px]">
          <StatCard
            number="100+"
            label="Registered Enrolls"
            bgColor="bg-sky-100"
          />
        </div>
        <div className="w-full sm:w-[48%] h-[180px]">
          <StatCard
            number="1000+"
            label="Certified Students"
            bgColor="bg-rose-50"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      
      <div className="h-[300px] lg:h-[500px] w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
          className="relative"
        >
          <div className="absolute bottom-[5%] right-[10%] flex justify-center items-center gap-2 z-50 h-[10vh]">
            {Array.from({ length: 2 }).map((_, i) => {
              console.log("Logging index", i);
              return (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-b-sm rounded-tl-sm transition-all duration-300 ${
                    i === activeIndex ? "bg-[#F86537]" : "bg-[#FFFFFF99]"
                  }`}
                />
              );
            })}
          </div>
          <SwiperSlide>
            {/* Your first slide content */}
            <section className="relative w-full">
              <div className="w-full">
                <Image
                  src="/assets/homepagewall.png"
                  width={1920}
                  height={1080}
                  alt="wallpaper"
                  className="w-full h-[300px] lg:h-[500px] object-cover  object-right-top"
                  priority
                />
              </div>

              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[linear-gradient(to_right,_white,transparent)] md:bg-[linear-gradient(to_right,_white,_white,_transparent,_transparent)] pointer-events-none flex items-center">
                <div className="w-full p-4 md:p-8 lg:p-0 md:max-w-[1326px] mx-auto">
                  <div className="flex flex-col p-4 md:p-4 xl:p-0 justify-start gap-3 md:gap-4 w-full max-w-2xl pointer-events-auto">
                    <h2 className="font-hanken text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-start text-gray-900">
                      IT Support Specialist Professional Certificate
                    </h2>

                    <div className="flex md:flex-col sm:flex-row flex-row items-start sm:items-start gap-2">
                      <Image
                        src="/assets/person.png"
                        width={40}
                        height={40}
                        alt="person"
                        className="w-10 h-10"
                      />
                      <h1 className="font-light text-sm sm:text-base text-gray-800">
                        Instructor:{" "}
                        <span className="text-blue-500 underline mx-2">
                          Claudia Pruitt
                        </span>
                      </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <div className="flex items-center bg-orange-300 rounded-lg text-sm px-3 py-1 border border-gray-300 text-black font-medium">
                        <Image
                          src="/assets/congrateicon.png"
                          width={16}
                          height={16}
                          className="mr-2 w-4 h-4"
                          alt="congrats"
                        />
                        <h3>Bestseller</h3>
                      </div>
                      <h1 className="font-medium text-sm sm:text-base flex items-center gap-2 text-gray-900">
                        4.8
                        <span className="text-yellow-500 flex items-center text-sm">
                          {[...Array(4)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                          <FaStarHalfAlt />
                        </span>
                      </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="bg-orange-500 text-white rounded-full px-4 md:px-5 py-1 md:py-2 font-medium text-sm cursor-pointer">
                        Enroll Now
                      </div>
                      <div className="text-sm text-gray-700">
                        Start <span className="font-bold">14 April</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            {/* Your second slide content */}
            <section className="relative w-full">
              <div className="w-full">
                <Image
                  src="/assets/homepagewall2.png"
                  width={1920}
                  height={1080}
                  alt="wallpaper"
                  className="w-full h-[300px] lg:h-[500px] object-cover  object-right-top"
                  priority
                />
              </div>

              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[linear-gradient(to_right,_white,transparent)] md:bg-[linear-gradient(to_right,_white,_white,_transparent,_transparent)] pointer-events-none flex items-center">
                <div className="w-full p-4 md:p-8 lg:p-0 md:max-w-[1326px] mx-auto">
                  <div className="flex flex-col p-4 md:p-4 xl:p-0 justify-start gap-3 md:gap-4 w-full max-w-2xl pointer-events-auto">
                    <h2 className="font-hanken  text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-start text-gray-900">
                      Your Learning Journey Starts Here
                    </h2>

                    <p className="text-xl">
                      Get the skills to achieve goals and stay competitive.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Link
                        href={"/subscriptions"}
                        className="bg-orange-500 text-white rounded-full px-4 md:px-5 py-1 md:py-2 font-medium text-sm cursor-pointer"
                      >
                        Plans for Individual{" "}
                      </Link>
                      <Link
                        href={"/subscriptions"}
                        className="bg-transparent text-black border-1 border-gray-600 rounded-full px-4 md:px-5 py-1 md:py-2 font-medium text-sm cursor-pointer"
                      >
                        Plans for Corporate{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
        </Swiper>
      </div>
     
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

            <div
              ref={sliderRef}
              className="flex flex-row overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth no-scrollbar"
            >
              <div className="flex flex-nowrap gap-4 items-stretch">
                {sliderItems.map((item, index) => (
                  <div key={index} className="flex-shrink-0 py-1 h-full ">
                    <div className="flex flex-col rounded-full mt-2 bg-gray-100 px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-100 transform hover:-translate-y-1 h-full w-fit min-w-[120px]">
                      <h2 className="font-bold font-dm text-md sm:text-lg text-gray-800 mb-0 text-center  pt-1">
                        {item.title}
                      </h2>
                      <p className="text-xs text-gray-600 mt-1 text-center">
                        {item.courses} courses
                      </p>
                    </div>
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

      <TestimonialsSection/>
      <div className="w-full px-4 h-auto items-center justify-around p-4 md:p-4 xl:p-0 lg:px-4 mx-auto flex flex-col max-w-[1326px] md:h-auto lg:h-[1902px] py-12">
       

        {/* On Site Learning Section */}
        <section className="mx-auto p-2 md:p-4 xl:p-0 flex flex-col items-center text-gray-900 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full max-w-[1326px] px-1 md:px-4">
            {/* Content Column - Centered on medium, left on large */}
            <div className="w-full flex flex-col items-center lg:items-start lg:max-w-[529px] xl:max-w-[600px]">
              <div className="w-full flex flex-col items-center lg:items-start">
                <div className="flex flex-col items-center lg:items-start w-full font-bold">
                  <span className="text-lg text-orange-500 uppercase">
                    about us
                  </span>
                  <h2 className="mt-3 md:mt-5 text-3xl md:text-5xl leading-tight text-neutral-900 text-center lg:text-left">
                    On Site Learning
                  </h2>
                </div>
                <p className="mt-4 md:mt-5 text-lg md:text-2xl leading-6 md:leading-8 text-neutral-900 text-center lg:text-left">
                  At B.R Collins, our on-site training transforms everyday
                  lessons into engaging and interactive experiences. Blending
                  creativity with expertise.
                </p>
              </div>

              <div className="mt-6 md:mt-10 w-full flex flex-col items-center lg:items-start">
                <FeatureCard
                  title="Flexible Classes"
                  description="It is a long established fact that a reader will be distracted by this on readable content of when looking at its layout."
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0142af754e70f9fb9b82869b1b20e4421b6f04e5?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
                  className="w-full"
                />
                <FeatureCard
                  title="Expert-Led Training"
                  description="Learn from industry experts in a real-world setting and Gain practical knowledge and get hands-on experience."
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/fdae32a59490e8eef0a907659d5abbdfaaf27880?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
                  className="mt-4 md:mt-5 w-full"
                />
              </div>
            </div>

            {/* Image - Centered on medium, right on large */}
            <div>
              {" "}
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ad81aa71094e8f17ed8df5001172ac5e3d12e12?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
                className="object-contain rounded-2xl aspect-[0.93] w-full max-w-[452px] lg:max-w-[600px] xl:max-w-[700px] mt-8 lg:mt-0 lg:flex-1"
                alt="On-site learning"
              />
            </div>
          </div>
        </section>
        {/* Community Section */}
        <section className="mx-auto flex flex-col items-center text-gray-900 w-full max-w-[1326px] lg:h-[410px] px-1  md:px-2 ">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-stretch h-full w-full gap-4 px-5  ">
            {/* Left Content Section */}
            <div className="flex flex-col justify-between h-full w-full lg:w-[50%] text-center md:text-left">
              <div className="flex flex-col justify-between h-full gap-4 max-lg:pt-10 md:gap-6">
                <span className="text-lg text-orange-500 uppercase font-bold">
                  WHY CHOOSE US
                </span>
                <h2 className="text-3xl md:text-[50px] leading-[40px] md:leading-[60px] text-neutral-900 font-bold">
                  Creating A Community Of Life Long Learners
                </h2>
                <p className="text-lg md:text-2xl leading-7 md:leading-8 text-neutral-900">
                  At B.R Collins, our on-site training transforms everyday
                  lessons into engaging and interactive experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
                  <Link
                    href="/course"
                    className="px-6 py-3 md:px-8 md:py-4 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors text-center"
                  >
                    Explore Courses
                  </Link>
                  <Link
                    href="/about"
                    className="px-6 py-3 md:px-8 md:py-4 border border-neutral-900 rounded-full hover:bg-gray-100 transition-colors text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <StatsSection />
          </div>
        </section>
      </div>
    </>
  );
};
