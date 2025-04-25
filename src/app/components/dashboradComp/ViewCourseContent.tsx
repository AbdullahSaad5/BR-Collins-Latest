"use client";
import React, { useState } from "react";
import { ViewIcon, ArrowLeftIcon, ArrowRightIcon } from "./Icons";

interface CourseContent {
  id: number;
  title: string;
  course: string;
  contentType: string;
  duration: string;
  order: number;
  status: string;
}

const ViewCourseContent = () => {
  const [contents, setContents] = useState<CourseContent[]>([
    {
      id: 1,
      title: "Introduction to React Components",
      course: "Introduction to React",
      contentType: "Video",
      duration: "45 minutes",
      order: 1,
      status: "Active",
    },
    {
      id: 2,
      title: "State and Props",
      course: "Introduction to React",
      contentType: "Video",
      duration: "30 minutes",
      order: 2,
      status: "Active",
    },
    {
      id: 3,
      title: "React Hooks Basics",
      course: "Introduction to React",
      contentType: "Document",
      duration: "20 minutes",
      order: 3,
      status: "Active",
    },
  ]);

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">View Course Content</h2>
      </div>

      <div className="w-full border-collapse">
        {/* Table Header */}
        <div className="flex items-center p-3 rounded-lg bg-slate-100">
          <div className="w-[25%] text-base font-medium text-left text-neutral-900">Content Title</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Course</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Type</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Duration</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Order</div>
          <div className="w-[10%] text-base font-medium text-left text-neutral-900">Status</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col divide-y divide-slate-100">
          {contents.map((content) => (
            <div key={content.id} className="flex items-center p-3 hover:bg-slate-50 transition-colors">
              <div className="w-[25%] text-base text-left text-neutral-900 truncate" title={content.title}>
                {content.title}
              </div>
              <div className="w-[15%] text-base text-left text-neutral-900 truncate" title={content.course}>
                {content.course}
              </div>
              <div className="w-[15%] text-base text-left text-neutral-900">{content.contentType}</div>
              <div className="w-[10%] text-base text-left text-neutral-900">{content.duration}</div>
              <div className="w-[10%] text-base text-left text-neutral-900">{content.order}</div>
              <div className="w-[10%]">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 bg-emerald-50 rounded-full">
                  {content.status}
                </span>
              </div>
              <div className="w-[15%]">
                <button
                  aria-label="View content details"
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

export default ViewCourseContent;
