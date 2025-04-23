"use client";
import React from "react";
import { AddUserIcon, ViewIcon, ArrowLeftIcon, ArrowRightIcon } from "./Icons";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const UserTable: React.FC = () => {
  const users: User[] = [
    { id: 1, name: "Harper White", email: "harper231@gmail.com", role: "Manager", status: "Active" },
    { id: 2, name: "Elijah Brown", email: "brown455@gmail.com", role: "Admin Support", status: "Active" },
    { id: 3, name: "Sophia Wilson", email: "wilson568@gmail.com", role: "Manager", status: "Active" },
    { id: 4, name: "Benjamin Taylor", email: "taylor999@gmail.com", role: "Admin Support", status: "Active" },
    { id: 5, name: "Mia Robinson", email: "mia444@gmail.com", role: "Manager", status: "Active" },
    { id: 6, name: "Alexander Hall", email: "alexander000@gmail.com", role: "Admin Support", status: "Active" },
    { id: 7, name: "Lucas Harris", email: "lucasharris31@gmail.com", role: "Manager", status: "Active" },
  ];

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">
          View Users
        </h1>
        <button className="flex gap-2 items-center text-base font-medium text-orange-500 hover:text-orange-600 transition-colors">
          <AddUserIcon className="w-5 h-5" />
          <span>Add New User</span>
        </button>
      </div>
      
      <div className="w-full border-collapse">
        {/* Table Header */}
        <div className="flex items-center p-3 rounded-lg bg-slate-100">
          <div className="flex-1 text-base font-medium text-left text-neutral-900">
            Name
          </div>
          <div className="flex-1 text-base font-medium text-left text-neutral-900">
            Email Address
          </div>
          <div className="flex-1 text-base font-medium text-left text-neutral-900">
            Role
          </div>
          <div className="flex-1 text-base font-medium text-left text-neutral-900">
            Status
          </div>
          <div className="flex-1 text-base font-medium text-left text-neutral-900">
            Action
          </div>
        </div>

        {/* Table Rows */}
        {users.map((user) => (
          <div key={user.id} className="flex items-center p-3 border-b border-solid border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex-1 text-base text-left text-neutral-900">
              {user.name}
            </div>
            <div className="flex-1 text-base text-left text-neutral-900">
              {user.email}
            </div>
            <div className="flex-1 text-base text-left text-neutral-900">
              {user.role}
            </div>
            <div className="flex-1">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 bg-emerald-50 rounded-full">
                {user.status}
              </span>
            </div>
            <div className="flex-1 text-base text-left text-neutral-900">
              <button 
                aria-label="View user details"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ViewIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 px-2">
        <div className="text-sm text-gray-500">
          Page 1 of 7
        </div>
        <div className="flex gap-4 items-center">
          <button 
            aria-label="Previous page"
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button 
            aria-label="Next page"
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserTable;