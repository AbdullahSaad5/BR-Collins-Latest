"use client";
import React, { useState } from "react";
// import TopBanner from "../components/TopBanner copy";
// import Header from "../components/Header copy";
import Breadcrumb from "../components/dashboradComp/Breadcrumb";
import ProfileSummary from "../components/dashboradComp/ProfileSummary";
import Sidebar from "../components/dashboradComp/Sidebar";
import DashboardStats from "../components/dashboradComp/DashboardStats";
import MyProfile from "../components/dashboradComp/MyProfile";
import EnrolledCourses from "../components/dashboradComp/EnrolledCourses";
// import Footer from "../components/dashboradComp/Footer";
import AddUser from "../components/dashboradComp/AddUser";
import ViewUser from "../components/dashboradComp/ViewUser";
import Setting from "../components/dashboradComp/Setting";
import CourseHistory from "../components/dashboradComp/CourseHistory";
import AddCourses from "../components/dashboradComp/AddCourseStepper";
import AddInstructor from "../components/dashboradComp/AddInstructor";
import AddCourseCategory from "../components/dashboradComp/AddCourseCategory";
import ViewCourseCategories from "../components/dashboradComp/ViewCourseCategories";
import ViewCourses from "../components/dashboradComp/ViewCourses";
import AddCourseContent from "../components/dashboradComp/AddCourseContent";
import ViewCourseContent from "../components/dashboradComp/ViewCourseContent";

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardStats />;
      case "profile":
        return <MyProfile />;
      case "addCourseCategory":
        return <AddCourseCategory />;
      case "viewCourseCategory":
        return <ViewCourseCategories />;
      case "courses":
        return <EnrolledCourses />;
      case "addUser":
        return <AddUser />;
      case "addCourse":
        return <AddCourses />;
      case "viewCourses":
        return <ViewCourses />;
      case "viewUsers":
        return <ViewUser />;
      case "history":
        return <CourseHistory />;
      case "settings":
        return <Setting />;
      case "addInstructor":
        return <AddInstructor />;
      case "addCourseContent":
        return <AddCourseContent />;
      case "viewCourseContent":
        return <ViewCourseContent />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <main className="flex flex-col bg-neutral-100 min-h-screen">
      {/* <TopBanner /> */}
      {/* <Header /> */}

      <section className="flex flex-col self-center mt-5 w-full max-w-[1326px] max-md:max-w-full">
        <Breadcrumb />

        <article className="flex flex-col pt-6 mt-6 w-full bg-white rounded-3xl max-md:mt-4 max-md:max-w-full">
          <ProfileSummary />

          <div className="flex flex-col md:flex-row gap-6 p-6">
            <div className={`shrink-0 transition-all duration-300 ${sidebarCollapsed ? "w-20" : "w-64"}`}>
              <Sidebar activeItem={activeItem} onItemClick={handleItemClick} onToggle={handleSidebarToggle} />
            </div>

            {/* <div className="hidden md:block w-px bg-slate-200" /> */}

            <div
              className={`flex-1 overflow-auto transition-all duration-300 ${
                sidebarCollapsed ? " md:w-[calc(100%-20px+44px)]" : "md:w-[calc(100%-256px)]"
              }`}
            >
              {renderContent()}
            </div>
          </div>
        </article>
      </section>

      {/* <Footer /> */}
    </main>
  );
}
