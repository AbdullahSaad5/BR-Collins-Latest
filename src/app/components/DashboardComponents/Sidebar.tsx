"use client";
import { logout } from "@/app/store/features/users/userSlice";
import { useAppDispatch } from "@/app/store/hooks";
import {
  BookOpen,
  BookOpenCheck,
  BookPlus,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CreditCard,
  Eye,
  FilePlus,
  FileText,
  FolderOpen,
  FolderPlus,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
  const [appointmentsExpanded, setAppointmentsExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleSidebar = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggle(newCollapsed);
    setUsersExpanded(false);
    setCoursesExpanded(false);
    setAppointmentsExpanded(false);
  };

  const handleItemClick = (item: string) => {
    if (item === "logout") {
      dispatch(logout());
      router.push("/login");
    } else {
      onItemClick(item);
      router.push(`/dashboard?item=${item}`);
    }
  };

  const handleToggle = (item: string) => {
    if (item === "users") {
      toggleUsersSection();
    } else if (item === "courses") {
      toggleCoursesSection();
    } else if (item === "appointments") {
      toggleAppointmentsSection();
    }
  };

  const toggleUsersSection = () => {
    setUsersExpanded(!usersExpanded);
  };

  const toggleCoursesSection = () => {
    setCoursesExpanded(!coursesExpanded);
  };

  const toggleAppointmentsSection = () => {
    setAppointmentsExpanded(!appointmentsExpanded);
  };

  const sidebarData = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      isActive: activeItem === "dashboard",
      onClick: () => handleItemClick("dashboard"),
    },
    {
      icon: UserCog,
      label: "Manage Users",
      isActive: activeItem === "viewUsers" || activeItem === "addUser",
      onClick: () => handleItemClick("viewUsers"),
      isExpanded: usersExpanded,
      handleToggle: () => handleToggle("users"),
      children: [
        {
          icon: UserPlus,
          label: "Add New User",
          isActive: activeItem === "addUser",
          onClick: () => handleItemClick("addUser"),
        },
        {
          icon: Users,
          label: "View All Users",
          isActive: activeItem === "viewUsers",
          onClick: () => handleItemClick("viewUsers"),
        },
      ],
    },
    {
      icon: BookOpenCheck,
      label: "Manage Courses",
      isActive:
        activeItem === "addCourseCategory" ||
        activeItem === "viewCourseCategory" ||
        activeItem === "addCourse" ||
        activeItem === "viewCourses" ||
        activeItem === "addCourseContent" ||
        activeItem === "viewCourseContent",
      onClick: () => handleItemClick("viewCourses"),
      isExpanded: coursesExpanded,
      handleToggle: () => handleToggle("courses"),
      children: [
        {
          icon: FolderPlus,
          label: "Add Course Category",
          isActive: activeItem === "addCourseCategory",
          onClick: () => handleItemClick("addCourseCategory"),
        },
        {
          icon: FolderOpen,
          label: "View Course Categories",
          isActive: activeItem === "viewCourseCategory",
          onClick: () => handleItemClick("viewCourseCategory"),
        },
        {
          icon: BookPlus,
          label: "Add Course",
          isActive: activeItem === "addCourse",
          onClick: () => handleItemClick("addCourse"),
        },
        {
          icon: BookOpen,
          label: "View Courses",
          isActive: activeItem === "viewCourses",
          onClick: () => handleItemClick("viewCourses"),
        },
        {
          icon: FilePlus,
          label: "Add Course Content",
          isActive: activeItem === "addCourseContent",
          onClick: () => handleItemClick("addCourseContent"),
        },
        {
          icon: FileText,
          label: "View Course Content",
          isActive: activeItem === "viewCourseContent",
          onClick: () => handleItemClick("viewCourseContent"),
        },
      ],
    },
    {
      icon: Calendar,
      label: "Appointments",
      isActive: activeItem === "appointments" || activeItem === "addAppointment",
      onClick: () => handleItemClick("appointments"),
      isExpanded: appointmentsExpanded,
      handleToggle: () => handleToggle("appointments"),
      children: [
        {
          icon: Plus,
          label: "Add Appointment",
          isActive: activeItem === "addAppointment",
          onClick: () => handleItemClick("addAppointment"),
        },
        {
          icon: Eye,
          label: "View Appointments",
          isActive: activeItem === "appointments",
          onClick: () => handleItemClick("appointments"),
        },
      ],
    },
    {
      icon: BookOpen,
      label: "Subscribed Courses",
      isActive: activeItem === "courses",
      onClick: () => handleItemClick("courses"),
    },
    {
      icon: CreditCard,
      label: "Transactions",
      isActive: activeItem === "transactions",
      onClick: () => handleItemClick("transactions"),
    },
    {
      icon: Settings,
      label: "My Profile",
      isActive: activeItem === "profile",
      onClick: () => handleItemClick("profile"),
    },
    {
      icon: LogOut,
      label: "Logout",
      isLogout: true,
      onClick: () => handleItemClick("logout"),
      hasDividerOnTop: true,
    },
  ];

  return (
    <nav
      className={`relative flex flex-col p-4 h-full bg-white rounded-xl shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-68"
      }`}
    >
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
        {sidebarData.map((item, index) => {
          if (item.children) {
            const isExpanded = item.isExpanded;
            const toggleSection = item.handleToggle;

            return (
              <div key={index} className="w-full">
                <div
                  className={`flex items-center w-full cursor-pointer group ${
                    item.isActive ? "bg-gray-50 rounded-lg" : ""
                  }`}
                  onClick={() => {
                    if (collapsed) {
                      item.onClick();
                      toggleSidebar();
                    } else {
                      toggleSection();
                    }
                  }}
                >
                  <div className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700">
                    <item.icon className="text-gray-500 w-5 h-5" />
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                    {!collapsed && (
                      <button className="ml-auto p-2 group-hover:bg-gray-100 rounded-lg transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {isExpanded && !collapsed && (
                  <div className="pl-4 mt-1">
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      <div className="space-y-0.5 ml-0.5">
                        {item.children.map((child, childIndex) => (
                          <SidebarItem
                            key={childIndex}
                            icon={child.icon}
                            label={child.label}
                            isActive={child.isActive}
                            onClick={child.onClick}
                            collapsed={collapsed}
                            className="pl-3 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <React.Fragment key={index}>
              {item.hasDividerOnTop && <div className="mt-6 w-full border-t border-slate-200 pt-2" />}
              <SidebarItem
                icon={item.icon}
                label={item.label}
                isActive={item.isActive}
                onClick={item.onClick}
                collapsed={collapsed}
                isLogout={item.isLogout}
              />
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
