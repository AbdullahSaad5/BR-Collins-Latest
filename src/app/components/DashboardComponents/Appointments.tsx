"use client";
import React, { useState, useRef, useEffect } from "react";
import { ViewIcon, ArrowLeftIcon, ArrowRightIcon, CalendarIcon, TableIcon } from "./Icons";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CustomDataTable from "./CustomDataTable";
import ActionIcons from "@/components/ActionIcons";
import { IAppointment } from "@/app/types/appointment.contract";
import { ICourse } from "@/app/types/course.contract";
import ViewAppointmentModal from "./ViewAppointmentModal";
import { useRouter } from "next/navigation";

const fetchAppointments = async (): Promise<{ data: IAppointment[] }> => {
  const response = await api.get("/appointments?populate=courseId");
  return response.data;
};

const Appointments = () => {
  const [view, setView] = useState<"table" | "calendar">("table");
  const [isScrollable, setIsScrollable] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const router = useRouter();

  const {
    data: appointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
    select: (data) => data.data,
  });

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

  const calendarEvents =
    appointments?.map((appointment) => ({
      id: appointment._id,
      title: `${(appointment.courseId as unknown as ICourse).title}`,
      start: appointment.startTime,
      end: appointment.endTime,
      extendedProps: {
        location: appointment.location,
        maxParticipants: appointment.maxParticipants,
        price: appointment.price,
      },
    })) || [];

  const handleEventClick = (info: any) => {
    const appointment = appointments?.find((a) => a._id === info.event.id);
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsViewModalOpen(true);
    }
  };

  const handleViewAppointment = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const handleEditAppointment = (appointment: IAppointment) => {
    router.push(`/dashboard?item=addAppointment&edit=${appointment._id}`);
  };

  const handleDeleteAppointment = (appointment: IAppointment) => {
    console.log("Delete appointment:", appointment);
    // TODO: Implement delete appointment functionality
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedAppointment(null);
  };

  const columns = [
    {
      name: "Course",
      selector: (row: IAppointment) => (row.courseId as unknown as ICourse).title,
      sortable: true,
      grow: 1.5,
      cell: (row: IAppointment) => (
        <div
          className="text-base text-left text-neutral-900 truncate"
          title={(row.courseId as unknown as ICourse).title}
        >
          {(row.courseId as unknown as ICourse).title}
        </div>
      ),
    },
    {
      name: "Location",
      selector: (row: IAppointment) => row.location.venueName,
      sortable: true,
      grow: 1.5,
      cell: (row: IAppointment) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.location.venueName}>
          {row.location.venueName}
        </div>
      ),
    },
    {
      name: "Date",
      selector: (row: IAppointment) => new Date(row.startTime).toLocaleDateString(),
      sortable: true,
      grow: 1,
      cell: (row: IAppointment) => (
        <div className="text-base text-left text-neutral-900">{new Date(row.startTime).toLocaleDateString()}</div>
      ),
    },
    {
      name: "Time",
      selector: (row: IAppointment) => new Date(row.startTime).toLocaleTimeString(),
      sortable: true,
      grow: 1,
      cell: (row: IAppointment) => (
        <div className="text-base text-left text-neutral-900">
          {new Date(row.startTime).toLocaleTimeString()} - {new Date(row.endTime).toLocaleTimeString()}
        </div>
      ),
    },
    {
      name: "Max Participants",
      selector: (row: IAppointment) => row.maxParticipants,
      sortable: true,
      grow: 1,
      cell: (row: IAppointment) => <div className="text-base text-left text-neutral-900">{row.maxParticipants}</div>,
    },
    {
      name: "Price",
      selector: (row: IAppointment) => row.price,
      sortable: true,
      grow: 1,
      cell: (row: IAppointment) => <div className="text-base text-left text-neutral-900">${row.price}</div>,
    },
    {
      name: "Actions",
      cell: (row: IAppointment) => (
        <ActionIcons
          onView={() => handleViewAppointment(row)}
          onEdit={() => handleEditAppointment(row)}
          viewTooltip="View Appointment Details"
          editTooltip="Edit Appointment"
        />
      ),
      grow: 0.5,
    },
  ];

  if (error) {
    showToast("Failed to fetch appointments", "error");
  }

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
            <CustomDataTable
              columns={columns}
              data={appointments || []}
              isLoading={isLoading}
              error={error}
              noDataMessage="No appointments found"
            />
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

      <ViewAppointmentModal appointment={selectedAppointment} isOpen={isViewModalOpen} onClose={handleCloseViewModal} />
    </section>
  );
};

export default Appointments;
