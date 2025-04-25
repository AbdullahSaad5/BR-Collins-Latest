import React from "react";
import "../../../styles/header.css"; // Assuming you have a CSS file for styles
import Link from "next/link";
const Header = () => {
  return (
    <>
      <div className="header h-[550px] w-screen relative">
        <div className="absolute top-5 right-20 md:top-5 md:right-56 lg:top-5 lg:right-56 xl:top-5 xl:right-56 2xl:top-5 2xl:right-56 w-full h-full grid place-items-center px-3">
          <div className="text-white max-w-2xl space-y-6">
            <h2 className="text-lg md:text-4xl font-bold leading-snug">
              We Envision a World Where <br />
              Learning Transforms Lives,
              <br /> Anywhere, Anytime.
            </h2>
            <Link
              href="/login"
              className="bg-orange-500 text-white px-6 py-1 rounded-full hover:bg-orange-600 transition"
            >
              Login to Start
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
