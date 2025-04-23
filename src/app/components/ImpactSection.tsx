import React from "react";
import Image from "next/image";
import images from "../../../public/assets/images/images";
const ImpactSection = () => {
  return (
    <section className="px-4 py-12 md:py-20 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Creating Impact Around The World</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        With our global catalog spanning the latest skills and topics, people and organizations everywhere are able to
        adapt to change and thrive.
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
        <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-md">
          <Image src={images.Impact} alt="Happy learner" className="object-cover w-full h-55" />
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-3">
          <div className="bg-red-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">500+</h3>
            <p className="text-sm text-gray-600">Learners & counting</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">800+</h3>
            <p className="text-sm text-gray-600">Courses & Video</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">100+</h3>
            <p className="text-sm text-gray-600">Registered Enrolls</p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">1000+</h3>
            <p className="text-sm text-gray-600">Certified Students</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
