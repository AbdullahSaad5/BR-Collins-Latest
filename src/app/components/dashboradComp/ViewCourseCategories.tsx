"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AddUserIcon, ViewIcon, ArrowLeftIcon, ArrowRightIcon } from "./Icons";

interface CourseCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

// Mock data for demonstration
const mockCategories: CourseCategory[] = [
  {
    id: "1",
    name: "Web Development",
    description: "Courses covering frontend and backend web development technologies",
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Data Science",
    description: "Courses on data analysis, machine learning, and statistical methods",
    createdAt: "2024-03-16T14:30:00Z",
  },
  {
    id: "3",
    name: "Mobile Development",
    description: "Courses for iOS and Android app development",
    createdAt: "2024-03-17T09:15:00Z",
  },
  {
    id: "4",
    name: "Cloud Computing",
    description: "Courses covering AWS, Azure, and Google Cloud platforms",
    createdAt: "2024-03-18T11:45:00Z",
  },
  {
    id: "5",
    name: "UI/UX Design",
    description: "Courses on user interface and user experience design principles",
    createdAt: "2024-03-19T16:20:00Z",
  },
];

export default function ViewCourseCategories() {
  const [categories, setCategories] = useState<CourseCategory[]>(mockCategories);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // Simulate API call with setTimeout
  //   const fetchCategories = async () => {
  //     try {
  //       setIsLoading(true);
  //       // Simulate network delay
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       setCategories(mockCategories);
  //     } catch (error) {
  //       toast.error("Failed to fetch course categories");
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

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
        {categories.map((category) => (
          <div
            key={category.id}
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
