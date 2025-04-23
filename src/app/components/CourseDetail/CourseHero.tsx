"use client";
import React from "react";
import { StarRating } from "./StarRating";

export const CourseHero = () => {
  return (
    <section className="flex flex-col items-start px-20 pt-5 pb-32 mt-5 w-full bg-neutral-900 max-md:px-5 custom-padding2 max-md:pb-24 max-md:max-w-full">
      <div className="flex flex-col -mb-6 max-w-full w-[648px] lg:ml-[9%] custom-margin1 max-md:mb-2.5">
        <nav className="flex gap-1 items-end self-start text-base text-white">
          <a href="#">Home</a>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f8a4ef21cebf71bbe62d3a6b83740a760828aca?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
            alt="Breadcrumb separator"
            className="object-contain shrink-0 aspect-square w-[18px]"
          />
          <a href="#">Courses</a>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f8a4ef21cebf71bbe62d3a6b83740a760828aca?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
            alt="Breadcrumb separator"
            className="object-contain shrink-0 aspect-square w-[18px]"
          />
          <a href="#" className="font-semibold text-sky-500">
            Administrative Office Procedures
          </a>
        </nav>

        <div className="mt-24 max-md:mt-10 max-md:max-w-full">
          <div className="w-full text-white min-h-[196px] max-md:max-w-full">
            <h1 className="flex-1 text-5xl font-bold leading-[58px] max-md:max-w-full max-md:text-4xl max-md:leading-[49px]">
              Administrative Office Procedures
            </h1>
            <p className="mt-5 text-xl leading-8 max-md:max-w-full">
              A complete guide to Administrative Office Procedures course. Learn
              from scratch and master the skill.
            </p>
          </div>

          <div className="flex flex-col mt-10 max-w-full w-[577px]">
            <div className="flex flex-wrap gap-3 items-center w-full max-md:max-w-full">
              <div className="flex gap-1 justify-center items-center self-stretch px-3 py-1.5 my-auto text-base font-medium text-black whitespace-nowrap bg-orange-300 rounded-md">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1099e32fc8790b4b60ad2b6a14e0383d2ac123fe?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
                  alt="Bestseller badge"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[0.81] w-[13px]"
                />
                <span>Bestseller</span>
              </div>

              <div className="flex gap-1.5 items-center self-stretch my-auto">
                <span className="self-stretch my-auto text-lg font-medium text-white">
                  4.8
                </span>
                <StarRating rating={4.8} />
                <a
                  href="#"
                  className="self-stretch my-auto text-base text-white underline"
                >
                  10+ rating
                </a>
              </div>

              <div className="grow shrink self-stretch my-auto w-0 h-5 border border-solid border-white border-opacity-50" />

              <div className="flex grow shrink gap-4 items-center self-stretch h-full text-base text-white w-[234px]">
                <div className="flex gap-1 items-center self-stretch my-auto">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e257f034863fcf7ce9add71532e145c18f312ee?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
                    alt="Lessons icon"
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  />
                  <span>12 Lessons</span>
                </div>
                <div className="flex gap-1.5 items-center self-stretch my-auto">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2da4145c7bc44e70df355cbb06cf2f020433498e?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
                    alt="Students icon"
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  />
                  <span>50 Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
