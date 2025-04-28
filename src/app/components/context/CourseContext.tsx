"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import courseData from "../../../../public/data/courses.json"; // adjust the path as needed

export interface CourseDetailsType {
  startDate: string;
  enrolled: number;
  lectures: number;
  skillLevel: string;
  language: string;
  quizzes: number;
  certificate: string;
}

export interface LectureType {
  title: string;
  duration: string;
  type: string;
}

export interface SectionType {
  title: string;
  stats: string;
  icon: string;
  lectures: LectureType[];
}

export interface CourseType {
  slug: string;
  duration: string;
  title: string;
  instructor?: string;
  lessons: number;
  rating: number;
  price: string;
  originalPrice?: string;
  isNew?: boolean;
  imageUrl?: string;
  courseDetails: CourseDetailsType;
  description: string;
  learningObjectives: string[];
  requirements: string[];
  sections: SectionType[];
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
    setCourses(courseData as CourseType[]);
  }, []);

  return <CourseContext.Provider value={{ courses }}>{children}</CourseContext.Provider>;
};
