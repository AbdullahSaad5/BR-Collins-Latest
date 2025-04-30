"use client";

import * as React from "react";
import { useEffect, useState } from "react";

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [today] = useState<Date>(new Date());

  // Parse the selectedDate string into a Date object
  const parsedSelectedDate = new Date(selectedDate);

  // Initialize currentMonth with the selected date's month
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatDateString = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth);
      date.setDate(day);
      const dateString = formatDateString(date);
      const isSelected = selectedDate === dateString;
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      // Check if the date is in the past
      const isPastDate = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => !isPastDate && onDateSelect(dateString)}
          disabled={isPastDate}
          className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${
            isSelected
              ? "bg-orange-500"
              : isToday
              ? "bg-sky-300 bg-opacity-30"
              : isPastDate
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-orange-500 hover:bg-opacity-20"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col w-full max-w-[325px] max-h-[287px] text-center text-white bg-sky-500 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center px-6 py-3.5 w-full text-base font-bold min-h-11 max-md:px-5">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
          aria-label="Previous month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h3 className="mx-2">{monthName}</h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
          aria-label="Next month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="w-full border-t border-stone-300 border-opacity-50" />
      <div className="px-4 py-2">
        <div className="grid grid-cols-7 gap-1 mb-1 text-xs font-semibold tracking-wide uppercase">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="h-6 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 auto-rows-fr">{renderDays()}</div>
      </div>
    </div>
  );
};
