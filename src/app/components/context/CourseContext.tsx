"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import courseData from "../../../../public/data/courses.json"; // adjust the path as needed

export interface CourseType {
  duration: string;
  title: string;
  instructor?: string;
  lessons: number;
  rating: number;
  price: string;
  originalPrice?: string;
  isNew?: boolean;
  imageUrl?: string;
}

interface CourseContextProps {
  courses: CourseType[];
}

const CourseContext = createContext<CourseContextProps>({ courses: [] });

export const useCourseContext = () => useContext(CourseContext);

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    // Simulate API fetch
    setCourses(courseData);
  }, []);

  return (
    <CourseContext.Provider value={{ courses }}>
      {children}
    </CourseContext.Provider>
  );
};
