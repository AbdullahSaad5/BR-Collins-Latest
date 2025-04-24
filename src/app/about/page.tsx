import Header from "../components/AboutComp/Header";
import ImpactSection from "../components/AboutComp/ImpactSection";
import JourneySection from "../components/AboutComp/JourneySection";
import Testimonials from "../components/AboutComp/Testimonials";
import React from "react";

const page = () => {
  return (
    <>
      <div className="about pt-5">
        <Header />
        <ImpactSection />
        <Testimonials />
        <JourneySection />
      </div>
    </>
  );
};

export default page;
