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
} from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  onToggle?: (collapsed: boolean) => void; // Add this prop
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick, onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggle && onToggle(newCollapsed); // Notify parent component
  };

  return (
    <nav
      className={`relative flex flex-col p-4 h-full bg-white rounded-xl shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
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
        <SidebarItem
          icon={BookOpen}
          label="Enrolled Courses"
          isActive={activeItem === "courses"}
          onClick={() => onItemClick("courses")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={BookOpen}
          label="Add Courses"
          isActive={activeItem === "addcourses"}
          onClick={() => onItemClick("addcourses")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={UserPlus}
          label="Add New User"
          isActive={activeItem === "addUser"}
          onClick={() => onItemClick("addUser")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={Users}
          label="View Users"
          isActive={activeItem === "viewUsers"}
          onClick={() => onItemClick("viewUsers")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={History}
          label="Course History"
          isActive={activeItem === "history"}
          onClick={() => onItemClick("history")}
          collapsed={collapsed}
        />
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
};

export default Sidebar;