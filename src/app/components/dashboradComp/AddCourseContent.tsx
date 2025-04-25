"use client";
import React, { useState, useRef } from "react";

interface CourseContent {
  title: string;
  description: string;
  courseId: string;
  contentType: string;
  contentUrl: string;
  duration: string;
  order: number;
}

export default function AddCourseContent() {
  const [contentData, setContentData] = useState<CourseContent>({
    title: "",
    description: "",
    courseId: "",
    contentType: "",
    contentUrl: "",
    duration: "",
    order: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Course content submitted:", contentData);
      setSuccess(true);
      // Reset form after successful submission
      setContentData({
        title: "",
        description: "",
        courseId: "",
        contentType: "",
        contentUrl: "",
        duration: "",
        order: 0,
      });
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Course *"
          description="Select the course for this content"
          name="courseId"
          value={contentData.courseId}
          onChange={handleChange}
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
          name="title"
          value={contentData.title}
          onChange={handleChange}
          required
        />

        <FormField
          label="Description *"
          description="Provide a detailed description of the content"
          placeholder="Content description..."
          name="description"
          value={contentData.description}
          onChange={handleChange}
          textarea
          required
        />

        <FormField
          label="Content Type *"
          description="Select the type of content"
          name="contentType"
          value={contentData.contentType}
          onChange={handleChange}
          select
          required
          options={[
            { value: "", label: "Select content type" },
            { value: "video", label: "Video" },
            { value: "document", label: "Document" },
            // { value: "quiz", label: "Quiz" },
            // { value: "assignment", label: "Assignment" },
          ]}
        />

        <FormField
          label="Content URL *"
          description="Enter the URL or upload the content"
          placeholder="https://..."
          name="contentUrl"
          value={contentData.contentUrl}
          onChange={handleChange}
          required
        />

        <FormField
          label="Duration (minutes) *"
          description="Enter the duration of the content in minutes"
          placeholder="30"
          name="duration"
          value={contentData.duration}
          onChange={handleChange}
          type="number"
          required
        />

        <FormField
          label="Order *"
          description="Set the order of this content in the course"
          placeholder="1"
          name="order"
          value={contentData.order.toString()}
          onChange={handleChange}
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

interface FormFieldProps {
  label: string;
  description: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  textarea?: boolean;
  select?: boolean;
  type?: string;
  options?: { value: string; label: string }[];
}

function FormField({
  label,
  description,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  textarea = false,
  select = false,
  type = "text",
  options = [],
}: FormFieldProps) {
  return (
    <div className="flex flex-wrap gap-10 max-w-full w-[705px]">
      <div className="grow shrink-0 basis-0 w-fit">
        <label className="text-base text-neutral-900">{label}</label>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
        {textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[100px]"
            required={required}
          />
        ) : select ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
            required={required}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
            required={required}
          />
        )}
      </div>
    </div>
  );
}
