import * as React from "react";

interface TimeSlotsProps {
  onSelect: (slot: string) => void;
  selectedSlot: string;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  onSelect,
  selectedSlot,
}) => {
  const timeSlots = [
    {
      label: "Morning Slot",
      value: "Morning, 8:00 AM – 12:00 PM",
      time: "8:00 AM – 12:00 PM"
    },
    {
      label: "Afternoon Slot",
      value: "Afternoon, 1:00 PM – 5:00 PM",
      time: "1:00 PM – 5:00 PM"
    }
  ];

  return (
    <div className="flex flex-col mt-5 max-w-full text-neutral-900 w-[667px]">
      <div className="flex  max-md:flex-col gap-5 w-full">
        <h2 className="text-2xl font-bold w-[280px] shrink-0">Choose Time Slot(s):</h2>
        <div className="flex flex-col justify-start text-lg flex-grow">
          {timeSlots.map((slot) => (
            <label 
              key={slot.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="timeSlot"
                checked={selectedSlot === slot.value}
                onChange={() => onSelect(slot.value)}
                className="w-5 h-5 text-sky-500 border-gray-300 focus:ring-sky-500 cursor-pointer"
              />
              <div className="flex gap-2.5 items-center">
                <span>{slot.label}:</span>
                <span className="font-bold">{slot.time}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};