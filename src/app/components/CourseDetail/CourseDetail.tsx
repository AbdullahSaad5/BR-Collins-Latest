"use client";
import React from "react";
import { CourseSection } from "./CourseSection";
import { Check } from "lucide-react";

export const CourseContent = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <main className="box-border p-5  my-0 w-full max-md:p-4  max-sm:p-2.5 max-sm:max-w-screen-sm ml-auto">
        <section className="mb-10">
          <header className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-bold text-neutral-900 max-md:text-3xl max-sm:text-2xl">
              Course Content
            </h1>
            <span className="text-base text-neutral-900 max-md:text-sm max-sm:text-xs">
              6 sections • 40 lectures • 27h 30m total length
            </span>
            <button className="text-base font-semibold text-orange-500 underline cursor-pointer max-md:text-sm max-sm:text-xs">
              Expand All Sections
            </button>
          </header>

          <CourseSection
            title="Introduction to Course"
            stats="3 lectures • 1hr 30 min"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/62b824286fd0acfa901dd05cd9fdd8f82eedcc53?placeholderIfAbsent=true"
            expanded={true}
            lectures={[
              {
                title: "Module 1: Introduction to Office Administration",
                duration: "30:00",
                type: "video",
              },
              {
                title: "Module 2: Communication in the Workplace",
                duration: "30:00",
                type: "video",
              },
              {
                title: "Module 3: Time Management & Organization",
                duration: "30:00",
                type: "video",
              },
              {
                title: "Module 4: Document Management",
                duration: "30:00",
                type: "book",
              },
            ]}
          />

          <CourseSection
            title="Course Fundamentals"
            stats="6 lectures • 2hr 30 min"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a9582ecadffb53b1570073486c3f4e6e7eb3ff4?placeholderIfAbsent=true"
          />

          <CourseSection
            title="You can develop skill and setup"
            stats="6 lectures • 1hr 30 min"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a9582ecadffb53b1570073486c3f4e6e7eb3ff4?placeholderIfAbsent=true"
          />

          <CourseSection
            title="15 Things To Know About Education?"
            stats="2 lectures • 2hr 30 min"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a9582ecadffb53b1570073486c3f4e6e7eb3ff4?placeholderIfAbsent=true"
          />

          <CourseSection
            title="Course Description"
            stats="2 lectures • 2hr 30 min"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a9582ecadffb53b1570073486c3f4e6e7eb3ff4?placeholderIfAbsent=true"
          />
        </section>

        <section className="mb-10">
          <h2 className="mb-5 text-3xl font-bold text-neutral-900 max-md:text-sm max-sm:text-xs">
            Requirements
          </h2>
          <ul>
            <li className="flex items-center mb-2.5">
              <Check 
                size={20} 
                className="mr-2 text-sky-600" 
                strokeWidth={2}
              />
              <span>No prior experience required — beginners welcome</span>
            </li>
            <li className="flex items-center mb-2.5">
              <Check 
                size={20} 
                className="mr-2 text-sky-600" 
                strokeWidth={2}
              />
              <span>
                Familiarity with office software (Microsoft Word, Excel, Outlook
                or Google Workspace) is a plus, but not mandatory
              </span>
            </li>
            <li className="flex items-center mb-2.5">
              <Check 
                size={20} 
                className="mr-2 text-sky-600" 
                strokeWidth={2}
              />
              <span>
                A willingness to learn and apply professional administrative
                practices
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-5 text-3xl font-bold text-neutral-900 max-md:text-sm max-sm:text-xs">
            Description
          </h2>
          <p className="text-base leading-7 text-neutral-900 max-md:text-sm max-md:leading-6 max-sm:text-xs max-sm:leading-5">
            This course is designed to provide a comprehensive foundation in
            administrative office procedures for individuals entering the
            workforce or looking to sharpen their organizational and operational
            skills. Whether you're an aspiring administrative assistant, office
            coordinator, or looking to boost your professional toolkit, this
            course will guide you through the core responsibilities of managing
            office functions.
          </p>
        </section>
      </main>
    </>
  );
};

export default CourseContent;
