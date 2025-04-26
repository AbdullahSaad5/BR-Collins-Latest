"use client";
import React from "react";
import { ViewIcon, ArrowLeftIcon, ArrowRightIcon } from "./Icons";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import { ICourseContent } from "@/app/types/course-content.contract";
import { ICourse } from "@/app/types/course.contract";

const fetchCourseContents = async (): Promise<{ data: ICourseContent[] }> => {
  const response = await api.get("/course-contents?populate=courseId");
  return response.data;
};

const ViewCourseContent = () => {
  const {
    data: contents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course-contents"],
    queryFn: fetchCourseContents,
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-neutral-900">View Course Content</h2>
        </div>
        <div className="text-center py-8">Loading...</div>
      </section>
    );
  }

  if (error) {
    showToast("Failed to fetch course contents", "error");
    return (
      <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-neutral-900">View Course Content</h2>
        </div>
        <div className="text-center py-8 text-red-500">Error loading course contents</div>
      </section>
    );
  }

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
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col divide-y divide-slate-100">
          {contents?.map((content) => (
            <div key={content.id} className="flex items-center p-3 hover:bg-slate-50 transition-colors">
              <div className="w-[25%] text-base text-left text-neutral-900 truncate" title={content.title}>
                {content.title}
              </div>
              <div
                className="w-[15%] text-base text-left text-neutral-900 truncate"
                title={(content.courseId as unknown as ICourse).title}
              >
                {(content.courseId as unknown as ICourse).title}
              </div>
              <div className="w-[15%] text-base text-left text-neutral-900">{content.contentType}</div>
              <div className="w-[10%] text-base text-left text-neutral-900">{content.duration}</div>
              <div className="w-[10%] text-base text-left text-neutral-900">{content.order}</div>
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
