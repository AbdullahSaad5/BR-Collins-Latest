import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import Image from "next/image"; // If not using Next.js, replace with regular <img />
import loginimage from "../../../public/img/login/loginimage.png";
import B from "../../../public/img/login/Bb.png";
import logo from "../../../public/img/login/lowerlogo.png";
import { IoArrowBackOutline } from "react-icons/io5";

import Link from "next/link"; // If using react-router-dom, import from "react-router-dom"

const Login: React.FC = () => {
  return (
    <section className="">
      <div className="flex flex-col lg:flex-row w-full bg-org">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 bg-[#0365AD] text-white relative py-12 lg:py-0">
          <div className="absolute bottom-0 w-full lg:w-[712px]">
            <Image
              src={B}
              alt="Decorative background"
              className="w-full h-auto"
            />
          </div>

          <div className="relative z-10 w-full px-6 lg:w-[630px] mx-auto flex flex-col gap-8 justify-center items-start min-h-[600px] lg:min-h-[700px]">
            <div className="w-12 h-12 rounded-full bg-[#3584BD] flex items-center justify-center">
              <IoArrowBackOutline className="w-7 h-7 text-white" />
            </div>
            <div>
              <Image src={logo} alt="Logo" className="h-10 w-auto" />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-bold font-hanken text-white">
                Sign in to your account
              </h1>
              <p>
                Build skills for today, tomorrow, and beyond. Education to
                future-proof your career.
              </p>
              <p className="text-gray-300">
                Asterisks (<span className="text-org font-bold">*</span>)
                indicate required fields.
              </p>
            </div>

            {/* Form */}
            <form className="w-full flex flex-col gap-3 space-y-4">
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="Email*"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-400 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-org"
                />
                <input
                  type="password"
                  required
                  placeholder="Password*"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-400 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-org"
                />
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex items-center gap-3 cursor-pointer group">
                  {/* Custom checkbox container */}
                  <div className="relative">
                    {/* Hidden original checkbox */}
                    <input
                      type="checkbox"
                      className="absolute opacity-0 h-0 w-0 peer"
                    />

                    {/* Custom checkbox design */}
                    <div
                      className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center
                   transition-all duration-200
                   group-hover:border-blue-500
                   peer-checked:bg-blue-500 peer-checked:border-blue-500"
                    >
                      {/* Checkmark icon (only visible when checked) */}
                      <svg
                        className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M3 10L8 15L17 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Label with subtle hover effect */}
                  <span className="text-gray-100 font-light transition-colors group-hover:text-gray-900">
                    Remember me
                  </span>
                </div>
                <div>
                  <h2 className="underline font-light">
                    Forgot your password?
                  </h2>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="bg-org text-white gap-2 items-center flex flex-row py-3 px-6 rounded-full font-base hover:bg-opacity-90 w-fit transition-colors"
              >
                Login{" "}
                <span>
                  <IoMdArrowForward className="flex flex-row items-center justify-center my-auto" />
                </span>
              </Link>
            </form>

            <p className="text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-org underline">
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:block lg:w-1/3">
          <Image
            src={loginimage}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
