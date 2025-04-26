
"use client";

import React from "react";
import { TopBanner } from "../TopBanner";
import { Navigation } from "../Navigation";
import { HeroSection } from "./HeroSection";
import { CourseCard } from "./CourseCard";
import FilterSection from "./FilterSection";
import CourseSwiper from "./CourseSwiper";
import { FeatureCourse } from "./FetureCourse";
import { useCourseContext } from "../context/CourseContext";


export default function Courses() {
  const { courses: featuredCourses } = useCourseContext();

  return (
    <main className="flex overflow-hidden flex-col bg-white">
             
      <HeroSection />

      <section className="flex flex-col self-center mt-20 w-full max-w-[1326px] max-md:mt-10 max-md:max-w-full pl-2 p-2">
        <div className="flex flex-col items-start mr-0 w-full max-md:max-w-full p-2">
          <div className="text-neutral-900 max-md:max-w-full">
            <h2 className="text-3xl font-bold max-md:max-w-full">
              Featured courses
            </h2>
            <p className="mt-3 text-lg max-md:max-w-full">
              Many learners enjoyed this highly rated course for its engaging
              content.
            </p>
          </div>

          <div className="mt-10 w-full max-w-[1326px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
  {featuredCourses
    .filter(course => course.isNew) // Filter courses where isNew is true
    .map((course, index) => (
      <div key={index} className="w-6/12 max-md:w-full">
        <FeatureCourse {...course} />
      </div>
    ))}
</div>
          </div>

          <section className="mt-20 text-neutral-900 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-3xl font-bold max-md:max-w-full">
              Most Popular Courses
            </h2>
            <p className="mt-3 text-lg max-md:max-w-full">
              Explore courses from experienced, real-world experts.
            </p>
          </section>

          <div className="flex gap-8 items-center mt-14 text-xl whitespace-nowrap max-md:mt-10">
            <button className="self-stretch my-auto font-bold text-neutral-900">
              e-learning
            </button>
            <button className="self-stretch my-auto font-medium text-gray-500">
              in-person
            </button>
          </div>

          <div className="z-10 shrink-0 mt-4 h-1 border-4 border-orange-500 border-solid w-[110px]" />
          <div className="shrink-0 max-w-full h-px bg-white border border-solid border-zinc-200 w-[1326px]" />

         
    
       <CourseSwiper />


        </div>
      </section>

      <section className="flex flex-col self-center mt-20 w-full max-w-[1326px] max-md:mt-10 max-md:max-w-full pl-2 p-2">
        <h2 className="self-start text-3xl font-bold text-center text-neutral-900 max-md:max-w-full p-5">
          All Accountability in the Workplace courses
        </h2>

        <div className="mt-16 max-md:mt-10 max-md:max-w-full p-5">
          <div className="flex gap-5 max-md:flex-col">
            <aside className="w-[31%] max-md:w-full">
              <FilterSection />
            </aside>

            <main className="ml-5 w-[69%] max-md:ml-0 max-md:w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {featuredCourses.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </main>
  );
}
