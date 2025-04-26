"use client";
import React from "react";
import { ViewIcon, EditIcon } from "./Icons";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import { ICourseContent } from "@/app/types/course-content.contract";
import { ICourse } from "@/app/types/course.contract";
import CustomDataTable from "./CustomDataTable";

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

  const columns = [
    {
      name: "Content Title",
      selector: (row: ICourseContent) => row.title,
      sortable: true,
      grow: 2.5,
      cell: (row: ICourseContent) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.title}>
          {row.title}
        </div>
      ),
    },
    {
      name: "Course",
      selector: (row: ICourseContent) => (row.courseId as unknown as ICourse).title,
      sortable: true,
      grow: 1.5,
      cell: (row: ICourseContent) => (
        <div
          className="text-base text-left text-neutral-900 truncate"
          title={(row.courseId as unknown as ICourse).title}
        >
          {(row.courseId as unknown as ICourse).title}
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row: ICourseContent) => row.contentType,
      sortable: true,
      grow: 1.5,
      cell: (row: ICourseContent) => <div className="text-base text-left text-neutral-900">{row.contentType}</div>,
    },
    {
      name: "Duration",
      selector: (row: ICourseContent) => row.duration,
      sortable: true,
      grow: 1,
      cell: (row: ICourseContent) => <div className="text-base text-left text-neutral-900">{row.duration}</div>,
    },
    {
      name: "Order",
      selector: (row: ICourseContent) => row.order,
      sortable: true,
      grow: 1,
      cell: (row: ICourseContent) => <div className="text-base text-left text-neutral-900">{row.order}</div>,
    },
    {
      name: "Actions",
      cell: (row: ICourseContent) => (
        <div className="flex gap-2">
          <button aria-label="View content details" className="text-gray-500 hover:text-gray-700 transition-colors">
            <ViewIcon className="w-5 h-5" />
          </button>
          <button aria-label="Edit content" className="text-gray-500 hover:text-gray-700 transition-colors">
            <EditIcon className="w-5 h-5" />
          </button>
        </div>
      ),
      grow: 1.5,
    },
  ];

  if (error) {
    showToast("Failed to fetch course contents", "error");
  }

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">View Course Content</h2>
      </div>

      <CustomDataTable
        columns={columns}
        data={contents || []}
        isLoading={isLoading}
        error={error}
        noDataMessage="No course contents found"
      />
    </section>
  );
};

export default ViewCourseContent;
