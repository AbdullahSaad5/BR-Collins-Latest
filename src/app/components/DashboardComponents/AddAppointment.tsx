"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import FormField from "./FormField";
import { AppointmentCreatePayload } from "@/app/types/appointment.contract";
import { ICourse } from "@/app/types/course.contract";
import { useRouter } from "next/navigation";

const fetchCourses = async (): Promise<{ data: ICourse[] }> => {
  const response = await api.get("/courses");
  return response.data;
};

const appointmentSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  location: z.object({
    venueName: z.string().min(1, "Venue name is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    additionalInfo: z.string().optional(),
    coordinates: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .optional(),
  }),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  maxParticipants: z
    .number({
      required_error: "Maximum participants is required",
      invalid_type_error: "Maximum participants must be a number",
    })
    .min(1, "Maximum participants is required"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price must be a positive number"),
  notes: z.string().min(1, "Notes are required"),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function AddAppointment() {
  const router = useRouter();
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

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: AppointmentCreatePayload) => {
      const response = await api.post("/appointments", data);
      return response.data;
    },
    onSuccess: () => {
      showToast("Appointment added successfully", "success");
      setSuccess(true);
      router.push("/dashboard?item=viewAppointments");
    },
    onError: (error) => {
      showToast("Failed to add appointment", "error");
      console.error("Error adding appointment:", error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    // Convert form data to AppointmentCreatePayload
    const appointmentData: AppointmentCreatePayload = {
      ...data,
      date: new Date(data.date),
      startTime: new Date(`${data.date}T${data.startTime}`),
      endTime: new Date(`${data.date}T${data.endTime}`),
    };

    createAppointmentMutation.mutate(appointmentData);
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
            {...register("location.venueName")}
            error={errors.location?.venueName?.message}
            required
            placeholder="e.g., Client Office, Conference Center, Hotel Name"
          />

          <FormField
            label="Street Address *"
            description="Street address of the location"
            {...register("location.streetAddress")}
            error={errors.location?.streetAddress?.message}
            required
            placeholder="e.g., 123 Main Street"
          />

          <FormField
            label="City *"
            description="City name"
            {...register("location.city")}
            error={errors.location?.city?.message}
            required
            placeholder="e.g., New York"
          />

          <FormField
            label="State *"
            description="State or province"
            {...register("location.state")}
            error={errors.location?.state?.message}
            required
            placeholder="e.g., NY"
          />

          <FormField
            label="ZIP Code *"
            description="Postal code"
            {...register("location.zipCode")}
            error={errors.location?.zipCode?.message}
            required
            placeholder="e.g., 10001"
          />

          <FormField
            label="Additional Location Details"
            description="Any additional information about the location"
            {...register("location.additionalInfo")}
            error={errors.location?.additionalInfo?.message}
            placeholder="e.g., Floor number, suite number, parking instructions"
            textarea
          />
        </div>

        <FormField
          label="Course *"
          description="Select the course for the appointment"
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
          label="Date *"
          description="Select the date for the appointment"
          {...register("date")}
          error={errors.date?.message}
          type="date"
          required
        />

        <FormField
          label="Start Time *"
          description="Select the start time"
          {...register("startTime")}
          error={errors.startTime?.message}
          type="time"
          required
        />

        <FormField
          label="End Time *"
          description="Select the end time"
          {...register("endTime")}
          error={errors.endTime?.message}
          type="time"
          required
        />

        <FormField
          label="Maximum Participants *"
          description="Maximum number of participants"
          {...register("maxParticipants", { valueAsNumber: true })}
          error={errors.maxParticipants?.message}
          placeholder="e.g., 10"
          type="number"
          required
        />

        <FormField
          label="Price *"
          description="Price per participant"
          {...register("price", { valueAsNumber: true })}
          error={errors.price?.message}
          placeholder="e.g., 100"
          type="number"
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
            disabled={createAppointmentMutation.isPending}
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {createAppointmentMutation.isPending ? "Adding Appointment..." : "Add Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}
