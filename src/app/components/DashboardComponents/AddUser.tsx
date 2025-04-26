"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserCreatePayload } from "@/app/types/user.contract";
import { ENUMS } from "@/app/constants/enum";
import FormField from "./FormField";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import { getRefreshToken } from "@/app/store/features/users/userSlice";
import { useAppSelector } from "@/app/store/hooks";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(ENUMS.USER_TYPES as unknown as [string, string, string]),
  profilePicture: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

export default function AddUser() {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const refreshToken = useAppSelector(getRefreshToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "student",
      profilePicture: "",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: UserFormData) => {
      const response = await api.post("/users", data, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      showToast("User created successfully", "success");
      reset();
      setPreviewImage(null);
    },
    onError: (error) => {
      showToast("Failed to create user", "error");
      console.error("Error creating user:", error);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real implementation, you would upload the file and get the URL
      setValue("profilePicture", URL.createObjectURL(file));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    createUserMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-8">Add New User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormField
          label="Role *"
          description="Select the user's role"
          {...register("role")}
          error={errors.role?.message}
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
          {...register("firstName")}
          error={errors.firstName?.message}
          required
        />

        <FormField
          label="Last Name *"
          description="Enter the user's last name"
          placeholder="Enter last name"
          {...register("lastName")}
          error={errors.lastName?.message}
          required
        />

        <FormField
          label="Email *"
          description="Enter the user's email address"
          placeholder="Enter email"
          {...register("email")}
          error={errors.email?.message}
          type="email"
          required
        />

        <FormField
          label="Password *"
          description="Enter a secure password"
          placeholder="Enter password"
          {...register("password")}
          error={errors.password?.message}
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
                  {watch("profilePicture") ? "Change Image" : "Upload Image"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={createUserMutation.isPending}
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {createUserMutation.isPending ? "Submitting..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}
