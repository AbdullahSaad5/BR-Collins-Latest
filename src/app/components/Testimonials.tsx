'use client'
import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Hannah R.",
    role: "Sutton CEO",
    message:
      "B.R. Collins' business management course gave me the confidence to lead my team to success.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  },
  {
    name: "Valerie J.",
    role: "Creasman CEO",
    message:
      "The online learning platform is user-friendly, and the courses are top-quality. A great investment!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111604.png",
  },
  {
    name: "Hannah R.",
    role: "Sutton CEO",
    message:
      "B.R. Collins' business management course gave me the confidence to lead my team to success.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  },
  {
    name: "Valerie J.",
    role: "Creasman CEO",
    message:
      "The online learning platform is user-friendly, and the courses are top-quality. A great investment!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111604.png",
  },
  {
    name: "Valerie J.",
    role: "Creasman CEO",
    message:
      "The online learning platform is user-friendly, and the courses are top-quality. A great investment!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111604.png",
  },
  {
    name: "Valerie J.",
    role: "Creasman CEO",
    message:
      "The online learning platform is user-friendly, and the courses are top-quality. A great investment!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111604.png",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const visibleCards = 4;

  const prev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const next = () => {
    setIndex((prevIndex) =>
      Math.min(prevIndex + 1, testimonials.length - visibleCards)
    );
  };

  return (
    <section className="bg-blue-50 py-12 px-4 md:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        What Our Learners Say
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10 text-sm">
        Learning communicate to global world and build a bright future with our histudy.
      </p>

      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}px)` }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} isActive={i === index + 1} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100"
        >
          ←
        </button>
        <div className="h-1 w-50 bg-blue-600  rounded"></div>
        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
