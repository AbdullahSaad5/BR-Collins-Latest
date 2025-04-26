"use client";
import React, { useState, useRef, useEffect } from "react";
import { ViewIcon, ArrowLeftIcon, ArrowRightIcon, CalendarIcon, TableIcon } from "./Icons";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CustomDataTable from "./CustomDataTable";
import ActionIcons from "@/components/ActionIcons";

interface Appointment {
  id: number;
  student: string;
  instructor: string;
  course: string;
  date: string;
  time: string;
  status: string;
  meetingType: string;
}

const Appointments = () => {
  const [view, setView] = useState<"table" | "calendar">("table");
  const [isScrollable, setIsScrollable] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      student: "John Doe",
      instructor: "Sarah Wilson",
      course: "Introduction to React",
      date: "2024-03-20",
      time: "10:00 AM",
      status: "Scheduled",
      meetingType: "One-on-One",
    },
    {
      id: 2,
      student: "Jane Smith",
      instructor: "Mike Johnson",
      course: "Advanced JavaScript",
      date: "2024-03-21",
      time: "02:30 PM",
      status: "Completed",
      meetingType: "Group Session",
    },
    {
      id: 3,
      student: "Mike Johnson",
      instructor: "Sarah Wilson",
      course: "UI/UX Design Principles",
      date: "2024-03-22",
      time: "11:00 AM",
      status: "Cancelled",
      meetingType: "One-on-One",
    },
  ]);

  useEffect(() => {
    const checkScrollable = () => {
      if (tableContainerRef.current) {
        const { scrollWidth, clientWidth } = tableContainerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [appointments]);

  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id.toString(),
    title: `${appointment.student} - ${appointment.course}`,
    start: `${appointment.date}T${appointment.time}`,
    extendedProps: {
      instructor: appointment.instructor,
      status: appointment.status,
      meetingType: appointment.meetingType,
    },
  }));

  const handleEventClick = (info: any) => {
    // Handle event click - you can show a modal or navigate to details
    console.log("Event clicked:", info.event);
  };

  const handleViewAppointment = (appointment: Appointment) => {
    console.log("View appointment:", appointment);
    // TODO: Implement view appointment functionality
  };

  const handleEditAppointment = (appointment: Appointment) => {
    console.log("Edit appointment:", appointment);
    // TODO: Implement edit appointment functionality
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    console.log("Delete appointment:", appointment);
    // TODO: Implement delete appointment functionality
  };

  const columns = [
    {
      name: "Student",
      selector: (row: Appointment) => row.student,
      sortable: true,
      grow: 1.5,
      cell: (row: Appointment) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.student}>
          {row.student}
        </div>
      ),
    },
    {
      name: "Instructor",
      selector: (row: Appointment) => row.instructor,
      sortable: true,
      grow: 1.5,
      cell: (row: Appointment) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.instructor}>
          {row.instructor}
        </div>
      ),
    },
    {
      name: "Course",
      selector: (row: Appointment) => row.course,
      sortable: true,
      grow: 1.5,
      cell: (row: Appointment) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.course}>
          {row.course}
        </div>
      ),
    },
    {
      name: "Date",
      selector: (row: Appointment) => row.date,
      sortable: true,
      grow: 1,
      cell: (row: Appointment) => <div className="text-base text-left text-neutral-900">{row.date}</div>,
    },
    {
      name: "Time",
      selector: (row: Appointment) => row.time,
      sortable: true,
      grow: 1,
      cell: (row: Appointment) => <div className="text-base text-left text-neutral-900">{row.time}</div>,
    },
    {
      name: "Status",
      selector: (row: Appointment) => row.status,
      sortable: true,
      grow: 1,
      minWidth: "125px",
      cell: (row: Appointment) => (
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
            row.status === "Scheduled"
              ? "text-blue-600 bg-blue-50"
              : row.status === "Completed"
              ? "text-green-600 bg-emerald-50"
              : "text-red-600 bg-red-50"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Type",
      selector: (row: Appointment) => row.meetingType,
      sortable: true,
      grow: 1,
      cell: (row: Appointment) => <div className="text-base text-left text-neutral-900">{row.meetingType}</div>,
    },
    {
      name: "Actions",
      cell: (row: Appointment) => (
        <ActionIcons
          onView={() => handleViewAppointment(row)}
          onEdit={() => handleEditAppointment(row)}
          onDelete={() => handleDeleteAppointment(row)}
          viewTooltip="View Appointment Details"
          editTooltip="Edit Appointment"
          deleteTooltip="Delete Appointment"
        />
      ),
      grow: 0.5,
    },
  ];

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">Appointments</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === "table" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <TableIcon className="w-5 h-5" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === "calendar" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Calendar View</span>
          </button>
        </div>
      </div>

      {view === "table" ? (
        <div className="relative">
          {isScrollable && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          )}
          <div
            ref={tableContainerRef}
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            <CustomDataTable columns={columns} data={appointments} noDataMessage="No appointments found" />
          </div>
        </div>
      ) : (
        <div className="h-[600px]">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={calendarEvents}
            eventClick={handleEventClick}
            height="100%"
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
          />
        </div>
      )}
    </section>
  );
};

export default Appointments;
