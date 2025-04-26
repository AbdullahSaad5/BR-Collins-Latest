"use client";
import React from "react";
import { toast } from "react-hot-toast";
import { AddUserIcon, ViewIcon } from "./Icons";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import CustomDataTable from "./CustomDataTable";

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

  const columns = [
    {
      name: "Name",
      selector: (row: CourseCategory) => row.name,
      sortable: true,
      grow: 1,
      cell: (row: CourseCategory) => <div className="text-base text-left text-neutral-900">{row.name}</div>,
    },
    {
      name: "Description",
      selector: (row: CourseCategory) => row.description,
      sortable: true,
      grow: 2,
      cell: (row: CourseCategory) => <div className="text-base text-left text-neutral-900">{row.description}</div>,
    },
    {
      name: "Created At",
      selector: (row: CourseCategory) => row.createdAt,
      sortable: true,
      grow: 1,
      cell: (row: CourseCategory) => (
        <div className="text-base text-left text-neutral-900">{new Date(row.createdAt).toLocaleDateString()}</div>
      ),
    },
    {
      name: "Actions",
      cell: (row: CourseCategory) => (
        <div className="flex gap-2">
          <button aria-label="View category details" className="text-gray-500 hover:text-gray-700 transition-colors">
            <ViewIcon className="w-5 h-5" />
          </button>
        </div>
      ),
      grow: 0.5,
    },
  ];

  if (error) {
    toast.error("Failed to fetch course categories");
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

      <CustomDataTable
        columns={columns}
        data={categories || []}
        isLoading={isLoading}
        error={error}
        noDataMessage="No course categories found"
      />
    </section>
  );
}
