"use client";
import React, { useState, useRef } from "react";

export default function AddCourses() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    price: "",
    instructor: "",
    image: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCourseData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Course submitted:", courseData);
      setSuccess(true);
      // Reset form after successful submission
      setCourseData({
        title: "",
        description: "",
        category: "",
        duration: "",
        price: "",
        instructor: "",
        image: null,
      });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error submitting course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col items-start my-auto max-md:max-w-full" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-neutral-900">Add New Course</h2>

      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md w-full">Course added successfully!</div>
      )}

      {/* Image Upload Section */}
      <div className="flex flex-wrap gap-10 mt-6 max-w-full w-[705px]">
        <div className="grow shrink-0 basis-0 w-fit">
          <label className="text-base text-neutral-900">Course Image</label>
          <p className="mt-1 text-sm text-gray-500">
            Upload a cover image for your course. Recommended size: 1200x800 pixels.
          </p>
        </div>
        <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg bg-slate-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
              {previewImage ? (
                <img src={previewImage} alt="Course preview" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 bg-white text-neutral-900 hover:bg-slate-50 transition-colors"
              >
                {courseData.image ? "Change Image" : "Upload Image"}
              </button>
              {courseData.image && <p className="mt-1 text-xs text-gray-500">{courseData.image.name}</p>}
            </div>
          </div>
        </div>
      </div>

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Course Title *"
        description="Enter the full title of the course."
        placeholder="Introduction to React"
        name="title"
        value={courseData.title}
        onChange={handleChange}
        required
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Description *"
        description="Provide a detailed description of the course content."
        placeholder="Course description..."
        name="description"
        value={courseData.description}
        onChange={handleChange}
        textarea
        required
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Category *"
        description="Select the most relevant category for this course."
        name="category"
        value={courseData.category}
        onChange={handleChange}
        select
        required
        options={[
          { value: "", label: "Select a category" },
          { value: "web-development", label: "Web Development" },
          { value: "data-science", label: "Data Science" },
          { value: "mobile-development", label: "Mobile Development" },
          { value: "design", label: "Design" },
          { value: "business", label: "Business" },
        ]}
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Duration (hours) *"
        description="Enter the total duration of the course in hours."
        placeholder="10"
        name="duration"
        value={courseData.duration}
        onChange={handleChange}
        type="number"
        required
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Price (USD) *"
        description="Set the price for this course in US dollars."
        placeholder="99"
        name="price"
        value={courseData.price}
        onChange={handleChange}
        type="number"
        required
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Instructor *"
        description="Enter the name of the course instructor."
        placeholder="Instructor name"
        name="instructor"
        value={courseData.instructor}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="overflow-hidden self-stretch px-5 py-3 text-base font-medium text-white bg-orange-500 min-h-[48px] rounded-full w-fit mt-6 hover:bg-orange-600 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Adding Course..." : "Add Course"}
      </button>
    </form>
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
    <div className="flex flex-wrap gap-10 mt-6 max-w-full w-[705px]">
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
