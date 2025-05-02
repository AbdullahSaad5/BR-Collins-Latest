"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { IAdminOffDay } from "@/app/types/admin.contract";
import { useAppSelector } from "@/app/store/hooks";
import { getRefreshToken } from "@/app/store/features/users/userSlice";
import AdminOffDayModal from "./AdminOffDayModal";
import ViewOffDayModal from "./ViewOffDayModal";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";

interface OffDayFormData {
  date: Date;
  reason?: string;
  isRecurring: boolean;
  disabledSlots: ("half-day-morning" | "half-day-afternoon")[];
}

const fetchOffDays = async (refreshToken: string): Promise<{ data: IAdminOffDay[] }> => {
  const response = await api.get("/admin-off-days", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response.data;
};

const AdminOffDaysManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedOffDay, setSelectedOffDay] = useState<IAdminOffDay | null>(null);
  const queryClient = useQueryClient();
  const refreshToken = useAppSelector(getRefreshToken);

  // Add custom styles for mobile
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media (max-width: 640px) {
        .fc .fc-toolbar {
          flex-direction: column;
          gap: 1rem;
        }
        .fc .fc-toolbar-title {
          font-size: 1.2rem;
          text-align: center;
        }
        .fc .fc-button {
          padding: 0.4em 0.65em;
          font-size: 0.9em;
        }
        .fc .fc-toolbar-chunk {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          width: 100%;
        }
        .fc .fc-view-harness {
          min-height: 400px;
        }
        .fc .fc-daygrid-day-number {
          font-size: 0.9em;
          padding: 4px;
        }
        .fc .fc-daygrid-day-top {
          justify-content: center;
        }
        .fc .fc-daygrid-day-frame {
          min-height: 5em;
        }
        .fc .fc-day-header {
          font-size: 0.9em;
          padding: 4px 2px !important;
        }
        .fc-theme-standard td, .fc-theme-standard th {
          padding: 2px;
        }
        .fc-daygrid-event {
          padding: 2px 4px !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const { data: offDays = [], isLoading } = useQuery({
    queryKey: ["adminOffDays"],
    queryFn: () => fetchOffDays(refreshToken!),
    select: (data) => data.data,
  });

  const addOffDayMutation = useMutation({
    mutationFn: async (data: OffDayFormData) => {
      const response = await api.post("/admin-off-days", data, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOffDays"] });
      showToast("Off day added successfully", "success");
      setIsModalOpen(false);
    },
    onError: () => {
      showToast("Failed to add off day", "error");
    },
  });

  const deleteOffDayMutation = useMutation({
    mutationFn: async (offDayId: string) => {
      const response = await api.delete(`/admin-off-days/${offDayId}`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOffDays"] });
      showToast("Off day deleted successfully", "success");
      setIsViewModalOpen(false);
    },
    onError: () => {
      showToast("Failed to delete off day", "error");
    },
  });

  const handleDateClick = (info: DateClickArg) => {
    console.log(new Date(info.dateStr));
    setSelectedDate(new Date(info.dateStr));
    setIsModalOpen(true);
  };

  const handleEventClick = (info: any) => {
    const originalId = info.event.extendedProps.originalId;
    const offDay = offDays.find((day) => day._id === originalId);
    if (offDay) {
      setSelectedOffDay(offDay);
      setIsViewModalOpen(true);
    }
  };

  const handleModalSubmit = (data: OffDayFormData) => {
    addOffDayMutation.mutate(data);
  };

  const handleDelete = (offDayId: string) => {
    deleteOffDayMutation.mutate(offDayId);
  };

  const calendarEvents = offDays.flatMap((offDay) => {
    const events = [];
    const startDate = new Date(offDay.date);

    if (offDay.isRecurring) {
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 6);

      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        events.push({
          id: `off-day-${offDay._id}-${currentDate.toISOString()}`,
          title: offDay.reason || "Recurring Off Day",
          start: offDay.disabledSlots.includes("half-day-morning")
            ? new Date(new Date(currentDate).setHours(8, 0, 0, 0))
            : offDay.disabledSlots.includes("half-day-afternoon")
            ? new Date(new Date(currentDate).setHours(13, 0, 0, 0))
            : new Date(currentDate),
          end: offDay.disabledSlots.includes("half-day-morning")
            ? new Date(new Date(currentDate).setHours(12, 0, 0, 0))
            : offDay.disabledSlots.includes("half-day-afternoon")
            ? new Date(new Date(currentDate).setHours(17, 0, 0, 0))
            : new Date(currentDate),
          backgroundColor: offDay.disabledSlots?.length ? "#FDA4AF" : "#F43F5E",
          borderColor: offDay.disabledSlots?.length ? "#FDA4AF" : "#F43F5E",
          textColor: "#ffffff",
          classNames: ["cursor-pointer"],
          extendedProps: {
            originalId: offDay._id,
            slots: offDay.disabledSlots,
            isRecurring: offDay.isRecurring,
            recurringDay: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
            originalDate: startDate.toISOString(),
          },
        });

        currentDate.setDate(currentDate.getDate() + 7);
      }
    } else {
      events.push({
        id: `off-day-${offDay._id}`,
        title: offDay.reason || "Off Day",
        start: offDay.disabledSlots.includes("half-day-morning")
          ? new Date(startDate.setHours(8, 0, 0, 0))
          : offDay.disabledSlots.includes("half-day-afternoon")
          ? new Date(startDate.setHours(13, 0, 0, 0))
          : startDate,
        end: offDay.disabledSlots.includes("half-day-morning")
          ? new Date(startDate.setHours(12, 0, 0, 0))
          : offDay.disabledSlots.includes("half-day-afternoon")
          ? new Date(startDate.setHours(17, 0, 0, 0))
          : startDate,
        backgroundColor: offDay.disabledSlots?.length ? "#FDA4AF" : "#F43F5E",
        borderColor: offDay.disabledSlots?.length ? "#FDA4AF" : "#F43F5E",
        textColor: "#ffffff",
        classNames: ["cursor-pointer"],
        extendedProps: {
          originalId: offDay._id,
          slots: offDay.disabledSlots,
          isRecurring: offDay.isRecurring,
        },
      });
    }

    return events;
  });

  console.log(calendarEvents);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-4 sm:mb-6">Manage Off Days</h2>

      {isLoading ? (
        <div className="h-[400px] sm:h-[600px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading off days...</p>
          </div>
        </div>
      ) : (
        <div className="h-[400px] sm:h-[600px] overflow-x-auto">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth",
            }}
            views={{
              dayGridMonth: {
                titleFormat: { year: "numeric", month: "long" },
                dayHeaderFormat: { weekday: "short" },
              },
            }}
            height="auto"
            contentHeight="auto"
            aspectRatio={1.35}
            handleWindowResize={true}
            stickyHeaderDates={true}
            expandRows={true}
            events={calendarEvents}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={(eventInfo) => {
              const isRecurring = eventInfo.event.extendedProps.isRecurring;
              const isMobile = window.innerWidth < 640;
              return (
                <div className="w-full p-1">
                  <div className="font-semibold text-xs sm:text-sm truncate">
                    {eventInfo.event.title}
                    {isRecurring && " 🔄"}
                  </div>
                  {!isMobile && (
                    <div className="text-xs mt-0.5 inline-block px-1.5 py-0.5 rounded-full bg-white/20">
                      {eventInfo.event.extendedProps.slots?.length === 1 ? "Half Day" : "Full Day"}
                    </div>
                  )}
                </div>
              );
            }}
            eventDidMount={(info) => {
              const isRecurring = info.event.extendedProps.isRecurring;
              tippy(info.el, {
                content: `
                  <div class="p-3 min-w-[280px]">
                    <div class="font-semibold text-base mb-2">${info.event.title}</div>
                    <div class="space-y-2">
                      <div class="flex items-center gap-2">
                        <span class="text-gray-500">Date:</span>
                        <span>${new Date(info.event.start!).toLocaleDateString()}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-gray-500">Type:</span>
                        <span>${info.event.extendedProps.slots?.length === 1 ? "Half Day" : "Full Day"}</span>
                      </div>
                      ${
                        info.event.extendedProps.slots?.length === 1
                          ? `
                        <div class="flex items-center gap-2">
                          <span class="text-gray-500">Time:</span>
                          <span>${
                            info.event.extendedProps.slots.includes("half-day-morning")
                              ? "Morning (8 AM - 12 PM)"
                              : "Afternoon (1 PM - 5 PM)"
                          }</span>
                        </div>
                      `
                          : ""
                      }
                      ${
                        isRecurring
                          ? `
                        <div class="flex items-center gap-2 mt-1 pt-2 border-t border-gray-200">
                          <span class="text-gray-500">Recurring:</span>
                          <span>Every ${info.event.extendedProps.recurringDay}</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="text-gray-500">First Set:</span>
                          <span>${new Date(info.event.extendedProps.originalDate).toLocaleDateString()}</span>
                        </div>
                      `
                          : ""
                      }
                    </div>
                  </div>
                `,
                allowHTML: true,
                placement: "top",
                arrow: true,
                theme: "light-border",
                delay: [200, 0],
                interactive: true,
                maxWidth: 320,
              });
            }}
          />
        </div>
      )}

      <AdminOffDayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onSubmit={handleModalSubmit}
      />

      <ViewOffDayModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        offDay={selectedOffDay}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminOffDaysManager;
