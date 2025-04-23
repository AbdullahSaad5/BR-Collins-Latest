"use client";
import * as React from "react";
// import TopBanner from "../components/TopBanner copy";
// import Header from "../components/Header copy";
import Breadcrumb from "../components/Breadcrumb";
import ProfileSummary from "../components/ProfileSummary";
import Sidebar from "../components/Sidebar";
import DashboardStats from "../components/DashboardStats";
import MyProfile from "../components/MyProfile";
import EnrolledCourses from "../components/EnrolledCourses";
// import Footer from "../components/Footer";
import AddUser from "../components/AddUser";
import ViewUser from "../components/ViewUser";
import Setting from "../components/Setting";
import CourseHistory from "../components/CourseHistory";
import AddCourses from "../components/AddCourses";

function StudentDashboard() {
  const [activeItem, setActiveItem] = React.useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const renderComponent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardStats />;
      case "profile":
        return <MyProfile />;
      case "courses":
        return <EnrolledCourses />;
      case "addUser":
        return <AddUser />;
      case "addcourses":
        return <AddCourses />;
      case "viewUsers":
        return <ViewUser />;
      case "history":
        return <CourseHistory />;
      case "settings":
        return <Setting />;
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
              <Sidebar activeItem={activeItem} onItemClick={setActiveItem} onToggle={handleSidebarToggle} />
            </div>

            {/* <div className="hidden md:block w-px bg-slate-200" /> */}

            <div
              className={`flex-1 overflow-auto transition-all duration-300 ${
                sidebarCollapsed ? " md:w-[calc(100%-20px+44px)]" : "md:w-[calc(100%-256px)]"
              }`}
            >
              {renderComponent()}
            </div>
          </div>
        </article>
      </section>

      {/* <Footer /> */}
    </main>
  );
}

export default StudentDashboard;
