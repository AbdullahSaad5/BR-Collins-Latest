import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useCourseContext } from "../context/CourseContext";

import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";

interface HeroSectionProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ activeIndex, setActiveIndex }) => {
  const { courses, isLoading } = useCourseContext();
  const firstCourse = courses && courses.length > 0 ? courses[0] : null;

  return (
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
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-b-sm rounded-tl-sm transition-all duration-300 ${
                i === activeIndex ? "bg-[#F86537]" : "bg-[#FFFFFF99]"
              }`}
            />
          ))}
        </div>
        <SwiperSlide>
          {/* First slide content - dynamic */}
          <section className="relative w-full">
            <div className="w-full">
              {isLoading || !firstCourse ? (
                <div className="w-full h-[300px] lg:h-[500px] bg-gray-200 animate-pulse" />
              ) : (
                <Image
                  src={"/assets/homepagewall.png"}
                  width={1920}
                  height={1080}
                  alt="wallpaper"
                  className="w-full h-[300px] lg:h-[500px] object-cover  object-right-top"
                  priority
                />
              )}
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[linear-gradient(to_right,_white,transparent)] md:bg-[linear-gradient(to_right,_white,_white,_transparent,_transparent)] pointer-events-none flex items-center">
              <div className="w-full p-4 md:p-8 lg:p-0 md:max-w-[1326px] mx-auto">
                <div className="flex flex-col p-4 md:p-4 xl:p-0 justify-start gap-3 md:gap-4 w-full max-w-2xl pointer-events-auto">
                  <h2 className="font-hanken text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-start text-gray-900">
                    {isLoading || !firstCourse ? (
                      <span className="bg-gray-200 rounded w-2/3 h-8 inline-block animate-pulse" />
                    ) : (
                      firstCourse.title
                    )}
                  </h2>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src="/assets/person.png"
                      width={40}
                      height={40}
                      alt="person"
                      className="w-10 h-10 hidden sm:block"
                    />
                    <h1 className="font-light text-sm sm:text-base text-gray-800">
                      Instructor:
                      <span className="font-medium ml-1">
                        {isLoading || !firstCourse ? (
                          <span className="bg-gray-200 rounded w-16 h-4 inline-block animate-pulse" />
                        ) : (
                          firstCourse.instructor
                        )}
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
                      {isLoading || !firstCourse ? (
                        <span className="bg-gray-200 rounded w-8 h-4 inline-block animate-pulse" />
                      ) : (
                        firstCourse.rating
                      )}
                      <span className="text-yellow-500 flex items-center text-sm">
                        {[...Array(4)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                        <FaStarHalfAlt />
                      </span>
                    </h1>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Link
                      href={`/course/${firstCourse?._id}`}
                      className="bg-orange-500 text-white rounded-full px-4 md:px-5 py-1 md:py-2 font-medium text-sm cursor-pointer"
                    >
                      Enroll Now
                    </Link>
                    <div className="text-sm text-gray-700">
                      Start{" "}
                      <span className="font-bold">
                        {isLoading || !firstCourse ? (
                          <span className="bg-gray-200 rounded w-12 h-4 inline-block animate-pulse" />
                        ) : firstCourse.startDate ? (
                          new Date(firstCourse.startDate).toLocaleDateString()
                        ) : (
                          "Soon"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          {/* Second slide content */}
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
                  <p className="text-xl">Get the skills to achieve goals and stay competitive.</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <a
                      href="/subscriptions"
                      className="bg-orange-500 text-white rounded-full px-4 md:px-5 py-1 md:py-2 font-medium text-sm cursor-pointer"
                    >
                      Plans for Individual
                    </a>
                    <a
                      href="/subscriptions"
                      className="bg-transparent text-black border-1 border-gray-600 rounded-full px-4 md:px-5 py-1 md:py-2 font-medium text-sm cursor-pointer"
                    >
                      Plans for Corporate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
