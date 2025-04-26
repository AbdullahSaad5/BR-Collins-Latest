"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import FormField from "./FormField";

interface CourseCategoryForm {
  name: string;
  description: string;
  image?: File;
}

export default function AddCourseCategory() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CourseCategoryForm>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (data: CourseCategoryForm) => {
      const response = await api.post("/course-categories", {
        name: data.name,
        description: data.description,
        image: data.image,
      });
      return response.data;
    },
    onSuccess: () => {
      showToast("Course category created successfully", "success");
      reset();
      setPreviewImage(null);
    },
    onError: (error) => {
      showToast("Failed to create course category", "error");
      console.error("Error creating course category:", error);
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

  const onSubmit = async (data: CourseCategoryForm) => {
    createCategoryMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-8">Add Course Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormField
          label="Category Name *"
          description="Enter the name of the course category"
          placeholder="Enter category name"
          {...register("name", { required: "Category name is required" })}
          error={errors.name?.message}
          required
        />

        <FormField
          label="Description *"
          description="Enter a description for the course category"
          placeholder="Enter category description"
          {...register("description", { required: "Description is required" })}
          error={errors.description?.message}
          textarea
          required
        />

        <div className="flex flex-wrap gap-10 mt-6 max-w-full w-[705px]">
          <div className="grow shrink-0 basis-0 w-fit">
            <label className="text-base text-neutral-900">Category Image</label>
            <p className="mt-1 text-sm text-gray-500">Upload an image for the category</p>
          </div>
          <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-slate-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Category preview" className="w-full h-full object-cover" />
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
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 bg-white text-neutral-900 hover:bg-slate-50 transition-colors"
                >
                  {previewImage ? "Change Image" : "Upload Image"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={createCategoryMutation.isPending}
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {createCategoryMutation.isPending ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
