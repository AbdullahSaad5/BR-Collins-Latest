"use client";
import React, { useState } from "react";

const PasswordField = ({ label, value, showPassword, togglePassword }: { 
  label: string;
  value: string;
  showPassword: boolean;
  togglePassword: () => void;
}) => {
  return (
    <div className="flex flex-wrap gap-10 mt-5 max-w-full w-[705px]">
      <div className="grow shrink-0 basis-0 w-fit">
        <label className="text-base text-neutral-900 block">{label}</label>
        <p className="mt-2 text-sm text-gray-500">
          {label.includes("New") 
            ? "Choose a strong password with at least 8 characters"
            : "Enter your current password"}
        </p>
      </div>
      <div className="grow shrink-0 self-start text-base whitespace-nowrap basis-0 text-neutral-900 w-fit">
        <div className="flex overflow-hidden justify-between items-center px-4 py-3 w-full rounded-lg bg-slate-100 min-h-[44px]">
          <div className="flex flex-1 shrink gap-10 justify-between items-end self-stretch my-auto w-full basis-0 min-w-60">
            <div className="w-[87px]">
              {showPassword ? value : "**********"}
            </div>
            <button 
              type="button"
              onClick={togglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                  <line x1="2" x2="22" y1="2" y2="22"/>
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
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on active tab
    if (activeTab === 'profile') {
      console.log("Profile updated");
    } else {
      console.log("Password updated");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start my-auto max-md:max-w-full"
    >
      <h2 className="text-2xl font-semibold text-neutral-900">Settings</h2>
      <div className="flex gap-6 items-center mt-4 text-base">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`self-stretch my-auto ${activeTab === 'profile' ? 'font-semibold text-sky-500' : 'text-neutral-400'}`}
        >
          Profile
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('password')}
          className={`self-stretch my-auto ${activeTab === 'password' ? 'font-semibold text-sky-500' : 'text-neutral-400'}`}
        >
          Password
        </button>
      </div>
      <div className={`z-10 shrink-0 mt-2 bg-white border-sky-500 border-solid border-[3px] h-[3px] ${activeTab === 'profile' ? 'w-[57px]' : 'w-[87px] ml-20'}`} />
      <hr className="shrink-0 self-stretch h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

      {activeTab === 'profile' ? (
        <>
          <div className="flex flex-wrap gap-10 mt-6 max-w-full w-[705px]">
            <div className="grow shrink-0 basis-0 w-fit">
              <label htmlFor="firstName" className="text-base text-neutral-900">
                First Name *
              </label>
              <p className="mt-1 text-sm text-gray-500">
                This will be displayed on your profile.
              </p>
            </div>
            <div className="grow shrink-0 text-base whitespace-nowrap basis-0 text-neutral-900 w-fit">
              <input
                id="firstName"
                type="text"
                value="Charlotte"
                className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-sky-500 border-solid bg-slate-100 min-h-[44px]"
              />
            </div>
          </div>

          <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

          <div className="flex flex-wrap gap-10 mt-4 max-w-full w-[705px]">
            <div className="grow shrink-0 basis-0 w-fit">
              <label htmlFor="lastName" className="text-base text-neutral-900">
                Last Name *
              </label>
              <p className="mt-1 text-sm text-gray-500">
                This will be displayed on your profile.
              </p>
            </div>
            <div className="grow shrink-0 text-base whitespace-nowrap basis-0 text-neutral-900 w-fit">
              <input
                id="lastName"
                type="text"
                value="Anderson"
                className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
              />
            </div>
          </div>

          <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

          <div className="flex flex-wrap gap-5 justify-between mt-4 max-w-full w-[705px]">
            <div>
              <label htmlFor="email" className="text-base text-neutral-900">
                Email Address *
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Use an active email address.
              </p>
            </div>
            <div className="text-base whitespace-nowrap text-neutral-900">
              <input
                id="email"
                type="email"
                value="charlotte675@gmail.com"
                className="overflow-hidden gap-1.5 self-stretch px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[44px]"
              />
            </div>
          </div>

          <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

          <div className="self-stretch mt-4 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="w-[29%] max-md:ml-0 max-md:w-full">
                <div className="max-md:mt-6">
                  <label htmlFor="bio" className="text-base text-neutral-900">
                    Bio / About Me
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    Short introduction about yourself.
                  </p>
                </div>
              </div>
              <div className="ml-5 w-[71%] max-md:ml-0 max-md:w-full">
                <div className="w-full text-base leading-5 min-h-[100px] text-neutral-900 max-md:mt-6 max-md:max-w-full">
                  <textarea
                    id="bio"
                    className="overflow-hidden gap-1.5 px-4 py-3 w-full rounded-lg border border-solid bg-slate-100 border-zinc-200 min-h-[100px] max-md:max-w-full"
                  >
                    Hi, I&apos;m Charlotte Anderson, a college student currently pursuing
                    a degree in Business Administration. I&apos;m passionate about
                    leadership, communication, and developing real-world skills.
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <PasswordField 
            label="Current Password *"
            value="currentpass123"
            showPassword={showCurrentPassword}
            togglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
          />
          <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

          <PasswordField 
            label="New Password *"
            value="newpass123"
            showPassword={showNewPassword}
            togglePassword={() => setShowNewPassword(!showNewPassword)}
          />
          <hr className="shrink-0 self-stretch mt-4 h-px bg-white border border-solid border-slate-100 max-md:max-w-full" />

          <PasswordField 
            label="Re-type New Password *"
            value="newpass123"
            showPassword={showConfirmPassword}
            togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </>
      )}

      <button
        type="submit"
        className="overflow-hidden self-stretch px-5 py-3 text-base font-medium text-white bg-orange-500 min-h-[48px] rounded-full w-fit mt-6 hover:bg-orange-600 transition-colors"
      >
        {activeTab === 'profile' ? 'Update info' : 'Update password'}
      </button>
    </form>
  );
};

export default SettingsForm;