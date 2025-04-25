"use client";
import React, { useState, useRef } from "react";
import { CourseCreatePayload } from "@/app/types/course.contract";
import FormField from "./FormField";
import ToggleOption from "./ToggleOption";

export default function AddCourseStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [courseData, setCourseData] = useState<Partial<CourseCreatePayload>>({
    title: "",
    subtitle: "",
    slug: "",
    noOfLessons: 0,
    noOfHours: 0,
    startDate: new Date(),
    language: "English",
    lastUpdated: new Date(),
    bestSeller: false,
    price: 0,
    discountPrice: 0,
    isDiscounted: false,
    isFeatured: false,
    isPublished: false,
    isArchived: false,
    isDeleted: false,
    previewVideoUrl: "",
    coverImageUrl: "",
    whatYouWillLearn: [],
    requirements: [],
    overview: "",
    description: "",
    instructor: "",
    skillLevel: "Beginner",
    noOfQuizzes: 0,
    hasCertificate: false,
    passPercentage: 70,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = ["Basic Information", "Course Details", "Pricing & Features", "Media & Completion"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real implementation, you would upload the file and get the URL
      setCourseData((prev) => ({
        ...prev,
        coverImageUrl: URL.createObjectURL(file),
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBulletPoint = (name: keyof CourseCreatePayload) => {
    setCourseData((prev) => ({
      ...prev,
      [name]: [...((prev[name] as string[]) || []), ""],
    }));
  };

  const handleRemoveBulletPoint = (name: keyof CourseCreatePayload, index: number) => {
    setCourseData((prev) => ({
      ...prev,
      [name]: (prev[name] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleBulletPointChange = (name: keyof CourseCreatePayload, index: number, value: string) => {
    setCourseData((prev) => {
      const newArray = [...(prev[name] as string[])];
      newArray[index] = value;
      return {
        ...prev,
        [name]: newArray,
      };
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Print all course data in a readable format
      console.log("Course Data:", {
        "Basic Information": {
          Title: courseData.title,
          Subtitle: courseData.subtitle,
          Slug: courseData.slug,
          Description: courseData.description,
          Overview: courseData.overview,
          Instructor: courseData.instructor,
        },
        "Course Details": {
          Language: courseData.language,
          "Skill Level": courseData.skillLevel,
          "Duration (hours)": courseData.noOfHours,
          "Number of Lessons": courseData.noOfLessons,
          "Start Date": courseData.startDate?.toLocaleDateString(),
          "Last Updated": courseData.lastUpdated?.toLocaleDateString(),
        },
        "Pricing & Features": {
          Price: `$${courseData.price}`,
          "Discount Price": courseData.isDiscounted ? `$${courseData.discountPrice}` : "No discount",
          "Is Discounted": courseData.isDiscounted ? "Yes" : "No",
          "Best Seller": courseData.bestSeller ? "Yes" : "No",
          "Is Featured": courseData.isFeatured ? "Yes" : "No",
          "Is Published": courseData.isPublished ? "Yes" : "No",
        },
        "Learning Outcomes": courseData.whatYouWillLearn?.map((point, index) => `${index + 1}. ${point}`),
        Requirements: courseData.requirements?.map((req, index) => `${index + 1}. ${req}`),
        "Media & Completion": {
          "Cover Image": courseData.coverImageUrl ? "Uploaded" : "Not uploaded",
          "Preview Video URL": courseData.previewVideoUrl || "Not provided",
          "Number of Quizzes": courseData.noOfQuizzes,
          Certificate: courseData.hasCertificate ? "Yes" : "No",
          "Pass Percentage": courseData.hasCertificate ? `${courseData.passPercentage}%` : "N/A",
        },
      });

      setSuccess(true);
    } catch (error) {
      console.error("Error submitting course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <FormField
              label="Course Title *"
              description="Enter the full title of the course."
              placeholder="Introduction to React"
              name="title"
              value={courseData.title || ""}
              onChange={handleChange}
              required
            />
            <FormField
              label="Subtitle"
              description="A brief subtitle for your course."
              placeholder="Learn React from scratch"
              name="subtitle"
              value={courseData.subtitle || ""}
              onChange={handleChange}
            />
            <FormField
              label="Slug *"
              description="A URL-friendly version of the title."
              placeholder="introduction-to-react"
              name="slug"
              value={courseData.slug || ""}
              onChange={handleChange}
              required
            />
            <FormField
              label="Overview *"
              description="A brief overview of what students will learn."
              placeholder="Course overview..."
              name="overview"
              value={courseData.overview || ""}
              onChange={handleChange}
              textarea
              required
            />
            <div className="flex flex-wrap gap-10 mt-6 max-w-full w-[705px]">
              <div className="grow shrink-0 basis-0 w-fit">
                <label className="text-base text-neutral-900">What You'll Learn *</label>
                <p className="mt-1 text-sm text-gray-500">Add key learning outcomes for this course</p>
              </div>
              <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
                <div className="space-y-2">
                  {(courseData.whatYouWillLearn || []).map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleBulletPointChange("whatYouWillLearn", index, e.target.value)}
                        placeholder="Enter a learning point"
                        className="flex-1 overflow-hidden gap-1.5 self-stretch px-4 py-3 rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBulletPoint("whatYouWillLearn", index)}
                        className="p-2 text-red-500 hover:text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddBulletPoint("whatYouWillLearn")}
                    className="px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    + Add Learning Point
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-10 mt-6 max-w-full w-[705px]">
              <div className="grow shrink-0 basis-0 w-fit">
                <label className="text-base text-neutral-900">Requirements *</label>
                <p className="mt-1 text-sm text-gray-500">Add prerequisites for this course</p>
              </div>
              <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
                <div className="space-y-2">
                  {(courseData.requirements || []).map((requirement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleBulletPointChange("requirements", index, e.target.value)}
                        placeholder="Enter a requirement"
                        className="flex-1 overflow-hidden gap-1.5 self-stretch px-4 py-3 rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBulletPoint("requirements", index)}
                        className="p-2 text-red-500 hover:text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddBulletPoint("requirements")}
                    className="px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    + Add Requirement
                  </button>
                </div>
              </div>
            </div>
            <FormField
              label="Description *"
              description="Provide a detailed description of the course content."
              placeholder="Course description..."
              name="description"
              value={courseData.description || ""}
              onChange={handleChange}
              textarea
              required
            />

            <FormField
              label="Instructor *"
              description="Name of the course instructor."
              placeholder="John Doe"
              name="instructor"
              value={courseData.instructor || ""}
              onChange={handleChange}
              required
            />
          </>
        );
      case 1:
        return (
          <>
            <FormField
              label="Language *"
              description="Select the primary language of instruction."
              name="language"
              value={courseData.language || ""}
              onChange={handleChange}
              select
              required
              options={[
                { value: "English", label: "English" },
                { value: "Spanish", label: "Spanish" },
                { value: "French", label: "French" },
              ]}
            />
            <FormField
              label="Skill Level *"
              description="Select the target skill level for this course."
              name="skillLevel"
              value={courseData.skillLevel || ""}
              onChange={handleChange}
              select
              required
              options={[
                { value: "Beginner", label: "Beginner" },
                { value: "Intermediate", label: "Intermediate" },
                { value: "Advanced", label: "Advanced" },
              ]}
            />

            <FormField
              label="Number of Lessons *"
              description="Total number of lessons in the course."
              placeholder="20"
              name="noOfLessons"
              value={courseData.noOfLessons?.toString() || ""}
              onChange={handleChange}
              type="number"
              required
            />
            <FormField
              label="Number of Hours *"
              description="Total duration of the course in hours."
              placeholder="10"
              name="noOfHours"
              value={courseData.noOfHours?.toString() || ""}
              onChange={handleChange}
              type="number"
              required
            />
            <FormField
              label="Start Date *"
              description="When the course will be available."
              name="startDate"
              value={courseData.startDate?.toISOString().split("T")[0] || ""}
              onChange={handleChange}
              type="date"
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <FormField
              label="Price (USD) *"
              description="Set the price for this course in US dollars."
              placeholder="99"
              name="price"
              value={courseData.price?.toString() || ""}
              onChange={handleChange}
              type="number"
              required
            />
            <FormField
              label="Discount Price (USD)"
              description="Optional discounted price for the course."
              placeholder="79"
              name="discountPrice"
              value={courseData.discountPrice?.toString() || ""}
              onChange={handleChange}
              type="number"
            />
            <div className="flex flex-wrap gap-10 mt-6 max-w-full w-[705px]">
              <div className="grow shrink-0 basis-0 w-fit">
                <label className="text-base text-neutral-900">Course Features</label>
                <p className="mt-1 text-sm text-gray-500">Configure additional course settings</p>
              </div>
              <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
                <div className="space-y-4">
                  <ToggleOption
                    label="Enable Discount"
                    description="Offer this course at a discounted price"
                    checked={courseData.isDiscounted || false}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        isDiscounted: e.target.checked,
                      }))
                    }
                  />
                  <ToggleOption
                    label="Mark as Best Seller"
                    description="Display a best seller badge on the course"
                    checked={courseData.bestSeller || false}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        bestSeller: e.target.checked,
                      }))
                    }
                  />
                  <ToggleOption
                    label="Feature this Course"
                    description="Show this course in featured sections"
                    checked={courseData.isFeatured || false}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        isFeatured: e.target.checked,
                      }))
                    }
                  />
                  {/* <ToggleOption
                    label="Publish Course"
                    description="Make this course available to students"
                    checked={courseData.isPublished || false}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        isPublished: e.target.checked,
                      }))
                    }
                  /> */}
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
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
                      {courseData.coverImageUrl ? "Change Image" : "Upload Image"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <FormField
              label="Preview Video URL"
              description="Optional URL for a course preview video."
              placeholder="https://youtube.com/watch?v=..."
              name="previewVideoUrl"
              value={courseData.previewVideoUrl || ""}
              onChange={handleChange}
            />
            {/* <FormField
              label="Number of Quizzes"
              description="Total number of quizzes in the course."
              placeholder="5"
              name="noOfQuizzes"
              value={courseData.noOfQuizzes?.toString() || ""}
              onChange={handleChange}
              type="number"
            />
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="hasCertificate"
                name="hasCertificate"
                checked={courseData.hasCertificate || false}
                onChange={(e) =>
                  setCourseData((prev) => ({
                    ...prev,
                    hasCertificate: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="hasCertificate" className="text-sm text-gray-700">
                Offer completion certificate
              </label>
            </div>
            {courseData.hasCertificate && (
              <FormField
                label="Pass Percentage *"
                description="Minimum percentage required to pass the course."
                placeholder="70"
                name="passPercentage"
                value={courseData.passPercentage?.toString() || ""}
                onChange={handleChange}
                type="number"
                required
              />
            )} */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-8">Add New Course</h2>

      {success && <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">Course added successfully!</div>}

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === activeStep
                      ? "bg-orange-500 text-white"
                      : index < activeStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700">{step}</div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div
                    className={`h-full ${index < activeStep ? "bg-green-500" : "bg-gray-200"}`}
                    style={{ width: index < activeStep ? "100%" : "0%" }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStepContent(activeStep)}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Back
          </button>
          {activeStep === steps.length - 1 ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Course"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
