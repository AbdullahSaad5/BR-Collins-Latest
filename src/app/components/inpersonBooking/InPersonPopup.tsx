"use client";

import * as React from "react";
import { Calendar } from "./Calendar";
import { CourseSelection } from "./CourseSelection";
import { TimeSlots } from "./TimeSlots";
import { api } from "@/app/utils/axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PaymentForm } from "./PaymentForm";
import { useAppSelector } from "@/app/store/hooks";
import { getRefreshToken } from "@/app/store/features/users/userSlice";

export interface BookingState {
  courseDuration: "half-day" | "full-day";
  price: number;
  selectedDate: Date;
  selectedSlot: string;
  currentMonth: Date;
  courseId: string;
}

interface InPersonPopupProps {
  onClose: () => void;
  courseId: string;
}

function InPersonPopup({ onClose, courseId }: InPersonPopupProps) {
  const [bookingState, setBookingState] = React.useState<BookingState>({
    courseDuration: "half-day",
    price: 1495,
    selectedDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    selectedSlot: "Morning, 8:00 AM - 12:00 PM",
    currentMonth: new Date(),
    courseId,
  });

  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const accessToken = useAppSelector(getRefreshToken);

  const fetchAvailableSlots = async (date: Date) => {
    // Check if the month is previous to current month
    const currentDate = new Date();
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const selectedMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    if (selectedMonth < currentMonth) {
      console.log("Skipping API call for previous month");
      return [];
    }

    // Only fetch slots for the current month being displayed
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDate = firstDayOfMonth.toISOString().split("T")[0];
    const endDate = lastDayOfMonth.toISOString().split("T")[0];

    try {
      const response = await api.get(`/appointments/available-slots?startDate=${startDate}&endDate=${endDate}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching available slots:", error);
      return [];
    }
  };

  const { data: availableSlots = [], isLoading } = useQuery({
    queryKey: ["availableSlots", bookingState.currentMonth],
    queryFn: () => fetchAvailableSlots(bookingState.currentMonth),
    enabled: bookingState.currentMonth >= new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  });

  const handleCourseSelection = (duration: "half-day" | "full-day") => {
    setBookingState((prev) => ({
      ...prev,
      courseDuration: duration,
      price: duration === "half-day" ? 1495 : 1995,
      selectedSlot: duration === "full-day" ? "Full Day, 8:00 AM - 5:00 PM" : "Morning, 8:00 AM - 12:00 PM",
    }));
  };

  const handleDateSelection = (date: Date) => {
    setBookingState((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  };

  const handleTimeSlotSelection = (slot: string) => {
    setBookingState((prev) => ({
      ...prev,
      selectedSlot: slot,
    }));
  };

  const handleMonthChange = (date: Date) => {
    setBookingState((prev) => ({
      ...prev,
      currentMonth: date,
    }));
  };

  const handleProceedToPayment = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowPaymentForm(true);
    }, 300);
  };

  const handlePaymentClose = () => {
    setShowPaymentForm(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="rounded max-w-[1102px] relative max-h-[90vh] overflow-y-auto">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-neutral-900">Loading available slots...</p>
          </div>
        </div>
      )}
      {showPaymentForm && <PaymentForm bookingState={bookingState} onClose={handlePaymentClose} />}
      <div className={`transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <button className="absolute top-4 right-4 z-10" onClick={onClose}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/179dd092ac1215fe4beb3a0ff1267359fcb77bcb?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
            alt="Close"
            className="w-[18px] aspect-square"
          />
        </button>
        <div className="flex h-full max-md:flex-col max-md:min-h-[80vh]">
          <div className="w-[70%] max-md:ml-0 max-md:w-full max-md:h-auto">
            <div className="flex flex-col h-full py-12 pr-5 pl-14 mx-auto w-full rounded-l-3xl max-md:rounded-t-3xl max-md:rounded-b-none bg-slate-100 max-md:pl-5 max-md:max-w-full max-md:overflow-y-auto">
              <h1 className="self-start text-4xl font-bold text-neutral-900 max-md:max-w-full">
                In-Person Training Booking
              </h1>

              <CourseSelection onSelect={handleCourseSelection} selectedDuration={bookingState.courseDuration} />

              <hr className="shrink-0 mt-5 h-px bg-white border border-solid border-zinc-200 max-md:max-w-full" />

              <div className="mt-5 mr-5 max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="w-5/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-neutral-900 max-md:mt-10">
                      <h2 className="text-2xl font-bold">View Calendar & Select Date:</h2>
                      <p className="self-start mt-3.5 text-base leading-6">
                        Click on a date to see time slot availability.
                      </p>
                    </div>
                  </div>
                  <div className="ml-5 w-7/12 max-md:ml-0 max-md:w-full">
                    <Calendar
                      selectedDate={bookingState.selectedDate}
                      onDateSelect={handleDateSelection}
                      onMonthChange={handleMonthChange}
                      availableSlots={availableSlots}
                    />
                  </div>
                </div>
              </div>

              <hr className="shrink-0 mt-5 h-px bg-white border border-solid border-zinc-200 max-md:max-w-full" />

              <TimeSlots
                onSelect={handleTimeSlotSelection}
                selectedSlot={bookingState.selectedSlot}
                courseDuration={bookingState.courseDuration}
                availableSlots={availableSlots}
                selectedDate={bookingState.selectedDate}
              />
            </div>
          </div>

          <div className="w-[30%] max-md:ml-0 max-md:w-full max-md:overflow-y-auto">
            <div className="h-full flex flex-col grow pt-7 pb-14 w-full text-lg bg-white rounded-r-3xl max-md:rounded-t-none max-md:rounded-b-3xl text-neutral-900">
              <div className="flex flex-col px-6 mt-4 w-full max-md:px-5">
                <h2 className="self-start text-2xl font-bold">Details Overview</h2>
                <div className="mt-16 max-md:mt-10 max-md:mr-2">
                  <div className="flex flex-col justify-center max-w-full min-h-[53px]">
                    <p>Course Duration:</p>
                    <p className="mt-1 font-bold text-left">
                      {bookingState.courseDuration === "half-day" ? "Half-Day" : "Full-Day"}
                    </p>
                  </div>
                  <hr className="mt-2 max-w-full bg-white border border-solid border-zinc-200 min-h-px" />

                  <div className="flex flex-col justify-center mt-4 max-w-full min-h-[53px]">
                    <p>Course Price:</p>
                    <p className="mt-1 font-bold text-left">${bookingState.price}</p>
                  </div>
                  <hr className="mt-2 max-w-full bg-white border border-solid border-zinc-200 min-h-px" />

                  <div className="flex flex-col justify-center mt-4 max-w-full min-h-[53px]">
                    <p>Selected Date:</p>
                    <p className="mt-1 font-bold text-left">{formatDateForDisplay(bookingState.selectedDate)}</p>
                  </div>
                  <hr className="mt-4 max-w-full bg-white border border-solid border-zinc-200 min-h-px" />

                  <div className="flex flex-col justify-center mt-1 max-w-full min-h-[53px]">
                    <p>Selected Slot(s):</p>
                    <p className="mt-1 font-bold text-left">{bookingState.selectedSlot}</p>
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  className="flex overflow-hidden gap-1.5 justify-center items-center px-5 py-3 mt-22 font-medium text-white bg-orange-500 min-h-[58px] rounded-[58px] max-md:px-5 max-md:mt-10"
                >
                  <span className="self-stretch my-auto">Proceed to Payment</span>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0889cf0590565dbb9aabef07a57290e2c923c555?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
                    alt="Arrow right"
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InPersonPopup;
