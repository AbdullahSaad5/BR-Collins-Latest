"use client";
import React from "react";
import { ViewIcon } from "./Icons";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { ICourse } from "@/app/types/course.contract";
import CustomDataTable from "./CustomDataTable";

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

  const columns = [
    {
      name: "Course Title",
      selector: (row: ICourse) => row.title,
      sortable: true,
      grow: 2.5,
      cell: (row: ICourse) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.title}>
          {row.title}
        </div>
      ),
    },
    {
      name: "Instructor",
      selector: (row: ICourse) => row.instructor,
      sortable: true,
      grow: 1.5,
      cell: (row: ICourse) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.instructor}>
          {row.instructor}
        </div>
      ),
    },
    {
      name: "Lessons",
      selector: (row: ICourse) => row.noOfLessons,
      sortable: true,
      grow: 1,
      cell: (row: ICourse) => <div className="text-base text-left text-neutral-900">{row.noOfLessons}</div>,
    },
    {
      name: "Hours",
      selector: (row: ICourse) => row.noOfHours,
      sortable: true,
      grow: 1,
      cell: (row: ICourse) => <div className="text-base text-left text-neutral-900">{row.noOfHours}</div>,
    },
    {
      name: "Price",
      selector: (row: ICourse) => row.price,
      sortable: true,
      grow: 1,
      cell: (row: ICourse) => (
        <div className="text-base text-left text-neutral-900">
          ${row.price}
          {row.isDiscounted && <span className="ml-2 text-sm text-gray-500 line-through">${row.discountPrice}</span>}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row: ICourse) => row.isPublished,
      sortable: true,
      grow: 1,
      cell: (row: ICourse) => (
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
            row.isPublished
              ? "text-green-600 bg-emerald-50"
              : row.isArchived
              ? "text-gray-600 bg-gray-50"
              : "text-red-600 bg-red-50"
          }`}
        >
          {row.isPublished ? "Published" : row.isArchived ? "Archived" : "Draft"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: ICourse) => (
        <div className="flex gap-2">
          <button aria-label="View course details" className="text-gray-500 hover:text-gray-700 transition-colors">
            <ViewIcon className="w-5 h-5" />
          </button>
        </div>
      ),
      grow: 1,
    },
  ];

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">View Courses</h2>
      </div>

      <CustomDataTable
        columns={columns}
        data={courses || []}
        isLoading={isLoading}
        error={error}
        noDataMessage="No courses found"
      />
    </section>
  );
};

export default ViewCourses;
