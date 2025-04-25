"use client";
import React, { useState, useRef } from "react";
import { UserCreatePayload } from "@/app/types/user.contract";
import { InstructorCreatePayload } from "@/app/types/instructor.contract";
import { ENUMS } from "@/app/constants/enum";
import FormField from "./FormField";

export default function AddUser() {
  const [userData, setUserData] = useState<Partial<UserCreatePayload>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
    profilePicture: "",
  });

  const [instructorData, setInstructorData] = useState<{
    userId: string;
    bio: string;
    expertise: string[];
    isActive: boolean;
  }>({
    userId: "",
    bio: "",
    expertise: [],
    isActive: true,
  });

  const [newExpertise, setNewExpertise] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real implementation, you would upload the file and get the URL
      setUserData((prev) => ({
        ...prev,
        profilePicture: URL.createObjectURL(file),
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInstructorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInstructorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExpertise = () => {
    if (newExpertise.trim()) {
      setInstructorData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise.trim()],
      }));
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (index: number) => {
    setInstructorData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // if (userData.role === "instructor") {
      //   console.log("Instructor Data:", {
      //     "User Info": {
      //       "First Name": userData.firstName,
      //       "Last Name": userData.lastName,
      //       Email: userData.email,
      //     },
      //     "Instructor Info": {
      //       Bio: instructorData.bio,
      //       Expertise: instructorData.expertise,
      //       Status: instructorData.isActive ? "Active" : "Inactive",
      //     },
      //   });
      // } else {
      console.log("User Data:", {
        "First Name": userData.firstName,
        "Last Name": userData.lastName,
        Email: userData.email,
        Role: userData.role,
      });
      // }

      setSuccess(true);
      // Reset form data
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "student",
        profilePicture: "",
      });
      setInstructorData({
        userId: "",
        bio: "",
        expertise: [],
        isActive: true,
      });
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-8">Add New User</h2>

      {success && <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">User added successfully!</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Role *"
          description="Select the user's role"
          name="role"
          value={userData.role || ""}
          onChange={handleUserChange}
          select
          required
          options={ENUMS.USER_TYPES.map((role) => ({
            value: role,
            label: role.charAt(0).toUpperCase() + role.slice(1),
          }))}
        />

        <FormField
          label="First Name *"
          description="Enter the user's first name"
          placeholder="Enter first name"
          name="firstName"
          value={userData.firstName || ""}
          onChange={handleUserChange}
          required
        />

        <FormField
          label="Last Name *"
          description="Enter the user's last name"
          placeholder="Enter last name"
          name="lastName"
          value={userData.lastName || ""}
          onChange={handleUserChange}
          required
        />

        <FormField
          label="Email *"
          description="Enter the user's email address"
          placeholder="Enter email"
          name="email"
          value={userData.email || ""}
          onChange={handleUserChange}
          type="email"
          required
        />

        <FormField
          label="Password *"
          description="Enter a secure password"
          placeholder="Enter password"
          name="password"
          value={userData.password || ""}
          onChange={handleUserChange}
          type="password"
          required
        />

        <div className="flex flex-wrap gap-10 max-w-full w-[705px]">
          <div className="grow shrink-0 basis-0 w-fit">
            <label className="text-base text-neutral-900">Profile Picture</label>
            <p className="mt-1 text-sm text-gray-500">Upload a profile picture for the user</p>
          </div>
          <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-slate-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Profile preview" className="w-full h-full object-cover" />
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
                  {userData.profilePicture ? "Change Image" : "Upload Image"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* {userData.role === "instructor" && (
          <>
            <FormField
              label="Bio *"
              description="Enter a brief bio about the instructor"
              placeholder="Enter instructor bio"
              name="bio"
              value={instructorData.bio}
              onChange={(e) =>
                setInstructorData((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
              textarea
              required
            />

            <div className="flex flex-wrap gap-10 max-w-full w-[705px]">
              <div className="grow shrink-0 basis-0 w-fit">
                <label className="text-base text-neutral-900">Expertise</label>
                <p className="mt-1 text-sm text-gray-500">Add areas of expertise for the instructor</p>
              </div>
              <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      placeholder="Enter expertise"
                      className="flex-1 overflow-hidden gap-1.5 self-stretch px-4 py-3 rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px] text-black placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={handleAddExpertise}
                      className="px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {instructorData.expertise.map((expertise, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full"
                      >
                        <span>{expertise}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExpertise(index)}
                          className="text-orange-600 hover:text-orange-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-10 max-w-full w-[705px]">
              <div className="grow shrink-0 basis-0 w-fit">
                <label className="text-base text-neutral-900">Status</label>
                <p className="mt-1 text-sm text-gray-500">Set the instructor's active status</p>
              </div>
              <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={instructorData.isActive}
                    onChange={(e) =>
                      setInstructorData((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">
                    Active
                  </label>
                </div>
              </div>
            </div>
          </>
        )} */}

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}
