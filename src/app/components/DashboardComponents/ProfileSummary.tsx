import React from "react";
import { BookOpen, BadgeCheck, UserPlus, Settings, Crown } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/app/store/hooks";
import { getSubscription, selectUser } from "@/app/store/features/users/userSlice";
import { IUser } from "@/app/types/user.contract";
import { ISubscription } from "@/app/types/subscription.contract";

const ProfileSummary = ({ onItemClick }: { onItemClick: (item: string) => void }) => {
  const user = useAppSelector(selectUser) as IUser;
  const subscription = useAppSelector(getSubscription) as ISubscription | null;
  const toTitleCase = (str?: string) => {
    return str?.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <section className="flex flex-col sm:flex-row gap-5 justify-between items-center p-4 sm:p-6 bg-white rounded-xl shadow-sm w-full mx-auto">
      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto">
        {/* Avatar */}
        <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden border-2 border-white shadow-md">
          <Image
            src={user.profilePicture || "/assets/default-avatar.jpg"}
            width={112}
            height={112}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{`${user.firstName} ${user.lastName}`}</h1>
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-center sm:justify-start">
            <p className="text-sm text-gray-500">{toTitleCase(user.role)}</p>
            {subscription && subscription.isActive && (
              <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-2.5 py-1 rounded-full shadow-sm">
                <Crown className="w-3 h-3" />
                <span className="font-medium">
                  {subscription.entityType === "user" ? "Individual" : "Organization"} Plan
                </span>
                <span className="text-indigo-100">•</span>
                <span className="text-indigo-100">
                  {subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : "Active"}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-5 mt-3">
            <div className="flex items-center gap-1.5 text-sm">
              <BookOpen className="text-blue-500 w-4 h-4" />
              <span className="text-gray-700">
                <span className="font-medium text-blue-500">(5)</span> Courses
              </span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-gray-200 my-auto" />

            <div className="flex items-center gap-1.5 text-sm">
              <BadgeCheck className="text-blue-500 w-4 h-4" />
              <span className="text-gray-700">
                <span className="font-medium text-blue-500">(4)</span> Certificates
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onItemClick("profile")}
        className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-orange-500 hover:text-orange-600 border border-orange-500 hover:border-orange-600 rounded-full transition-all duration-200 hover:shadow-md whitespace-nowrap w-full sm:w-auto justify-center"
      >
        <Settings className="w-4 h-4" />
        <span>My Profile</span>
      </button>
    </section>
  );
};

export default ProfileSummary;
