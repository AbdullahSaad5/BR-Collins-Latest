"use client"
import React, { useRef, useState } from "react";
import { FaBook, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";
import wall from "/assets/homepagewall.png";
import Person from "/assets/person.png";
import Congrate from "/assets/congrateicon.png";


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

export const Homepage  = () => {
  const [activeTab, setActiveTab] = useState<string>("e-learning" );
  const sliderRef = useRef<HTMLDivElement>(null);

  const sliderItems: SliderItem[] = [
    { title: "Business Writing Techniques", courses: 100 },
    { title: "Anger Management", courses: 80 },
    { title: "Administrative Support", courses: 60 },
    { title: "Call Center Training", courses: 40 },
    { title: "Business Acumen", courses: 40 },
    { title: "Application Developer", courses: 40 },
    { title: "Data Analysis", courses: 75 },
    { title: "Project Management", courses: 90 },
    { title: "Digital Marketing", courses: 65 },
  ];

  const courses: Course[] = [
    {
      id: 1,
      title: "Business Writing Fundamentals for Professionals",
      duration: "4Hrs",
      lessons: 12,
      rating: 4.5,
      price: 142,
    },
    {
      id: 2,
      title: "Advanced Anger Management Techniques",
      duration: "3.5Hrs",
      lessons: 10,
      rating: 4.2,
      price: 120,
    },
    {
      id: 3,
      title: "Administrative Assistant Masterclass 2024",
      duration: "5Hrs",
      lessons: 15,
      rating: 4.7,
      price: 165,
    },
    {
      id: 4,
      title: "Call Center Excellence Training Program",
      duration: "4.5Hrs",
      lessons: 14,
      rating: 4.3,
      price: 135,
    },
    {
      id: 5,
      title: "Administrative Assistant Masterclass 2024",
      duration: "5Hrs",
      lessons: 15,
      rating: 4.7,
      price: 165,
    },
    {
      id: 6,
      title: "Call Center Excellence Training Program",
      duration: "4.5Hrs",
      lessons: 14,
      rating: 4.3,
      price: 135,
    },
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
      image: "../../src/public/assets/abouthome.png",
    },
    {
      id: 2,
      title: "Effective Time Management Strategies for Professionals",
      description:
        "Learn proven techniques to boost your productivity and achieve more in less time.",
      category: "Business",
      date: "April 28, 2024",
      image: "../../src/public/assets/congrateicon.png",
    },
    {
      id: 3,
      title: "The Psychology of Consumer Behavior",
      description:
        "Understand what drives purchasing decisions and how to leverage this knowledge in marketing.",
      category: "Marketing",
      date: "April 15, 2024",
      image: "../../src/public/assets/lowerlogo.png",
    },
    {
      id: 4,
      title: "Minimalist Design Principles for Modern Websites",
      description:
        "Discover how minimalist design can improve user experience and conversion rates.",
      category: "Design",
      date: "March 30, 2024",
      image: "../../src/public/assets/sendericon.png",
    },
    {
      id: 5,
      title: "Building Resilience in Challenging Times",
      description:
        "Practical strategies to develop mental toughness and adaptability in your personal and professional life.",
      category: "Personal Development",
      date: "March 22, 2024",
      image: "../../src/public/assets/person.png",
    },
    {
      id: 6,
      title: "The Rise of Remote Work: Trends and Best Practices",
      description:
        "How companies are adapting to the remote work revolution and what it means for the future.",
      category: "Business",
      date: "March 10, 2024",
      image: "../../src/public/assets",
    },
  ];

  const renderStars = (rating: number)=> {
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

  const testimonials = [
    {
      quote:
        "The online learning platform is user-friendly, and the courses are top-quality. A great investment!",
      author: "Valerie J.",
      role: "Creasman CEO",
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/908baf5bca0653700b717ff9a12bfa4fcbf17d44?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca",
      ratingSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bc212420f985ef7c5d1da3a7e132891c3bfb3ac4?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca",
      hasShadow: false,
    },
    {
      quote:
        "B.R. Collins' business management course gave me the confidence to lead my team to success.",
      author: "Hannah R.",
      role: "Sutton CEO",
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f24e7dc3c08e89a2508b97c949c626c39032de5f?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca",
      ratingSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/eedaec280656709f9f00fdc760c19c08697b6c7d?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca",
      hasShadow: true,
    },
  ];

  const TestimonialCard = ({
    quote,
    author,
    role,
    avatarSrc,
    ratingSrc,
    hasShadow = false,
  }: {
    quote: string;
    author: string;
    role: string;
    avatarSrc: string;
    ratingSrc: string;
    hasShadow?: boolean;
  }) => (
    <article
      className={`px-8 py-9 bg-white rounded-xl border border-solid border-zinc-100 ${
        hasShadow ? "shadow-[0px_4px_34px_rgba(0,0,0,0.06)]" : ""
      } max-md:px-5 w-full`}
    >
      <img
        src={
          hasShadow
            ? "https://cdn.builder.io/api/v1/image/assets/TEMP/4f53b01f4a2055025ae001d32242dd2156eb1d6f?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/e3b511254abaa10feac72b54d94eff2df35b0d69?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
        }
        className="object-contain w-8 aspect-[1.68]"
        alt="Quote"
      />
      <blockquote className="mt-7 text-2xl font-medium leading-8 text-neutral-900">
        {quote}
      </blockquote>
      <div className="flex justify-between mt-16 max-md:flex-col max-md:items-start max-md:gap-4">
        <div className="flex gap-3 items-center">
          <img
            src={avatarSrc}
            className="object-contain rounded-full aspect-square w-[50px]"
            alt={author}
          />
          <div>
            <p className="text-xl font-bold text-neutral-900">{author}</p>
            <p className="text-base leading-none text-zinc-500">{role}</p>
          </div>
        </div>
        <img
          src={ratingSrc}
          className="object-contain aspect-[2.51] w-[88px] max-md:mt-2"
          alt="Rating"
        />
      </div>
    </article>
  );

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
      <div className="px-9 py-7 rounded-2xl bg-slate-100 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[17%] max-md:ml-0 max-md:w-full">
            <img
              src={iconSrc}
              className="object-contain shrink-0 self-stretch my-auto aspect-[1.07] w-[93px] max-md:mt-10"
              alt={title}
            />
          </div>
          <div className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
            <div className="grow text-neutral-900 max-md:mt-10 max-md:max-w-full">
              <h3 className="text-2xl font-bold leading-none max-md:max-w-full">
                {title}
              </h3>
              <p className="mt-3 text-lg leading-7 max-md:max-w-full">
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
    <div className={`rounded-2xl p-6 ${bgColor}`}>
      <h3 className="text-3xl font-bold text-neutral-900">{number}</h3>
      <p className="text-lg text-neutral-700 mt-2">{label}</p>
    </div>
  );

  const StatsSection = () => (
    <div className="grow shrink self-stretch my-auto rounded-none min-w-60 w-[440px] max-md:max-w-full">
      <div className="max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-6/12 max-md:ml-0 max-md:w-full">
            <StatCard number="500+" label="Learners & counting" bgColor="bg-rose-50" />
          </div>
          <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <StatCard number="800+" label="Courses & Video" bgColor="bg-sky-100" />
          </div>
        </div>
      </div>
      <div className="mt-3 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-6/12 max-md:ml-0 max-md:w-full">
            <StatCard number="100+" label="Registered Enrolls" bgColor="bg-sky-100" />
          </div>
          <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <StatCard number="1000+" label="Certified Students" bgColor="bg-rose-50" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
     <section className="relative w-full">
  <div className="w-full">
    <Image
      src="/assets/homepagewall.png"
      width={1920}
      height={1080}
      alt="wallpaper"
      className="w-full h-auto object-cover"
      priority
    />
  </div>

  <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,_white,_white,_transparent,_transparent)] pointer-events-none flex items-center">
    <div className="w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="flex flex-col w-full max-w-2xl pointer-events-auto">
        <h2 className="font-hanken text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-start text-gray-900">
          IT Support Specialist Professional Certificate
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 gap-2">
          <Image src="/assets/person.png" width={40} height={40} alt="person" className="w-10 h-10" />
          <h1 className="font-light text-sm sm:text-base text-gray-800">
            Instructor:{" "}
            <span className="text-blu underline mx-2">Claudia Pruitt</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 gap-2">
          <div className="flex items-center bg-orange-300 rounded-lg text-sm px-3 py-1 border border-gray-300 text-black font-medium">
            <Image src="/assets/congrateicon.png" width={16} height={16} className="mr-2 w-4 h-4" alt="congrats" />
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 gap-3">
          <div className="bg-org text-white rounded-full px-5 py-2 font-medium text-sm cursor-pointer">
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

