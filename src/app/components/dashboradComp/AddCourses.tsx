"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  category: z.string().min(1, "Category is required"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Duration must be a positive number",
    }),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a non-negative number",
    }),
  instructor: z
    .string()
    .min(1, "Instructor name is required")
    .max(100, "Instructor name must be less than 100 characters"),
  image: z.instanceof(File).nullable(),
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function AddCourses() {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
      price: "",
      instructor: "",
      image: null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setValue("image", file);

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

  const onSubmit = async (data: CourseFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Course submitted:", data);

      // Reset form after successful submission
      reset();
      setPreviewImage(null);
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };

  return (
    <form className="flex flex-col items-start my-auto max-md:max-w-full" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-semibold text-neutral-900">Add New Course</h2>

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
                {watch("image") ? "Change Image" : "Upload Image"}
              </button>
              {watch("image") && <p className="mt-1 text-xs text-gray-500">{(watch("image") as File)?.name}</p>}
            </div>
          </div>
        </div>
      </div>

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Course Title *"
        description="Enter the full title of the course."
        placeholder="Introduction to React"
        {...register("title")}
        error={errors.title?.message}
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Description *"
        description="Provide a detailed description of the course content."
        placeholder="Course description..."
        {...register("description")}
        textarea
        error={errors.description?.message}
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Category *"
        description="Select the most relevant category for this course."
        {...register("category")}
        select
        error={errors.category?.message}
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
        {...register("duration")}
        type="number"
        error={errors.duration?.message}
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Price (USD) *"
        description="Set the price for this course in US dollars."
        placeholder="99"
        {...register("price")}
        type="number"
        error={errors.price?.message}
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Instructor *"
        description="Enter the name of the course instructor."
        placeholder="Instructor name"
        {...register("instructor")}
        error={errors.instructor?.message}
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
  name?: string;
  error?: string;
  textarea?: boolean;
  select?: boolean;
  type?: string;
  options?: { value: string; label: string }[];
}

function FormField({
  label,
  description,
  placeholder,
  error,
  textarea = false,
  select = false,
  type = "text",
  options = [],
  ...props
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
            placeholder={placeholder}
            className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[100px]"
            {...props}
          />
        ) : select ? (
          <select
            className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
            {...props}
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
            placeholder={placeholder}
            className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
            {...props}
          />
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
