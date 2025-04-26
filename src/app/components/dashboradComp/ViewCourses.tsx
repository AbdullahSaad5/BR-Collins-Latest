"use client";
import React from "react";
import { ViewIcon, ArrowLeftIcon, ArrowRightIcon } from "./Icons";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { ICourse } from "@/app/types/course.contract";

const fetchCourses = async (): Promise<{ data: ICourse[] }> => {
  const response = await api.get("/courses");
  return response.data;
};

const ViewCourses = () => {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-neutral-900">View Courses</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-neutral-900">View Courses</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading courses. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">View Courses</h2>
      </div>

      <div className="w-full border-collapse">
        {/* Table Header */}
        <div className="flex items-center p-3 rounded-lg bg-slate-100">
          <div className="w-[25%] text-base font-medium text-left text-neutral-900">Course Title</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Instructor</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Lessons</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Hours</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Price</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Status</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col divide-y divide-slate-100">
          {courses?.map((course: ICourse) => (
            <div key={`course-${course.id}`} className="flex items-center p-3 hover:bg-slate-50 transition-colors">
              <div className="w-[25%] text-base text-left text-neutral-900 truncate" title={course.title}>
                {course.title}
              </div>
              <div className="w-[15%] text-base text-left text-neutral-900 truncate" title={course.instructor}>
                {course.instructor}
              </div>
              <div className="w-[10%] text-base text-left text-neutral-900">{course.noOfLessons}</div>
              <div className="w-[10%] text-base text-left text-neutral-900">{course.noOfHours}</div>
              <div className="w-[10%] text-base text-left text-neutral-900">
                ${course.price}
                {course.isDiscounted && (
                  <span className="ml-2 text-sm text-gray-500 line-through">${course.discountPrice}</span>
                )}
              </div>
              <div className="w-[10%]">
                <span
                  className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                    course.isPublished
                      ? "text-green-600 bg-emerald-50"
                      : course.isArchived
                      ? "text-gray-600 bg-gray-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {course.isPublished ? "Published" : course.isArchived ? "Archived" : "Draft"}
                </span>
              </div>
              <div className="w-[15%]">
                <button
                  aria-label="View course details"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ViewIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 px-2">
        <div className="text-sm text-gray-500">Page 1 of 1</div>
        <div className="flex gap-4 items-center">
          <button
            aria-label="Previous page"
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            disabled
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button
            aria-label="Next page"
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            disabled
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewCourses;
