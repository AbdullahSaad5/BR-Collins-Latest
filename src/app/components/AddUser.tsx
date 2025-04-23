"use client";
import React from "react";

function AddUserForm() {
  return (
    <form className="flex flex-col items-start my-auto max-md:max-w-full">
      <h2 className="text-2xl font-semibold text-neutral-900">Add New User</h2>

      <FormField
        label="First Name *"
        description="Enter the student's full legal name."
        placeholder="First name"
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Last Name *"
        description="Enter the student's full legal name."
        placeholder="Last name"
      />

      <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      <FormField
        label="Email Address *"
        description="Provide a valid email address. This will be used for login, communication, and course updates."
        placeholder="Email address"
      />

      <button
        type="submit"
        className="overflow-hidden self-stretch px-5 py-3 text-base font-medium text-white bg-orange-500 min-h-[48px] rounded-full w-fit mt-6 hover:bg-orange-600 transition-colors"
      >
        Add User
      </button>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  description: string;
  placeholder: string;
}

function FormField({ label, description, placeholder }: FormFieldProps) {
  return (
    <div className="flex flex-wrap gap-10 mt-6 max-w-full w-[705px]">
      <div className="grow shrink-0 basis-0 w-fit">
        <label className="text-base text-neutral-900">{label}</label>
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>
      <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
        <input
          type="text"
          placeholder={placeholder}
          className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
        />
      </div>
    </div>
  );
}

export default AddUserForm;