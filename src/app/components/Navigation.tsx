"use client";

import React from "react";

export const Navigation = () => {
  return (
    <nav className="flex flex-wrap gap-10 items-center self-center mt-5 max-md:max-w-full p-1">
      <div className="flex flex-wrap gap-10 items-center self-stretch my-auto font-semibold min-w-60 max-md:max-w-full">
        <img
          src="/img/logo.svg"
          className="object-contain self-stretch my-auto aspect-[4.22] min-w-60 w-[241px]"
          alt="Logo"
        />
        <div className="flex gap-2.5 items-center self-stretch my-auto min-w-60 max-md:max-w-full">
          <div className="self-stretch my-auto text-base text-gray-400 rounded-none min-w-60 w-[321px]">
            <div className="flex flex-col justify-center items-start px-6 py-4 w-full bg-white border border-solid border-zinc-200 rounded-[66px] max-md:px-5">
              <div className="flex gap-2 justify-center items-center">
                <img
                  src="/img/search.svg"
                  className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  alt="Search icon"
                />
                <span>Search for anything</span>
              </div>
            </div>
          </div>
          <button className="flex overflow-hidden gap-1.5 justify-center items-center self-stretch px-5 py-4 my-auto text-lg text-orange-500 whitespace-nowrap border border-orange-500 border-solid min-h-[52px] rounded-[58px] w-[138px]">
            <span>Courses</span>
            <img
              src="/img/downarrow.svg"
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
              alt="Dropdown icon"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 items-center self-stretch my-auto text-base min-w-60 text-neutral-900 max-md:max-w-full">
        <div className="flex gap-8 items-center self-stretch my-auto font-medium min-w-60">
          <a href="/" className="hover:text-sky-600">
            Home
          </a>
          <a href="/" className="hover:text-sky-600">
            About
          </a>
          <a href="/" className="hover:text-sky-600">
            Contact Us
          </a>
        </div>
        <div className="flex gap-4 items-center self-stretch my-auto whitespace-nowrap">
          <img
            src="/img/card.svg"
            className="object-contain shrink-0 self-stretch my-auto w-9 aspect-square"
            alt="User icon"
          />
          <button className="overflow-hidden gap-1.5 self-stretch px-6 py-4 my-auto bg-white border border-solid border-zinc-200 min-h-[52px] rounded-[56px] max-md:px-5">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};
