"use client";
import React from "react";

export const CourseContent = () => {
  return (
    <section className="mt-12 max-md:mt-10 ml-auto">
      <div className="flex gap-2 items-center text-3xl text-neutral-900">
      <nav className="flex gap-3 items-center overflow-x-auto whitespace-nowrap max-md:max-w-full">
  {[
    { label: "Overview", active: true },
    { label: "Course Content" },
    { label: "Details" },
    { label: "Instructor" },
    { label: "Review" },
  ].map((item, index) => (
    <button
      key={index}
      className={`flex-shrink-0 px-6 py-2 min-h-[40px] rounded-full text-lg font-medium ${
        item.active
          ? "bg-sky-500 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      } transition-colors max-md:px-3 max-md:py-1.5 max-md:text-xs max-md:min-h-[36px]`}
    >
      {item.label}
    </button>
  ))}
</nav>
      </div>

      <div className="mt-12 text-neutral-900 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
        <article className="w-full max-md:max-w-full">
          <h2 className="text-3xl font-bold max-md:max-w-full">
            What you'll learn
          </h2>
          <p className="mt-5 text-base leading-7 max-md:max-w-full">
            Are you new to PHP or need a refresher? Then this course will help
            you get all the fundamentals of Procedural PHP, Object Oriented PHP,
            MYSQLi and ending the course by building a CMS system similar to
            WordPress, Joomla or Drupal. Knowing PHP has allowed me to make
            enough money to stay home and make courses like this one for
            students all over the world.
          </p>
        </article>

        <div className="mt-8 w-full text-base leading-6 max-md:max-w-full">
          {/* Learning objectives grid */}
          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            {[
              "Become an advanced, confident, and modern JavaScript developer from scratch.",
              "Use the Jupyter Notebook Environment. JavaScript developer from scratch.",
              "Have an intermediate skill level of Python programming.",
              "Use the pandas module with Python to create and structure data.",
              "Have a portfolio of various data analysis projects.",
              "Have a portfolio of various data analysis projects.",
              "Use the numpy library to create and manipulate arrays.",
              "Create data visualizations using matplotlib and the seaborn.",
            ].map((objective, index) => (
              <div key={index} className="flex gap-2 items-start">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e250ce5e477b6a62341118a96947307c91c70fef?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
                  alt="Checkmark"
                  className="object-contain shrink-0 w-6 aspect-square"
                />
                <p className="w-[291px]">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
