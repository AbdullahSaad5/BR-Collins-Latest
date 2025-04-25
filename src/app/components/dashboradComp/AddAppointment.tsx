"use client";
import React, { useState } from "react";

interface Appointment {
  venueName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  locationDetails: string;
  instructor: string;
  course: string;
  date: string;
  time: string;
  meetingType: string;
  notes: string;
}

export default function AddAppointment() {
  const [appointmentData, setAppointmentData] = useState<Appointment>({
    venueName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    locationDetails: "",
    instructor: "",
    course: "",
    date: "",
    time: "",
    meetingType: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
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
      console.log("Appointment submitted:", appointmentData);
      setSuccess(true);
      // Reset form after successful submission
      setAppointmentData({
        venueName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        locationDetails: "",
        instructor: "",
        course: "",
        date: "",
        time: "",
        meetingType: "",
        notes: "",
      });
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-neutral-900">Location Information</h3>

          <FormField
            label="Venue Name *"
            description="Name of the meeting venue or location"
            name="venueName"
            value={appointmentData.venueName}
            onChange={handleChange}
            required
            placeholder="e.g., Client Office, Conference Center, Hotel Name"
          />

          <FormField
            label="Street Address *"
            description="Street address of the location"
            name="address"
            value={appointmentData.address}
            onChange={handleChange}
            required
            placeholder="e.g., 123 Main Street"
          />

          <FormField
            label="City *"
            description="City name"
            name="city"
            value={appointmentData.city}
            onChange={handleChange}
            required
            placeholder="e.g., New York"
          />

          <FormField
            label="State *"
            description="State or province"
            name="state"
            value={appointmentData.state}
            onChange={handleChange}
            required
            placeholder="e.g., NY"
          />

          <FormField
            label="ZIP Code *"
            description="Postal code"
            name="zipCode"
            value={appointmentData.zipCode}
            onChange={handleChange}
            required
            placeholder="e.g., 10001"
          />

          <FormField
            label="Additional Location Details"
            description="Any additional information about the location"
            name="locationDetails"
            value={appointmentData.locationDetails}
            onChange={handleChange}
            placeholder="e.g., Floor number, suite number, parking instructions, or specific directions"
            textarea
          />
        </div>

        <FormField
          label="Instructor *"
          description="Select the instructor for the appointment"
          name="instructor"
          value={appointmentData.instructor}
          onChange={handleChange}
          select
          required
          options={[
            { value: "", label: "Select an instructor" },
            { value: "1", label: "Sarah Wilson" },
            { value: "2", label: "Mike Johnson" },
            { value: "3", label: "Emily Brown" },
          ]}
        />

        <FormField
          label="Course *"
          description="Select the course for the appointment"
          name="course"
          value={appointmentData.course}
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
          label="Date *"
          description="Select the date for the appointment"
          name="date"
          value={appointmentData.date}
          onChange={handleChange}
          type="date"
          required
        />

        <FormField
          label="Time *"
          description="Select the time for the appointment"
          name="time"
          value={appointmentData.time}
          onChange={handleChange}
          type="time"
          required
        />

        {/* <FormField
          label="Meeting Type *"
          description="Select the type of meeting"
          name="meetingType"
          value={appointmentData.meetingType}
          onChange={handleChange}
          select
          required
          options={[
            { value: "", label: "Select meeting type" },
            { value: "one-on-one", label: "One-on-One" },
            { value: "group", label: "Group Session" },
          ]}
        /> */}

        <FormField
          label="Notes"
          description="Add any additional notes for the appointment"
          placeholder="Enter notes..."
          name="notes"
          value={appointmentData.notes}
          onChange={handleChange}
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
