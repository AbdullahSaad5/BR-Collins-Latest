"use client";
import React from "react";
import { toast } from "react-hot-toast";
import { AddUserIcon, ViewIcon, ArrowLeftIcon, ArrowRightIcon } from "./Icons";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";

interface CourseCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

const fetchCategories = async (): Promise<{ data: CourseCategory[] }> => {
  const response = await api.get("/course-categories");
  return response.data;
};

export default function ViewCourseCategories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course-categories"],
    queryFn: fetchCategories,
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900">Course Categories</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading categories. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Course Categories</h1>
        <button className="flex gap-2 items-center text-base font-medium text-orange-500 hover:text-orange-600 transition-colors">
          <AddUserIcon className="w-5 h-5" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="w-full border-collapse">
        {/* Table Header */}
        <div className="flex items-center p-3 rounded-lg bg-slate-100">
          <div className="flex-1 text-base font-medium text-left text-neutral-900">Name</div>
          <div className="flex-1 text-base font-medium text-left text-neutral-900">Description</div>
          <div className="flex-1 text-base font-medium text-left text-neutral-900">Created At</div>
          <div className="flex-1 text-base font-medium text-left text-neutral-900">Action</div>
        </div>

        {/* Table Rows */}
        {categories?.map((category: CourseCategory) => (
          <div
            key={`category-${category.id}`}
            className="flex items-center p-3 border-b border-solid border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <div className="flex-1 text-base text-left text-neutral-900">{category.name}</div>
            <div className="flex-1 text-base text-left text-neutral-900">{category.description}</div>
            <div className="flex-1 text-base text-left text-neutral-900">
              {new Date(category.createdAt).toLocaleDateString()}
            </div>
            <div className="flex-1 text-base text-left text-neutral-900">
              <button
                aria-label="View category details"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ViewIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
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
}
