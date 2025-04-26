"use client";
import React, { useState } from "react";
import FormField from "./FormField";

const PasswordField = ({
  label,
  description,
  value,
  showPassword,
  togglePassword,
}: {
  label: string;
  description: string;
  value: string;
  showPassword: boolean;
  togglePassword: () => void;
}) => {
  return (
    <div className="flex flex-wrap gap-10 max-w-full w-[705px]">
      <div className="grow shrink-0 basis-0 w-fit">
        <label className="text-base text-neutral-900">{label}</label>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="grow shrink-0 text-base text-gray-400 basis-0 w-fit">
        <div className="flex overflow-hidden justify-between items-center px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]">
          <div className="flex flex-1 shrink gap-10 justify-between items-end self-stretch my-auto w-full basis-0 min-w-60">
            <input
              type={showPassword ? "text" : "password"}
              value={value}
              readOnly
              className="w-full bg-transparent border-none outline-none"
            />
            <button
              type="button"
              onClick={togglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsForm = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on active tab
    if (activeTab === "profile") {
      console.log("Profile updated");
    } else {
      console.log("Password updated");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-8">Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-6 items-center mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`text-base ${activeTab === "profile" ? "font-semibold text-sky-500" : "text-neutral-400"}`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("password")}
            className={`text-base ${activeTab === "password" ? "font-semibold text-sky-500" : "text-neutral-400"}`}
          >
            Password
          </button>
        </div>

        {activeTab === "profile" ? (
          <>
            <FormField
              label="First Name *"
              description="This will be displayed on your profile"
              placeholder="Enter first name"
              name="firstName"
              value="Charlotte"
              onChange={() => {}}
              required
            />

            <FormField
              label="Last Name *"
              description="This will be displayed on your profile"
              placeholder="Enter last name"
              name="lastName"
              value="Anderson"
              onChange={() => {}}
              required
            />

            <FormField
              label="Email Address *"
              description="Use an active email address"
              placeholder="Enter email"
              name="email"
              value="charlotte675@gmail.com"
              onChange={() => {}}
              type="email"
              required
            />

            <FormField
              label="Bio / About Me"
              description="Short introduction about yourself"
              placeholder="Enter your bio"
              name="bio"
              value="Hi, I'm Charlotte Anderson, a college student currently pursuing a degree in Business Administration. I'm passionate about leadership, communication, and developing real-world skills."
              onChange={() => {}}
              textarea
            />
          </>
        ) : (
          <>
            <PasswordField
              label="Current Password *"
              description="Enter your current password"
              value="currentpass123"
              showPassword={showCurrentPassword}
              togglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
            />

            <PasswordField
              label="New Password *"
              description="Choose a strong password with at least 8 characters"
              value="newpass123"
              showPassword={showNewPassword}
              togglePassword={() => setShowNewPassword(!showNewPassword)}
            />

            <PasswordField
              label="Re-type New Password *"
              description="Confirm your new password"
              value="newpass123"
              showPassword={showConfirmPassword}
              togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </>
        )}

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            {activeTab === "profile" ? "Update Profile" : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
