"use client";
import React, { useState, useRef, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  
  {
    name: "Valerie J.",
    role: "Creasman CEO",
    message:"The online learning platform is user-friendly, and the courses are top-quality. A great investment!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111604.png",
  },
  {
    name: "Hannah R.",
    role: "Sutton CEO",
    message:"B.R. Collins' business management course gave me the confidence to lead my team to success.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  },
  {
    name: "Valerie J.",
    role: "Creasman CEO",
    message:"The online learning platform is user-friendly, and the courses are top-quality. A great investment!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111604.png",
  },
  {
    name: "Valerie J.",
    role: "Creasman CEO",
    message:"The online learning platform is user-friendly, and the courses are top-quality. A great investment!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    platformLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111604.png",
  },
 
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  const [index, setIndex] = useState(1);

  const prev = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex + 1)
    );
  };
  useEffect(() => {
    if (containerRef.current && cardRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const cardWidth = cardRef.current.offsetWidth;
      const newOffset = cardWidth * index - (containerWidth / 2) + (cardWidth / 2);
      setOffset(newOffset);
    }
  }, [index]);

  const extendedTestimonials = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
  ];
  
  useEffect(() => {
    if (index === 0) {
      setTimeout(() => {
        setIndex(testimonials.length);
      }, 300); 
    } else if (index === extendedTestimonials.length - 1) {
      setTimeout(() => {
        setIndex(1);
      }, 300);
    }
  }, [index]);
  

  return (
    <section className="bg-blue-50 py-12 px-4 md:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        What Our Learners Say
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10 text-sm">
        Learning communicate to global world and build a bright future with our
        histudy.
      </p>

      <div className="overflow-hidden" ref={containerRef}>
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} ref={i === index ? cardRef : null}>
              <TestimonialCard testimonial={t} isActive={i === index} />
            </div>
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
        <div className="w-50 h-1 bg-gray-200 rounded">
          <div
            className="h-full bg-[#1176C1] rounded transition-all duration-300"
            style={{
              width: `${((index + 1) / testimonials.length) * 100}%`,
            }}
          ></div>
        </div>
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
