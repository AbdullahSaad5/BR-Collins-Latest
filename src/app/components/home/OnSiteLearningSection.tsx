import React from "react";
import FeatureCard from "./FeatureCard";

const OnSiteLearningSection = () => (
  <section className="mx-auto p-2 md:p-4 xl:p-0 flex flex-col items-center text-gray-900 w-full">
    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full max-w-[1326px] px-1 md:px-4">
      {/* Content Column - Centered on medium, left on large */}
      <div className="w-full flex flex-col items-center lg:items-start lg:max-w-[529px] xl:max-w-[600px]">
        <div className="w-full flex flex-col items-center lg:items-start">
          <div className="flex flex-col items-center lg:items-start w-full font-bold">
            <span className="text-lg text-orange-500 uppercase">about us</span>
            <h2 className="mt-3 md:mt-5 text-3xl md:text-5xl leading-tight text-neutral-900 text-center lg:text-left">
              On Site Learning
            </h2>
          </div>
          <p className="mt-4 md:mt-5 text-lg md:text-2xl leading-6 md:leading-8 text-neutral-900 text-center lg:text-left">
            At B.R Collins, our on-site training transforms everyday lessons into engaging and interactive experiences.
            Blending creativity with expertise.
          </p>
        </div>
        <div className="mt-6 md:mt-10 w-full flex flex-col items-center lg:items-start">
          <FeatureCard
            title="Flexible Classes"
            description="It is a long established fact that a reader will be distracted by this on readable content of when looking at its layout."
            iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0142af754e70f9fb9b82869b1b20e4421b6f04e5?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
            className="w-full"
          />
          <FeatureCard
            title="Expert-Led Training"
            description="Learn from industry experts in a real-world setting and Gain practical knowledge and get hands-on experience."
            iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/fdae32a59490e8eef0a907659d5abbdfaaf27880?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
            className="mt-4 md:mt-5 w-full"
          />
        </div>
      </div>
      {/* Image - Centered on medium, right on large */}
      <div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ad81aa71094e8f17ed8df5001172ac5e3d12e12?placeholderIfAbsent=true&apiKey=46d0142291f54eac8dc073a4381485ca"
          className="object-contain rounded-2xl aspect-[0.93] w-full max-w-full lg:max-w-[600px] xl:max-w-[700px] mt-8 lg:mt-0 lg:flex-1"
          alt="On-site learning"
        />
      </div>
    </div>
  </section>
);

export default OnSiteLearningSection;
