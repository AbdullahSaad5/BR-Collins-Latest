import React from "react";
import images from "../../../../public/assets/images/images";
import Image from "next/image";
import colors from "../../../../public/assets/colors/colors";
const JourneySection = () => {
  return (
    <section className="py-12 md:py-20 px-4 mx-auto w-full max-w-[1350px]">
      <div className="grid md:grid-cols-2 sm:gap-2 md:gap-2 lg:gap-8 xl:gap-8 gap-1 px-2 items-center w-full">
        <div className="">
          <p className="text-orange-600 font-semibold mb-2">OUR STORY</p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold mb-4 leading-snug">
            Our Journey: <br />
            Revolutionizing Education, <br />
            Empowering Learners
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            <strong>Established in 2024</strong>, B.R. Collins emerged from a vision to revolutionize online education.
            Recognizing the need for accessible, high-quality learning experiences, we set out to create a platform that
            combines expert training with real-world applicability.
          </p>
        </div>

        <div className="relative w-full h-56 md:h-64 flex justify-center md:justify-end 2xl:w-[1350px] xl:w-[1326px] lg:w-[1200px] md:w-[900px]">
          <Image
            src={images.Journey2}
            alt="Student 1"
            className="w-40 h-40 md:w-48 md:h-45 object-cover rounded-xl shadow-lg z-10 absolute xl:top-30 xl:right-[52%] lg:top-30 lg:right-[52%] md:top-40 md:right-[55%] sm:top-30 sm:right-[52%]   right-[22%] top-33"
          />

          <Image
            src={images.Journey1}
            alt="Student 2"
            className="w-40 h-40 md:w-48 md:h-50 object-cover rounded-xl shadow-lg absolute xl:top-0 xl:left-80 lg:top-0 lg:left-80 md:top-0 md:left-20 sm:top-0 sm:left-80 z-20 left-20"
          />
        </div>
      </div>

      <div
        className="mt-20 text-white rounded-xl p-10 text-center relative overflow-hidden 2xl:w-[1350px] xl:w-[1326px] lg:w-[1200px] md:w-[900px] w-full m-2"
        style={{ backgroundColor: colors.blue }}
      >
        <div
          className="absolute inset-0 opacity-10 bg-no-repeat bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          }}
        ></div>
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Start Learning Today!</h3>
          <p className="mb-6 text-sm md:text-base">
            At B.R. Collins, we believe in the transformative power of education.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full text-white font-semibold text-sm">
            Log In To Start
          </button>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
