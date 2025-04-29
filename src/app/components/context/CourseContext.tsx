"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/app/utils/axios";
import { ICourse } from "@/app/types/course.contract";

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
  _id: string;
}

interface CourseContextProps {
  courses: ICourse[];
  isLoading: boolean;
  error: string | null;
}

const CourseContext = createContext<CourseContextProps>({ courses: [], isLoading: true, error: null });

export const useCourseContext = () => useContext(CourseContext);

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("data/courses.json");
        const apiCourses = response.data.data;

        setCourses(apiCourses);
      } catch (err) {
        setError("Failed to fetch courses");
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return <CourseContext.Provider value={{ courses, isLoading, error }}>{children}</CourseContext.Provider>;
};
