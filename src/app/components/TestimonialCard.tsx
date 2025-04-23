import React from "react";
interface Testimonial {
  message: string;
  avatar: string;
  name: string;
  role: string;
  platformLogo: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive }) => {
  return (
    <div
      className={`rounded-xl p-6 shadow-md transition-all duration-300 ease-in-out ${
        isActive ? "bg-blue-400 text-white" : "bg-white text-gray-800"
      } min-w-[250px] sm:min-w-[300px] md:min-w-[250px]`}
    >
      <p className="text-3xl mb-4">“</p>
      <p className="text-sm mb-6">{testimonial.message}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{testimonial.name}</p>
            <p className="text-xs">{testimonial.role}</p>
          </div>
        </div>
        <img src={testimonial.platformLogo} alt="Platform" className="h-4" />
      </div>
    </div>
  );
};

export default TestimonialCard;
