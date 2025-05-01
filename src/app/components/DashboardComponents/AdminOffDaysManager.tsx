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
    const offDayId = info.event.id.replace("off-day-", "");
    const offDay = offDays.find((day) => day._id === offDayId);
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

  const calendarEvents = offDays.map((offDay) => ({
    id: `off-day-${offDay._id}`,
    title: offDay.reason || "Off Day",
    start: new Date(offDay.date),
    backgroundColor: offDay.disabledSlots?.length ? "#FDA4AF" : "#F43F5E",
    classNames: ["cursor-pointer"],
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Manage Off Days</h2>

      <div className="h-[600px]">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
          events={calendarEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="100%"
        />
      </div>

      <AdminOffDayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onSubmit={handleModalSubmit}
      />

      <ViewOffDayModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedOffDay(null);
        }}
        offDay={selectedOffDay}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminOffDaysManager;
