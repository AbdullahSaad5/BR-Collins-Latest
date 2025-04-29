"use client";
import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

import { Send, MapPin } from "lucide-react";
import Image from "next/image";

const QuickLinks = () => {
  return (
    <div className="grow  max-md:mt-10 font-sans">
      <h3 className="text-lg gap-3 font-medium text-white">Quick Links</h3>
      <nav className="flex gap-2 flex-col justify-center mt-8 w-full text-lg ">
        <a
          href="/course"
          className=" self-start whitespace-nowrap hover:text-white transition-colors"
        >
          Courses
        </a>
        <a
          href="/subscriptions"
          className=" self-start  whitespace-nowrap hover:text-white transition-colors"
        >
          Subscriptions
        </a>
        <a href="/about" className=" hover:text-white transition-colors">
          About
        </a>
        <a href="/contact" className=" hover:text-white transition-colors">
          Contact Us
        </a>
        <a href="/login" className=" hover:text-white transition-colors">
          Login & Register 
        </a>
      </nav>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="lg:min-h-[172px] h-auto font-sans max-md:mt-10">
      <h3 className="text-xl font-medium text-white">Get Contact</h3>
      <div className="flex flex-col mt-7 w-full">
        <div className="w-full ">
          <a
            href="tel:+14065550120"
            className="text-3xl font-semibold text-[#F86537] underline hover:text-orange-400 transition-colors"
          >
            (406) 555-0120
          </a>
          <a
            href="mailto:b.r.collins@example.com"
            className="block mt-5 text-lg underline font-medium text-[#A9BBC3] hover:text-white transition-colors"
          >
            b.r.collins@example.com
          </a>
        </div>
        <div className="flex gap-1.5 justify-center items-center self-start mt-5 text-base font-medium ">
          <MapPin className="w-5 h-5 text-blue-400" />
          <address className="gap-1 self-stretch my-auto not-italic hover:text-white transition-colors">
            North America, USA
          </address>
        </div>
      </div>
    </div>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="flex flex-col w-fit items-start self-start mt-2 font-sans text-lg max-md:max-w-full">
      <h3 className="text-xl font-medium text-white">Join the Community</h3>
      <p className="mt-4 text-[A9BBC3]">
        2,000+ Students Globally – Connect & Say Hello!
      </p>
      <form
        onSubmit={handleSubmit}
        className="md:w-full my-4 flex flex-row justify-center md:justify-between gap-2"
      >
        <div className="border-1 bg-[#16313F] border-gray-600 w-fit flex flex-row  rounded-4xl p-1">
          <input
            type="text"
            className="border-none md:w-[473px]  bg-transparent focus:outline-0 text-gray-400 p-[6px] px-5  placeholder-gray-400 rounded-4xl"
            name="input"
            placeholder="Email Address"
          />
        </div>
        <div className="rounded-full text-white bg-[#ff6900]">
          <FaTelegramPlane className=" w-[58px] h-[58px] p-4" />
        </div>
      </form>
    </div>
  );
};

const SocialIcon = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <a
    href="#"
    aria-label={label}
    className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
  >
    <Icon className="w-5 h-5 text-white" />
  </a>
);

const Footer = () => {
  return (
    <footer className="flex flex-col items-center px-20 pt-20 pb-8 w-full text-[#A9BBC3] h-auto lg:h-[575px] bg-[#081B25] max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1326px] max-md:max-w-full">
        <div className="flex flex-wrap justify-between max-w-full w-full">
          <div className="flex-auto max-md:max-w-full">
            <div className="flex gap-20 max-md:flex-col">
              <div className="w-fit max-md:ml-0 max-md:w-full">
                <QuickLinks />
              </div>
              <div className=" w-fit max-md:ml-0 max-md:w-full">
                <ContactInfo />
              </div>
            </div>
          </div>
          <Newsletter />
        </div>

        <hr className="shrink-0 mt-10 h-px border border-solid border-gray-800 border-opacity-10 max-md:max-w-full" />

        <div className="flex justify-between flex-wrap mt-8 w-full max-md:max-w-full">
          <div>
            {/* Left Block - Fixed Width */}
            <Image
              src="/assets/lowerlogo.png"
              width={100}
              height={100}
              alt="Logo"
              className="object-cover w-[274px]"
            />
          </div>

          {/* Right Block - Fills Remaining Space */}
          <div className="flex flex-1 justify-end w-fit  gap-4 items-center  min-h-[52px]">
            <div className="w-12 h-12  text-gray-400 bg-[#16313f] rounded-full "><FaFacebookF className="w-12 h-12 p-3 "  /></div>
            <div className="w-12 h-12  text-gray-400 bg-[#16313f] rounded-full "><BsTwitterX className="w-12 h-12 p-3 "  /></div>
            <div className="w-12 h-12  text-gray-400 bg-[#16313f] rounded-full "><FaLinkedinIn className="w-12 h-12 p-3 "  /></div>
            <div className="w-12 h-12  text-gray-400 bg-[#16313f] rounded-full "><FaInstagram className="w-12 h-12 p-3 "  /></div>
            
            
          </div>
        </div>

        <hr className="shrink-0 mt-8 h-px border border-solid border-gray-800 border-opacity-10 max-md:max-w-full" />

        <div className="flex flex-wrap gap-5 justify-between mt-12 w-full text-base text-[#22485c] max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-wrap gap-5 items-center min-h-[21px] max-md:max-w-full">
            <p className="self-stretch my-auto">
              Copyright © 2025 B.R. Collins All Rights Reserved
            </p>
            <div className="flex gap-3 items-center self-stretch my-auto font-semibold text-right underline min-w-60">
              <a
                href="#"
                className="self-stretch my-auto hover:text-white transition-colors"
              >
                Terms of service
              </a>
              <a
                href="#"
                className="self-stretch my-auto hover:text-white transition-colors"
              >
                Privacy policy
              </a>
            </div>
          </div>
          <p className="font-medium text-right">
            <span className="font-normal">Design and Developed by </span>
            <a
              href="#"
              className="font-normal underline hover:text-white transition-colors"
            >
              Agency Partner Interactive
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
