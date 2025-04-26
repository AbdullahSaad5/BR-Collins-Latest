"use client";
import React, { useState } from "react";
import { AddUserIcon } from "./Icons";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { ICourse } from "@/app/types/course.contract";
import CustomDataTable from "./CustomDataTable";
import ActionIcons from "@/components/ActionIcons";
import ViewCourseModal from "./ViewCourseModal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const fetchCourses = async (): Promise<{ data: ICourse[] }> => {
  const response = await api.get("/courses");
  return response.data;
};

const ViewCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const router = useRouter();

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    select: (data) => data.data,
  });

  const handleViewCourse = (course: ICourse) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedCourse(null);
  };

  const handleEditCourse = (course: ICourse) => {
    router.push(`/dashboard?item=addCourse&edit=true&courseId=${course._id}`);
  };

  const handleDeleteCourse = (course: ICourse) => {
    // TODO: Implement delete course functionality
    console.log("Delete course:", course);
  };

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
        <ActionIcons
          onView={() => handleViewCourse(row)}
          onEdit={() => handleEditCourse(row)}
          viewTooltip="View Course Details"
          editTooltip="Edit Course"
          deleteTooltip="Delete Course"
          disabled={{
            view: false,
            edit: row.isArchived, // Prevent editing archived courses
            delete: row.isArchived, // Prevent deleting archived courses
          }}
        />
      ),
      grow: 0.5,
    },
  ];

  if (error) {
    toast.error("Failed to fetch courses");
  }

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">View Courses</h2>
        {/* <button className="flex gap-2 items-center text-base font-medium text-orange-500 hover:text-orange-600 transition-colors">
          <AddUserIcon className="w-5 h-5" />
          <span>Add New Course</span>
        </button> */}
      </div>

      <CustomDataTable
        columns={columns}
        data={courses || []}
        isLoading={isLoading}
        error={error}
        noDataMessage="No courses found"
      />

      {selectedCourse && (
        <ViewCourseModal course={selectedCourse} isOpen={isViewModalOpen} onClose={handleCloseViewModal} />
      )}
    </section>
  );
};

export default ViewCourses;
