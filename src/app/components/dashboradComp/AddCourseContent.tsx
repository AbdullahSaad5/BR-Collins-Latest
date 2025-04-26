"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "./FormField";

const courseContentSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  contentType: z.string().min(1, "Content type is required"),
  contentUrl: z.string().min(1, "Content URL is required"),
  duration: z.string().min(1, "Duration is required"),
  order: z.number().min(0, "Order must be a non-negative number"),
});

type CourseContentFormData = z.infer<typeof courseContentSchema>;

export default function AddCourseContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseContentFormData>({
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

  const onSubmit = async (data: CourseContentFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Course content submitted:", data);
      setSuccess(true);
      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error("Error submitting course content:", error);
    } finally {
      setIsSubmitting(false);
    }
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
            { value: "", label: "Select a course" },
            { value: "1", label: "Introduction to React" },
            { value: "2", label: "Advanced JavaScript" },
            { value: "3", label: "UI/UX Design Principles" },
          ]}
        />

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
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {isSubmitting ? "Adding Content..." : "Add Content"}
          </button>
        </div>
      </form>
    </div>
  );
}
