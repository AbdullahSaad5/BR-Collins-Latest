import React from "react";
import { X, Calendar, Clock, MapPin, Users, DollarSign, BookOpen } from "lucide-react";
import { IAppointment } from "@/app/types/appointment.contract";
import { ICourse } from "@/app/types/course.contract";

interface ViewAppointmentModalProps {
  appointment: IAppointment | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewAppointmentModal: React.FC<ViewAppointmentModalProps> = ({ appointment, isOpen, onClose }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 animate-slideIn">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Appointment Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-neutral-900">
                  {(appointment.courseId as unknown as ICourse).title}
                </h3>
                <p className="text-sm text-gray-500">Course Appointment</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <label className="text-sm font-medium text-gray-500">Location</label>
                </div>
                <p className="text-base text-neutral-900">{appointment.location.venueName}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {appointment.location.streetAddress}, {appointment.location.city}, {appointment.location.state}{" "}
                  {appointment.location.zipCode}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <label className="text-sm font-medium text-gray-500">Time</label>
                </div>
                <p className="text-base text-neutral-900">
                  {new Date(appointment.startTime).toLocaleTimeString()} -{" "}
                  {new Date(appointment.endTime).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">{new Date(appointment.startTime).toLocaleDateString()}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <label className="text-sm font-medium text-gray-500">Max Participants</label>
                </div>
                <p className="text-base text-neutral-900">{appointment.maxParticipants}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <label className="text-sm font-medium text-gray-500">Price</label>
                </div>
                <p className="text-base text-neutral-900">${appointment.price}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <label className="text-sm font-medium text-gray-500">Course</label>
                </div>
                <p className="text-base text-neutral-900">{(appointment.courseId as unknown as ICourse).title}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentModal;
