/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  User,
  UserPlus,
  Users,
  BookOpen,
  History,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  UserCog,
  BookOpenCheck,
  FolderPlus,
  FolderOpen,
  FilePlus,
  FileText,
  BookPlus,
  CreditCard,
  Calendar,
  Eye,
  Plus,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  onToggle: (collapsed: boolean) => void;
}

export default function Sidebar({ activeItem, onItemClick, onToggle }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [usersExpanded, setUsersExpanded] = useState(false);
  const [coursesExpanded, setCoursesExpanded] = useState(false);
  const [transactionsExpanded, setTransactionsExpanded] = useState(false);
  const [appointmentsExpanded, setAppointmentsExpanded] = useState(false);

  const toggleSidebar = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggle(newCollapsed);
  };

  const toggleUsersSection = () => {
    setUsersExpanded(!usersExpanded);
  };

  const toggleCoursesSection = () => {
    setCoursesExpanded(!coursesExpanded);
  };

  const toggleTransactionsSection = () => {
    setTransactionsExpanded(!transactionsExpanded);
  };

  const toggleAppointmentsSection = () => {
    setAppointmentsExpanded(!appointmentsExpanded);
  };

  return (
    <nav
      className={`relative flex flex-col p-4 h-full bg-white rounded-xl shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-68"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute -right-3 top-6 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-100 transition-colors ${
          collapsed ? "rotate-180" : ""
        }`}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      <div className="flex flex-col items-start w-full overflow-hidden">
        <SidebarItem
          icon={LayoutDashboard}
          label="Dashboard"
          isActive={activeItem === "dashboard"}
          onClick={() => onItemClick("dashboard")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={User}
          label="My Profile"
          isActive={activeItem === "profile"}
          onClick={() => onItemClick("profile")}
          collapsed={collapsed}
        />

        {/* Users Section */}
        <div className="w-full">
          <div
            className={`flex items-center w-full cursor-pointer group ${
              activeItem === "viewUsers" || activeItem === "addUser" ? "bg-gray-50 rounded-lg" : ""
            }`}
            onClick={toggleUsersSection}
          >
            <div className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700">
              <UserCog className="text-gray-500 w-5 h-5" />
              {!collapsed && <span className="ml-3">Manage Users</span>}
              {!collapsed && (
                <button className="ml-auto p-2 group-hover:bg-gray-100 rounded-lg transition-colors">
                  {usersExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              )}
            </div>
          </div>
          {usersExpanded && !collapsed && (
            <div className="pl-6 mt-1">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-0.5">
                  <SidebarItem
                    icon={UserPlus}
                    label="Add New User"
                    isActive={activeItem === "addUser"}
                    onClick={() => onItemClick("addUser")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                  <SidebarItem
                    icon={Users}
                    label="View All Users"
                    isActive={activeItem === "viewUsers"}
                    onClick={() => onItemClick("viewUsers")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Courses Section */}

        <div className="w-full">
          <div
            className={`flex items-center w-full cursor-pointer group ${
              activeItem === "addCourseCategory" ||
              activeItem === "viewCourseCategory" ||
              activeItem === "addCourse" ||
              activeItem === "viewCourses" ||
              activeItem === "addCourseContent" ||
              activeItem === "viewCourseContent"
                ? "bg-gray-50 rounded-lg"
                : ""
            }`}
            onClick={toggleCoursesSection}
          >
            <div className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700">
              <BookOpenCheck className="text-gray-500 w-5 h-5" />
              {!collapsed && <span className="ml-3">Manage Courses</span>}
              {!collapsed && (
                <button className="ml-auto p-2 group-hover:bg-gray-100 rounded-lg transition-colors">
                  {coursesExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              )}
            </div>
          </div>
          {coursesExpanded && !collapsed && (
            <div className="pl-6 mt-1">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-0.5">
                  <SidebarItem
                    icon={FolderPlus}
                    label="Add Course Category"
                    isActive={activeItem === "addCourseCategory"}
                    onClick={() => onItemClick("addCourseCategory")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                  <SidebarItem
                    icon={FolderOpen}
                    label="View Course Categories"
                    isActive={activeItem === "viewCourseCategory"}
                    onClick={() => onItemClick("viewCourseCategory")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                  <SidebarItem
                    icon={BookPlus}
                    label="Add Course"
                    isActive={activeItem === "addCourse"}
                    onClick={() => onItemClick("addCourse")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                  <SidebarItem
                    icon={BookOpen}
                    label="View Courses"
                    isActive={activeItem === "viewCourses"}
                    onClick={() => onItemClick("viewCourses")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                  <SidebarItem
                    icon={FilePlus}
                    label="Add Course Content"
                    isActive={activeItem === "addCourseContent"}
                    onClick={() => onItemClick("addCourseContent")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                  <SidebarItem
                    icon={FileText}
                    label="View Course Content"
                    isActive={activeItem === "viewCourseContent"}
                    onClick={() => onItemClick("viewCourseContent")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Appointments Section */}
        <div className="w-full">
          <div
            className={`flex items-center w-full cursor-pointer group ${
              activeItem === "appointments" || activeItem === "addAppointment" ? "bg-gray-50 rounded-lg" : ""
            }`}
            onClick={toggleAppointmentsSection}
          >
            <div className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700">
              <Calendar className="text-gray-500 w-5 h-5" />
              {!collapsed && <span className="ml-3">Appointments</span>}
              {!collapsed && (
                <button className="ml-auto p-2 group-hover:bg-gray-100 rounded-lg transition-colors">
                  {appointmentsExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              )}
            </div>
          </div>
          {appointmentsExpanded && !collapsed && (
            <div className="pl-6 mt-1">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-0.5">
                  <SidebarItem
                    icon={Plus}
                    label="Add Appointment"
                    isActive={activeItem === "addAppointment"}
                    onClick={() => onItemClick("addAppointment")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                  <SidebarItem
                    icon={Eye}
                    label="View Appointments"
                    isActive={activeItem === "appointments"}
                    onClick={() => onItemClick("appointments")}
                    collapsed={collapsed}
                    className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <SidebarItem
          icon={BookOpen}
          label="Subscribed Courses"
          isActive={activeItem === "courses"}
          onClick={() => onItemClick("courses")}
          collapsed={collapsed}
        />
        {/* Transactions Section */}
        <SidebarItem
          icon={CreditCard}
          label="Transactions"
          isActive={activeItem === "transactions"}
          onClick={() => onItemClick("transactions")}
          collapsed={collapsed}
        />

        {/* <SidebarItem
          icon={History}
          label="Course History"
          isActive={activeItem === "history"}
          onClick={() => onItemClick("history")}
          collapsed={collapsed}
        /> */}
        <SidebarItem
          icon={Settings}
          label="Settings"
          isActive={activeItem === "settings"}
          onClick={() => onItemClick("settings")}
          collapsed={collapsed}
        />

        <div className={`mt-6 w-full border-t border-slate-200 pt-2 ${collapsed ? "" : ""}`}>
          <SidebarItem
            icon={LogOut}
            label="Logout"
            isLogout
            onClick={() => onItemClick("logout")}
            collapsed={collapsed}
          />
        </div>
      </div>
    </nav>
  );
}
