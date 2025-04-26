"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import FormField from "./FormField";
import { ICourse } from "@/app/types/course.contract";
import { CourseContentCreatePayload } from "@/app/types/course-content.contract";

const fetchCourses = async (): Promise<{ data: ICourse[] }> => {
  const response = await api.get("/courses");
  return response.data;
};

const courseContentSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  contentType: z.string().min(1, "Content type is required"),
  contentUrl: z.string().min(1, "Content URL is required"),
  duration: z.string().min(1, "Duration is required"),
  order: z.number().min(0, "Order must be a non-negative number"),
});

export default function AddCourseContent() {
  const [success, setSuccess] = useState(false);

  const {
    data: courses,
    isLoading: isLoadingCourses,
    error: coursesError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    select: (data) => data.data,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseContentCreatePayload>({
    resolver: zodResolver(courseContentSchema),
    defaultValues: {
      courseId: "",
      title: "",
      description: "",
      contentType: "",
      contentUrl: "",
      duration: "",
      order: 0,
    },
  });

  const createCourseContentMutation = useMutation({
    mutationFn: async (data: CourseContentCreatePayload) => {
      console.log(data);
      const response = await api.post("/course-contents", data);
      return response.data;
    },
    onSuccess: () => {
      showToast("Course content added successfully", "success");
      setSuccess(true);
      reset();
    },
    onError: (error) => {
      showToast("Failed to add course content", "error");
      console.error("Error adding course content:", error);
    },
  });

  const onSubmit = async (data: CourseContentCreatePayload) => {
    createCourseContentMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-8">Add Course Content</h2>

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">Course content added successfully!</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormField
          label="Course *"
          description="Select the course for this content"
          {...register("courseId")}
          error={errors.courseId?.message}
          select
          required
          options={[
            { value: "", label: isLoadingCourses ? "Loading courses..." : "Select a course" },
            ...(courses?.map((course) => ({
              value: course._id,
              label: course.title,
            })) || []),
          ]}
        />

        {isLoadingCourses && <div className="text-sm text-gray-500">Loading courses...</div>}

        {coursesError && <div className="text-sm text-red-500">Error loading courses. Please try again later.</div>}

        <FormField
          label="Content Title *"
          description="Enter the title for this content"
          placeholder="Content title"
          {...register("title")}
          error={errors.title?.message}
          required
        />

        <FormField
          label="Description *"
          description="Provide a detailed description of the content"
          placeholder="Content description..."
          {...register("description")}
          error={errors.description?.message}
          textarea
          required
        />

        <FormField
          label="Content Type *"
          description="Select the type of content"
          {...register("contentType")}
          error={errors.contentType?.message}
          select
          required
          options={[
            { value: "", label: "Select content type" },
            { value: "video", label: "Video" },
            { value: "document", label: "Document" },
          ]}
        />

        <FormField
          label="Content URL *"
          description="Enter the URL or upload the content"
          placeholder="https://..."
          {...register("contentUrl")}
          error={errors.contentUrl?.message}
          required
        />

        <FormField
          label="Duration (minutes) *"
          description="Enter the duration of the content in minutes"
          placeholder="30"
          {...register("duration")}
          error={errors.duration?.message}
          type="number"
          required
        />

        <FormField
          label="Order *"
          description="Set the order of this content in the course"
          placeholder="1"
          {...register("order", { valueAsNumber: true })}
          error={errors.order?.message}
          type="number"
          required
        />

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={createCourseContentMutation.isPending}
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {createCourseContentMutation.isPending ? "Adding Content..." : "Add Content"}
          </button>
        </div>
      </form>
    </div>
  );
}
