"use client";
import React, { useState } from "react";
import { ViewIcon, ArrowLeftIcon, ArrowRightIcon, CalendarIcon, TableIcon } from "./Icons";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

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
        <div className="w-full border-collapse">
          {/* Table Header */}
          <div className="flex items-center p-3 rounded-lg bg-slate-100">
            <div className="w-[15%] text-base font-medium text-left text-neutral-900">Student</div>
            <div className="w-[15%] text-base font-medium text-left text-neutral-900">Instructor</div>
            <div className="w-[15%] text-base font-medium text-left text-neutral-900">Course</div>
            <div className="w-[10%] text-base font-medium text-left text-neutral-900">Date</div>
            <div className="w-[10%] text-base font-medium text-left text-neutral-900">Time</div>
            <div className="w-[15%] text-base font-medium text-left text-neutral-900">Status</div>
            <div className="w-[10%] text-base font-medium text-left text-neutral-900">Type</div>
            <div className="w-[10%] text-base font-medium text-left text-neutral-900">Actions</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col divide-y divide-slate-100">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center p-3 hover:bg-slate-50 transition-colors">
                <div className="w-[15%] text-base text-left text-neutral-900 truncate" title={appointment.student}>
                  {appointment.student}
                </div>
                <div className="w-[15%] text-base text-left text-neutral-900 truncate" title={appointment.instructor}>
                  {appointment.instructor}
                </div>
                <div className="w-[15%] text-base text-left text-neutral-900 truncate" title={appointment.course}>
                  {appointment.course}
                </div>
                <div className="w-[10%] text-base text-left text-neutral-900">{appointment.date}</div>
                <div className="w-[10%] text-base text-left text-neutral-900">{appointment.time}</div>
                <div className="w-[15%]">
                  <span
                    className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                      appointment.status === "Scheduled"
                        ? "text-blue-600 bg-blue-50"
                        : appointment.status === "Completed"
                        ? "text-green-600 bg-emerald-50"
                        : "text-red-600 bg-red-50"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <div className="w-[10%] text-base text-left text-neutral-900">{appointment.meetingType}</div>
                <div className="w-[10%]">
                  <button
                    aria-label="View appointment details"
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
            <div className="text-sm text-gray-500">Page 1 of 1</div>
            <div className="flex gap-4 items-center">
              <button
                aria-label="Previous page"
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                disabled
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <button
                aria-label="Next page"
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                disabled
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
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
