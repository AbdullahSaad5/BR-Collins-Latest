"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import FormField from "./FormField";

interface CourseCategoryForm {
  name: string;
  description: string;
}

export default function AddCourseCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CourseCategoryForm>({
    name: "",
    description: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseCategoryForm>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (data: CourseCategoryForm) => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch("/api/course-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create course category");
      }

      toast.success("Course category created successfully");
      reset();
      setFormData({ name: "", description: "" });
    } catch (error) {
      toast.error("Failed to create course category");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-8">Add Course Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Category Name *"
          description="Enter the name of the course category"
          placeholder="Enter category name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormField
          label="Description *"
          description="Enter a description for the course category"
          placeholder="Enter category description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          textarea
          required
        />

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
