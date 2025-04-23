"use client";

import React, { useState } from "react";

export const TopBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <header className="flex flex-wrap gap-4 justify-between items-center py-3.5 px-4 md:px-20 w-full text-base font-medium text-center text-white bg-sky-600">
      <p className="text-sm md:text-base text-center md:text-left w-full md:w-auto">
        <strong className="font-black">Courses from $149.00</strong> Gain the
        skills to climb that career ladder.{" "}
        <span className="font-bold text-[#FFCA7E]">3 days left!</span>
      </p>
      <button onClick={() => setVisible(false)}>
        <img
          src="/img/cross.svg"
          className="w-6 h-6"
          alt="Close banner"
        />
      </button>
    </header>
  );
};
