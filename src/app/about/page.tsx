import Header from "../components/Header";
import ImpactSection from "../components/ImpactSection";
import JourneySection from "../components/JourneySection";
import Testimonials from "../components/Testimonials";
import React from "react";

const page = () => {
  return (
    <>
      <div className="about">
        <Header />
        <ImpactSection />
        <Testimonials />
        <JourneySection />
      </div>
    </>
  );
};

export default page;
