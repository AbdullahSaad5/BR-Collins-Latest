import { Link } from "lucide-react";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumb = () => {
  return (
    <nav
      className="flex gap-1 items-end self-start text-base text-teal-950"
      aria-label="Breadcrumb"
    >
      <Link to="/">Home</Link>
      <FaChevronRight className="object-contain shrink-0 aspect-square w-[18px] text-teal-950" />
      <a href="/login">Login</a>
      <FaChevronRight className="object-contain shrink-0 aspect-square w-[18px] text-teal-950" />
      <span className="font-semibold text-sky-500">Student Dashboard</span>
    </nav>
  );
};

export default Breadcrumb;