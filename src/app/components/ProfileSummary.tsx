import React from "react";
import { FaBook, FaCertificate, FaUserPlus } from "react-icons/fa";
import Image from "next/image";

const ProfileSummary = () => {
  return (
    <section className="flex flex-col sm:flex-row gap-5 justify-between items-center p-4 sm:p-6 bg-white rounded-xl shadow-sm w-full max-w-6xl mx-auto">
      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto">
        {/* Avatar */}
        <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden border-2 border-white shadow-md">
          <Image
            src="/assets/profile.jpg"
            width={112}
            height={112}
            alt="Profile Picture"
            className="w-full h-full object-cover"
            
          />
        </div>
        
        {/* Details */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Charlotte Anderson</h1>
          <p className="text-sm text-gray-500 mt-1">UX Designer & Developer</p>
          
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-5 mt-3">
            <div className="flex items-center gap-1.5 text-sm">
              <FaBook className="text-blue-500 w-4 h-4" />
              <span className="text-gray-700">
                <span className="font-medium text-blue-500">(5)</span> Courses
              </span>
            </div>
            
            <div className="hidden sm:block w-px h-4 bg-gray-200 my-auto" />
            
            <div className="flex items-center gap-1.5 text-sm">
              <FaCertificate className="text-blue-500 w-4 h-4" />
              <span className="text-gray-700">
                <span className="font-medium text-blue-500">(4)</span> Certificates
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <button className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-orange-500 hover:text-orange-600 border border-orange-500 hover:border-orange-600 rounded-full transition-all duration-200 hover:shadow-md whitespace-nowrap w-full sm:w-auto justify-center">
        <FaUserPlus className="w-4 h-4" />
        <span>Add New User</span>
      </button>
    </section>
  );
};

export default ProfileSummary;