"use client";
import React, { useState } from "react";
import { ViewIcon, ArrowLeftIcon, ArrowRightIcon } from "./Icons";

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  price: string;
  status: string;
}

const ViewCourses = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Introduction to React",
      category: "Web Development",
      instructor: "Jane Smith",
      duration: "10 hours",
      price: "$99",
      status: "Active",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      category: "Programming",
      instructor: "John Doe",
      duration: "15 hours",
      price: "$149",
      status: "Active",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      category: "Design",
      instructor: "Alex Johnson",
      duration: "8 hours",
      price: "$79",
      status: "Active",
    },
  ]);

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">View Courses</h2>
      </div>

      <div className="w-full border-collapse">
        {/* Table Header */}
        <div className="flex items-center p-3 rounded-lg bg-slate-100">
          <div className="w-[25%] text-base font-medium text-left text-neutral-900">Course Title</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Category</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Instructor</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Duration</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Price</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Status</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col divide-y divide-slate-100">
          {courses.map((course) => (
            <div key={course.id} className="flex items-center p-3 hover:bg-slate-50 transition-colors">
              <div className="w-[25%] text-base text-left text-neutral-900 truncate" title={course.title}>
                {course.title}
              </div>
              <div className="w-[15%] text-base text-left text-neutral-900 truncate" title={course.category}>
                {course.category}
              </div>
              <div className="w-[15%] text-base text-left text-neutral-900 truncate" title={course.instructor}>
                {course.instructor}
              </div>
              <div className="w-[10%] text-base text-left text-neutral-900">{course.duration}</div>
              <div className="w-[10%] text-base text-left text-neutral-900">{course.price}</div>
              <div className="w-[10%]">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 bg-emerald-50 rounded-full">
                  {course.status}
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
