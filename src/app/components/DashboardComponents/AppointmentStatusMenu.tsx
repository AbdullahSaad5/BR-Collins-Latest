"use client";
import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { createPortal } from "react-dom";

interface AppointmentStatusMenuProps {
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "rescheduled";
  onStatusChange: (
    status: "scheduled" | "in-progress" | "completed" | "cancelled" | "rescheduled",
    data?: { newDate?: string; startTime?: string; endTime?: string; reason?: string }
  ) => Promise<void>;
}

const AppointmentStatusMenu: React.FC<AppointmentStatusMenuProps> = ({ status, onStatusChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<
    "scheduled" | "in-progress" | "completed" | "cancelled" | "rescheduled" | null
  >(null);
  const [rescheduleData, setRescheduleData] = useState({ newDate: "", startTime: "", endTime: "" });
  const [cancelReason, setCancelReason] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isMenuOpen]);

  const handleStatusClick = (newStatus: "scheduled" | "in-progress" | "completed" | "cancelled" | "rescheduled") => {
    setPendingStatus(newStatus);
    setShowConfirmation(true);
    setIsMenuOpen(false);
  };

  const handleConfirm = async () => {
    if (pendingStatus !== null) {
      try {
        if (pendingStatus === "rescheduled") {
          await onStatusChange(pendingStatus, {
            newDate: rescheduleData.newDate,
            startTime: rescheduleData.startTime,
            endTime: rescheduleData.endTime,
          });
        } else if (pendingStatus === "cancelled") {
          await onStatusChange(pendingStatus, { reason: cancelReason });
        } else {
          await onStatusChange(pendingStatus);
        }
        toast.success(`Appointment status updated to ${pendingStatus}`);
      } catch (error) {
        toast.error("Failed to update appointment status");
      }
    }
    setShowConfirmation(false);
    setPendingStatus(null);
    setRescheduleData({ newDate: "", startTime: "", endTime: "" });
    setCancelReason("");
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setPendingStatus(null);
    setRescheduleData({ newDate: "", startTime: "", endTime: "" });
    setCancelReason("");
  };

  if (!mounted) return null;

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusClass = () => {
    switch (status) {
      case "scheduled":
        return "text-blue-600 bg-blue-50 hover:bg-blue-100";
      case "in-progress":
        return "text-orange-600 bg-orange-50 hover:bg-orange-100";
      case "completed":
        return "text-green-600 bg-emerald-50 hover:bg-emerald-100";
      case "cancelled":
        return "text-red-600 bg-red-50 hover:bg-red-100";
      case "rescheduled":
        return "text-purple-600 bg-purple-50 hover:bg-purple-100";
      default:
        return "text-gray-600 bg-gray-50 hover:bg-gray-100";
    }
  };

  const renderConfirmationContent = () => {
    if (pendingStatus === "rescheduled") {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-base text-neutral-900">Are you sure you want to reschedule this appointment?</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Date</label>
              <input
                type="date"
                value={rescheduleData.newDate}
                onChange={(e) => setRescheduleData({ ...rescheduleData, newDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={rescheduleData.startTime}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  value={rescheduleData.endTime}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (pendingStatus === "cancelled") {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-base text-neutral-900">Are you sure you want to cancel this appointment?</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Cancellation</label>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Please provide a reason for cancellation..."
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-base text-neutral-900">
            Are you sure you want to change the appointment status to {pendingStatus}?
          </p>
        </div>
      );
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${getStatusClass()}`}
      >
        {getStatusText()}
        <MoreVertical className="ml-1 w-3 h-3" />
      </button>

      {isMenuOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-50"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
            }}
          >
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="py-0.5">
                {status !== "scheduled" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusClick("scheduled");
                    }}
                    className="flex items-center w-full px-2 py-1 text-xs text-blue-600 hover:bg-blue-50"
                  >
                    Scheduled
                  </button>
                )}
                {status !== "in-progress" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusClick("in-progress");
                    }}
                    className="flex items-center w-full px-2 py-1 text-xs text-orange-600 hover:bg-orange-50"
                  >
                    In Progress
                  </button>
                )}
                {status !== "completed" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusClick("completed");
                    }}
                    className="flex items-center w-full px-2 py-1 text-xs text-green-600 hover:bg-green-50"
                  >
                    Completed
                  </button>
                )}
                {status !== "cancelled" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusClick("cancelled");
                    }}
                    className="flex items-center w-full px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                  >
                    Cancelled
                  </button>
                )}
                {status !== "rescheduled" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusClick("rescheduled");
                    }}
                    className="flex items-center w-full px-2 py-1 text-xs text-purple-600 hover:bg-purple-50"
                  >
                    Rescheduled
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      {showConfirmation &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-slideIn">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-neutral-900">Confirm Status Change</h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {renderConfirmationContent()}

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={
                      (pendingStatus === "rescheduled" &&
                        (!rescheduleData.newDate || !rescheduleData.startTime || !rescheduleData.endTime)) ||
                      (pendingStatus === "cancelled" && !cancelReason)
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default AppointmentStatusMenu;
