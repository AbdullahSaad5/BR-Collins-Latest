"use client";
import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";


import {
  Send,
  MapPin,
  
} from "lucide-react";
import Image from "next/image";

const QuickLinks = () => {
  return (
    <div className="grow min-h-[235px] max-md:mt-10">
      <h3 className="text-lg gap-3 font-medium text-white">Quick Links</h3>
      <nav className="flex gap-2 flex-col justify-center mt-8 w-full text-lg text-slate-400">
        <a
          href="#"
          className=" self-start whitespace-nowrap hover:text-white transition-colors"
        >
          Courses
        </a>
        <a
          href="#"
          className=" self-start  whitespace-nowrap hover:text-white transition-colors"
        >
          Subscriptions
        </a>
        <a href="#" className=" hover:text-white transition-colors">
          About
        </a>
        <a href="#" className=" hover:text-white transition-colors">
          Contact Us
        </a>
        <a href="#" className=" hover:text-white transition-colors">
          Login & Register dd
        </a>
      </nav>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="min-h-[172px] max-md:mt-10">
      <h3 className="text-xl font-medium text-white">Get Contact</h3>
      <div className="flex flex-col mt-7 w-full">
        <div className="w-full ">
          <a
            href="tel:+14065550120"
            className="text-3xl font-semibold text-orange-500 underline hover:text-orange-400 transition-colors"
          >
            (406) 555-0120
          </a>
          <a
            href="mailto:b.r.collins@example.com"
            className="block mt-5 text-lg underline font-medium text-slate-400 hover:text-white transition-colors"
          >
            b.r.collins@example.com
          </a>
        </div>
        <div className="flex gap-1.5 justify-center items-center self-start mt-5 text-base font-medium text-slate-400">
          <MapPin className="w-5 h-5 text-slate-400" />
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
    <div className="flex flex-col items-start self-start mt-2 text-lg max-md:max-w-full">
      <h3 className="text-xl font-medium text-white">Join the Community</h3>
      <p className="mt-4 text-slate-400">
        2,000+ Students Globally – Connect & Say Hello!
      </p>
      <form onSubmit={handleSubmit} className="w-full my-4 flex flex-row justify-between gap-2">
        <div className="border-1 bg-[#16313F] border-gray-600 w-full flex flex-row  rounded-4xl p-1">
          <input
            type="text"
            className="border-none bg-transparent focus:outline-0 text-gray-400 p-[6px] px-5 w-full placeholder-gray-400 rounded-4xl"
            name="input"
            placeholder="Email Address"
          />
        </div>
        <div className="rounded-full text-white bg-[#ff6900]">
          <FaTelegramPlane className=" w-12 h-12 p-2" />
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
    <footer className="flex flex-col items-center px-20 pt-20 pb-8 w-full bg-neutral-900 max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1326px] max-md:max-w-full">
        <div className="flex flex-wrap gap-10 max-w-full w-full">
          <div className="flex-auto max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="w-[38%] max-md:ml-0 max-md:w-full">
                <QuickLinks />
              </div>
              <div className="ml-5 w-[62%] max-md:ml-0 max-md:w-full">
                <ContactInfo />
              </div>
            </div>
          </div>
          <Newsletter />
        </div>

        <hr className="shrink-0 mt-10 h-px border border-solid border-gray-600 border-opacity-10 max-md:max-w-full" />

        <div className="flex justify-between flex-wrap mt-8 w-full max-md:max-w-full">
          {/* Left Block - Fixed Width */}
          <Image
            src="/assets/lowerlogo.png"
            width={120}
            height={60}
            alt="Logo"
            className="object-contain"
          />

          {/* Right Block - Fills Remaining Space */}
          <div className="flex flex-1 justify-end gap-4 items-center min-h-[52px]">
            <FaFacebookF className=" w-12 h-12 p-2 text-gray-500 bg-gray-800 rounded-full"  />
            <BsTwitterX className=" w-12 h-12 p-2 text-gray-500 bg-gray-800 rounded-full"  />
            <FaLinkedinIn className=" w-12 h-12 p-2 text-gray-500 bg-gray-800 rounded-full"  />
            < FaInstagram className=" w-12 h-12 p-2 text-gray-500 bg-gray-800 rounded-full"  />

          </div>
        </div>

        <hr className="shrink-0 mt-8 h-px border border-solid border-gray-600 border-opacity-10 max-md:max-w-full" />

        <div className="flex flex-wrap gap-5 justify-between mt-12 w-full text-base text-slate-500 max-md:mt-10 max-md:max-w-full">
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
