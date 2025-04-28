"use client";


import React from "react";

interface CourseCardProps {
  duration: string;
  title: string;
  slug: string;
  instructor?: string;
  lessons: number;
  rating: number;
  price: string;
  originalPrice?: string;
  isNew?: boolean;
  imageUrl?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  duration,
  title,
  lessons,
  rating,
  price,
  slug,
  originalPrice,
  imageUrl,
}) => {
  return (
    <a href={`/course/${slug}`}>
    <div className="flex flex-col md:flex-row items-start gap-6 px-4 pt-4 pb-4 w-full bg-white rounded-2xl border border-solid border-zinc-200 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
  
    <div className="flex flex-col flex-1">
      {/* Duration badge */}
      {/* {isNew && ( */}
        <span className="mb-2 px-2 py-0.5 text-sm font-bold text-white uppercase bg-sky-500 rounded-md border border-sky-500 border-solid w-fit">
          {duration}
        </span>
      {/* )} */}
  
      {/* Title & Lessons */}
      <div className="w-full">
      <h3 className="text-lg sm:text-xl md:text-1xl font-bold leading-snug text-neutral-900">
            {title}
          </h3>
        <div className="flex gap-1.5 items-center mt-3.5 text-lg text-gray-500">
          <img
            src="/img/Course/lession.svg"
            className="w-4 h-4"
            alt="Lessons icon"
          />
          <span>{lessons} Lessons</span>
        </div>
        <hr className="mt-4 w-full border-zinc-200" />
      </div>
  
      {/* Rating */}
      <div className="flex gap-1.5 items-center mt-4">
        <span className="text-lg text-neutral-900">{rating}</span>
        <div className="flex gap-px items-center">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${
                i < Math.floor(rating)
                  ? "cbe5a472d765e221c9aabf502e5a61f589060766"
                  : "c8fa37fbcebebcd120b4ccf029f77f04da351558"
              }?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5`}
              className="w-4 h-4"
              alt={i < Math.floor(rating) ? "Filled star" : "Empty star"}
            />
          ))}
        </div>
      </div>
  
      {/* Price & CTA */}
      <div className="mt-6">
        <div className="flex gap-2 items-center">
          <span className="text-xl font-bold text-neutral-900">{price}</span>
          {originalPrice && (
            <span className="text-base line-through text-neutral-400">
              {originalPrice}
            </span>
          )}
        </div>
        <a
   href={`/course/${slug}`}
  className="mt-4 inline-block text-base font-semibold text-orange-500 underline"
>
  View Details
</a>
      </div>
    </div>
  </div>
  </a>
  
  );
};
