import React from "react";
import "../../styles/header.css"; // Assuming you have a CSS file for styles
const Header = () => {
  return (
    <>
      <div className="header h-[550px] w-screen relative">
        <div className="absolute top-5 right-53 w-full h-full grid place-items-center px-3">
          <div className="text-white max-w-2xl space-y-6">
            <h2 className="text-lg md:text-4xl font-bold leading-snug">
              We Envision a World Where <br />
              Learning Transforms Lives,
              <br /> Anywhere, Anytime.
            </h2>
            <button className="bg-orange-500 text-white px-6 py-1 rounded-full hover:bg-orange-600 transition">
              Login to Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
