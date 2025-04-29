"use client";

import React from "react";
import { useCourseContext } from "../context/CourseContext";
import CourseCardSlider from "./CourseCardSlider";

const CourseSwiper: React.FC = () => {
  const { courses: featuredCourses } = useCourseContext();

  if (!featuredCourses || featuredCourses.length === 0) {
    return <p className="mt-10 text-gray-500">No featured courses available.</p>;
  }

  return (
    <div className="flex flex-wrap gap-8 items-center self-stretch mt-10">
      <CourseCardSlider courses={featuredCourses} />
    </div>
  );
};

export default CourseSwiper;
