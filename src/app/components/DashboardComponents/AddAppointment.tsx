"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const appointmentSchema = z.object({
  venueName: z.string().min(1, "Venue name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  locationDetails: z.string().optional(),
  instructor: z.string().min(1, "Instructor name is required"),
  course: z.string().min(1, "Course is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  meetingType: z.string().optional(),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function AddAppointment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Appointment submitted:", data);
      setSuccess(true);
      reset();
    } catch (error) {
      console.error("Error submitting appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-8">Add New Appointment</h2>

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">Appointment added successfully!</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-neutral-900">Location Information</h3>

          <FormField
            label="Venue Name *"
            description="Name of the meeting venue or location"
            {...register("venueName")}
            error={errors.venueName?.message}
            required
            placeholder="e.g., Client Office, Conference Center, Hotel Name"
          />

          <FormField
            label="Street Address *"
            description="Street address of the location"
            {...register("address")}
            error={errors.address?.message}
            required
            placeholder="e.g., 123 Main Street"
          />

          <FormField
            label="City *"
            description="City name"
            {...register("city")}
            error={errors.city?.message}
            required
            placeholder="e.g., New York"
          />

          <FormField
            label="State *"
            description="State or province"
            {...register("state")}
            error={errors.state?.message}
            required
            placeholder="e.g., NY"
          />

          <FormField
            label="ZIP Code *"
            description="Postal code"
            {...register("zipCode")}
            error={errors.zipCode?.message}
            required
            placeholder="e.g., 10001"
          />

          <FormField
            label="Additional Location Details"
            description="Any additional information about the location"
            {...register("locationDetails")}
            error={errors.locationDetails?.message}
            placeholder="e.g., Floor number, suite number, parking instructions, or specific directions"
            textarea
          />
        </div>

        <FormField
          label="Instructor *"
          description="Enter the instructor's name"
          {...register("instructor")}
          error={errors.instructor?.message}
          required
          placeholder="e.g., John Smith"
        />

        <FormField
          label="Course *"
          description="Select the course for the appointment"
          {...register("course")}
          error={errors.course?.message}
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
          label="Date *"
          description="Select the date for the appointment"
          {...register("date")}
          error={errors.date?.message}
          type="date"
          required
        />

        <FormField
          label="Time *"
          description="Select the time for the appointment"
          {...register("time")}
          error={errors.time?.message}
          type="time"
          required
        />

        <FormField
          label="Notes"
          description="Add any additional notes for the appointment"
          placeholder="Enter notes..."
          {...register("notes")}
          error={errors.notes?.message}
          textarea
        />

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {isSubmitting ? "Adding Appointment..." : "Add Appointment"}
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
  error?: string;
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
  error,
  required = false,
  textarea = false,
  select = false,
  type = "text",
  options = [],
  ...props
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
            placeholder={placeholder}
            className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[100px]"
            required={required}
            {...props}
          />
        ) : select ? (
          <select
            className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
            required={required}
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
            required={required}
            {...props}
          />
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