<section className="relative my-8 text-gray-900 w-full">
  <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1100px]">
    <div className="flex flex-col w-full">
      <h2 className="font-hanken text-2xl sm:text-3xl md:text-4xl font-bold text-start mb-4 text-gray-800">
        Your Complete Skill Set Starts Here
      </h2>

      <div className="flex flex-wrap gap-4 sm:gap-6 my-3">
        <button
          onClick={() => setActiveTab("e-learning")}
          className={`pb-2 px-1 transition-all duration-300 ${
            activeTab === "e-learning"
              ? "text-gray-800 font-bold border-b-4 border-blue-500"
              : "text-gray-500 hover:text-gray-800 hover:border-b-4 hover:border-gray-300"
          }`}
        >
          E-learning
        </button>
        <button
          onClick={() => setActiveTab("blogs")}
          className={`pb-2 px-1 transition-all duration-300 ${
            activeTab === "blogs"
              ? "text-gray-800 font-bold border-b-4 border-blue-500"
              : "text-gray-500 hover:text-gray-800 hover:border-b-4 hover:border-gray-300"
          }`}
        >
          Blogs
        </button>
      </div>

      <hr className="border-gray-200" />
    </div>
  </div>
</section>


      {activeTab === "e-learning" ? (
        <>
          <section className="relative text-gray-900">
            <div className="w-full px-4 mx-auto max-w-[1100px] relative">
              <button
                onClick={scrollLeft}
                className="absolute left-[-46px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div
                ref={sliderRef}
                className="flex flex-row overflow-x-hidden pb-4 -mx-4 px-4 scroll-smooth"
              >
                <div className="flex flex-nowrap gap-4">
                  {sliderItems.map((item, index) => (
                    <div key={index} className="flex-shrink-0 w-fit py-2">
                      <div className="flex flex-col rounded-4xl bg-gray-100 px-5 py-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-100 transform hover:-translate-y-1">
                        <h2 className="font-bold font-dm text-xl text-gray-800 mb-2">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {item.courses} courses available
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollRight}
                className="absolute right-[-46px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </section>
          <section className="relative text-gray-900">
            <div className="w-full px-4 mx-auto max-w-[1100px] py-4 relative">
              <div className="flex flex-nowrap overflow-auto gap-3 py-6 custom-scroll scrollbar-hide">
                {courses.map((course) => (
                  <div className="flex flex-row w-[178px]" key={course.id}>
                    <div className="flex flex-col w-[178px] sm:w-[300px] border border-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300">
                      <div className="py-2 px-4 text-sm font-medium">
                        <h1 className="bg-blu p-2 w-fit rounded-4xl text-white">
                          {course.duration}
                        </h1>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-3 line-clamp-2 h-[3rem]">
                          {course.title}
                        </h3>

                        <div className="flex items-center text-gray-600 mb-4">
                          <FaBook className="mr-2 text-blue-500" />
                          <span className="text-sm">
                            {course.lessons} Lessons
                          </span>
                        </div>

                        <hr className="border-t border-gray-200 my-2" />

                        <div className="flex flex-col items-start gap-12 mb-3">
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {renderStars(course.rating)}
                            </div>
                            <span className="text-sm font-medium">
                              {course.rating}
                            </span>
                          </div>

                          <span className="text-lg font-bold">
                            ${course.price}
                          </span>
                        </div>

                        <a
                          href="#"
                          className="text-center text-org underline font-medium py-2 transition-colors"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="relative text-gray-900">
            <div className="w-full px-4 mx-auto max-w-[1100px] py-4 relative">
              <section className="relative mb-8">
                <div className="w-full px-4 mx-auto max-w-[1100px] relative">
                  <button
                    onClick={scrollLeft}
                    className="absolute left-[-46px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div
                    ref={sliderRef}
                    className="flex flex-row overflow-x-hidden pb-4 -mx-4 px-4 scroll-smooth"
                  >
                    <div className="flex flex-nowrap gap-4">
                      {blogCategories.map((category, index) => (
                        <div key={index} className="flex-shrink-0 w-fit py-2">
                          <div className="flex flex-col items-start justify-between px-5 py-3 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 cursor-pointer">
                            <span className="font-bold text-lg text-gray-800">
                              {category.name}
                            </span>
                            <p className="ml-2 text-sm text-gray-600">
                              ({category.count}) <span className=" text-sm text-gray-600">blogs here</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={scrollRight}
                    className="absolute right-[-46px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </section>

              <div className="w-full px-4 mx-auto max-w-[1100px] py-4 relative">
                <div
                  ref={sliderRef}
                  className="flex flex-nowrap overflow-auto gap-4 py-6 custom-scroll scrollbar-hide"
                >
                  {blogs.map((blog) => (
                    <div key={blog.id} className="flex-shrink-0 w-[300px] sm:w-[500px]">
                      <div className="flex flex-row w-full border border-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300">
                        <div className="w-1/2 h-full">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            width={250}
                            height={200}
                          />
                        </div>

                        <div className="w-1/2 p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-blue-600 font-medium">
                                {blog.category}
                              </span>
                              <span className="text-sm text-gray-500">
                                {blog.date}
                              </span>
                            </div>
                            <h3 className="font-bold text-lg mb-2 line-clamp-2 h-[3rem]">
                              {blog.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {blog.description}
                            </p>
                          </div>

                          <a
                            href="#"
                            className="text-org underline font-medium text-sm transition-colors"
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <section className="bg-[#081B25] text-gray-900 ">
        <div className="w-full px-4  mx-auto max-w-[1100px] py-14">
          <div className="flex flex-col justify-center items-center text-center mb-6">
            <h2 className="text-white font-hanken text-xl">
              Flexible Pricing for Individuals and Teams
            </h2>
          </div>

          <div className="w-full flex h-[444px] flex-row gap-6">
            <div className="w-1/2 flex h-full flex-col gap-6">
              <div className="flex flex-row h-full justify-between">
                <div className="bg-white rounded-lg w-full  p-6  flex flex-row justify-between mr-auto">
                  <div className="flex flex-col justify-between  w-1/2">
                    <div>
                      <h1 className="text-xl font-bold text-black mb-2">
                        Individual Courses
                      </h1>
                      <p className="text-gray-700">
                        Take Any Course for Just $99 – One-Time Payment,
                        Lifetime Access!
                      </p>
                    </div>
                    <button className="bg-[#F86537]  text-white py-2 px-6 rounded-4xl self-start">
                      Buy Now
                    </button>
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
                    <div className="flex flex-col items-end">
                      <h1 className=" flex justify-end text-white text-md uppercase bg-blu w-fit rounded-lg p-1 self-end mb-2">
                        One-Time Payment
                      </h1>
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold flex items-end flex-col">
                        $99
                      </h2>
                      <p className="flex items-end flex-col">per course</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row h-full justify-between">
                <div className="bg-white rounded-lg w-full  p-6  flex flex-row justify-between mr-auto">
                  <div className="flex flex-col justify-between  w-1/2">
                    <div>
                      <h1 className="text-xl font-bold text-black mb-2">
                        Individual Courses
                      </h1>
                      <p className="text-gray-700">
                        Take Any Course for Just $99 – One-Time Payment,
                        Lifetime Access!
                      </p>
                    </div>
                    <button className="bg-[#F86537]  text-white py-2 px-6 rounded-4xl self-start">
                      Buy Now
                    </button>
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
                    <div className="flex flex-col items-end">
                      <h1 className=" flex justify-end text-white text-md uppercase bg-blu w-fit rounded-lg p-1 self-end mb-2">
                        One-Time Payment
                      </h1>
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold flex items-end flex-col">
                        $99
                      </h2>
                      <p className="flex items-end flex-col">per course</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-white rounded-lg p-6  h-full flex flex-col justify-between ml-auto">
              <div>
                <h1 className="text-2xl font-bold text-black mb-2">
                  Corporate Subscriptions
                </h1>
                <p className="text-gray-700 mb-4">
                  Choose from 10, 20, or 50-user plans designed for
                  organizations that value continuous development.
                </p>
                <ul className="space-y-2">
                  <li className="flex py-2 items-center">
                    <div className="flex flex-row w-full justify-between">
                      <div>
                        <h1 className="text-3xl font-bold">$1990</h1>
                      </div>
                      <div className="flex items-center w-1/5 justify-between flex-row">
                        <h2>10 users</h2>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="checkbox"
                            className="peer hidden"
                          />
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300 p-2 flex items-center justify-center peer-checked:bg-org peer-checked:border-org transition">
                            <svg
                              className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </label>
                      </div>
                    </div>
                  </li>
                  <hr className="text-gray-200" />
                  <li className="flex py-2 items-center">
                    <div className="flex flex-row w-full justify-between">
                      <div>
                        <h1 className="text-3xl font-bold">$1990</h1>
                      </div>
                      <div className="flex items-center w-1/5 justify-between flex-row">
                        <h2>10 users</h2>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="checkbox"
                            className="peer hidden"
                          />
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300 p-2 flex items-center justify-center peer-checked:bg-org peer-checked:border-org transition">
                            <svg
                              className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </label>
                      </div>
                    </div>
                  </li>
                  <hr className="text-gray-200" />
                  <li className="flex py-2 items-center">
                    <div className="flex flex-row w-full justify-between">
                      <div>
                        <h1 className="text-3xl font-bold">$1990</h1>
                      </div>
                      <div className="flex items-center w-1/5 justify-between flex-row">
                        <h2>10 users</h2>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="checkbox"
                            className="peer hidden"
                          />
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300 p-2 flex items-center justify-center peer-checked:bg-org peer-checked:border-org transition">
                            <svg
                              className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </label>
                      </div>
                    </div>
                  </li>
                  <hr className="text-gray-200" />
                </ul>
              </div>
              <button className="bg-[#F86537] text-white py-2 px-6 rounded-4xl w-full">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-16 text-gray-900 mt-24 w-full max-w-[1326px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 text-gray-900">
        {/* Info Card */}
        <div className="flex flex-col items-start pt-10 pr-10 w-full lg:w-1/3 bg-sky-500 rounded-xl">
          <h2 className="ml-10 text-4xl font-bold text-white max-md:ml-4">
            What subscribers are achieving through learning
          </h2>
          <p className="mt-5 ml-10 text-2xl text-white max-md:ml-4">
            <span className="font-semibold text-[#FF9270]">37,076</span>
            <span> responses collected</span>
          </p>
          <div className="flex justify-between items-center mt-10 w-full px-10 max-md:px-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/130d72ee6184a472ad3edb3bbba812115cae9da8?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
              className="object-contain w-[150px] md:w-[200px] rounded-none"
              alt="Learning statistics"
            />
            <div className="flex gap-2 items-center">
              <button aria-label="Previous testimonial">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/86abcbed0348e0114509cab56011a93a7df8f1bf?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
                  className="object-contain aspect-square w-[40px] md:w-[50px]"
                  alt="Previous"
                />
              </button>
              <button aria-label="Next testimonial">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb2ea5548b6387d8aca0a2880a216cc986f8e138?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
                  className="object-contain aspect-square w-[40px] md:w-[50px]"
                  alt="Next"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="flex flex-col lg:flex-row gap-8 w-full lg:w-2/3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>


      <section className="self-center mt-32 text-gray-900 w-full max-w-[1326px] max-md:mt-10 max-md:max-w-full px-16">
      {/* On Site Learning Section */}
      <div className="flex flex-wrap gap-10 items-center w-full">
        <div className="grow shrink self-stretch my-auto min-w-60 w-[529px] max-md:max-w-full">
          <div className="w-full">
            <div className="flex flex-col justify-center w-full font-bold">
              <span className="self-start text-lg text-center text-orange-500 uppercase">
                about us
              </span>
              <h2 className="mt-5 text-5xl leading-tight text-neutral-900 max-md:text-4xl">
                On Site Learning
              </h2>
            </div>
            <p className="mt-5 text-2xl leading-8 text-neutral-900">
              At B.R Collins, our on-site training transforms everyday lessons into engaging and interactive experiences. Blending creativity with expertise.
            </p>
          </div>
          <div className="mt-10 w-full">
            <FeatureCard
              title="Flexible Classes"
              description="It is a long established fact that a reader will be distracted by this on readable content of when looking at its layout."
              iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0142af754e70f9fb9b82869b1b20e4421b6f04e5?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
            />
            <FeatureCard
              title="Expert-Led Training"
              description="Learn from industry experts in a real-world setting. Gain practical knowledge, hands-on experience."
              iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/fdae32a59490e8eef0a907659d5abbdfaaf27880?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
              className="mt-5"
            />
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ad81aa71094e8f17ed8df5001172ac5e3d12e12?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
          className="object-contain grow shrink self-stretch my-auto rounded-2xl aspect-[0.93] min-w-60 w-[452px] max-md:max-w-full"
          alt="On-site learning"
        />
      </div>

      {/* Community Section */}
      <div className="flex flex-wrap gap-10 items-center mt-32 w-full">
        <div className="flex flex-col grow shrink justify-center self-stretch my-auto min-w-60 w-[537px] max-md:max-w-full">
          <div className="w-full">
            <div className="flex flex-col justify-center w-full font-bold">
              <span className="self-start text-lg text-center text-orange-500 uppercase">
                WHY CHOOSE US
              </span>
              <h2 className="mt-5 text-5xl leading-[60px] text-neutral-900 max-md:text-4xl max-md:leading-[53px]">
                Creating A Community Of Life Long Learners
              </h2>
            </div>
            <p className="mt-5 text-2xl leading-8 text-neutral-900">
              At B.R Collins, our on-site training transforms everyday lessons into engaging and interactive experiences.
            </p>
          </div>
          <div className="flex gap-2.5 items-center self-start mt-8 text-lg font-semibold">
            <button className="overflow-hidden gap-1.5 self-stretch px-8 py-5 my-auto text-white bg-orange-500 min-h-[52px] rounded-[58px] max-md:px-5">
              Explore Courses
            </button>
            <button className="overflow-hidden gap-1.5 self-stretch px-8 py-5 my-auto border border-solid border-neutral-900 min-h-[52px] rounded-[48px] text-neutral-900 max-md:px-5">
              Learn More
            </button>
          </div>
        </div>

        <StatsSection />
      </div>
    </section>

    </>
  );
};