import React from "react";
import Image from "next/image"; // If not using Next.js, replace with regular <img />
import loginimage from "../../../public/img/login/loginimage.png";
import B from "../../../public/img/login/Bb.png";
import logo from "../../../public/img/login/lowerlogo.png";
import Link from "next/link"; // If using react-router-dom, import from "react-router-dom"

const Login: React.FC = () => {
  return (
    <section className="">
      <div className="flex flex-col lg:flex-row w-full bg-org">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 bg-[#0365AD] text-white relative py-12 lg:py-0">
          <div className="absolute bottom-0 w-full lg:w-[712px]">
            <Image src={B} alt="Decorative background" className="w-full h-auto" />
          </div>

          <div className="relative z-10 w-full px-6 lg:w-[630px] mx-auto flex flex-col gap-8 justify-center items-start min-h-[600px] lg:min-h-[700px]">
            <div>
              <Image src={logo} alt="Logo" className="h-10 w-auto" />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-bold font-hanken text-white">Sign in to your account</h1>
              <p>Build skills for today, tomorrow, and beyond. Education to future-proof your career.</p>
              <p className="text-gray-300">
                Asterisks (<span className="text-org font-bold">*</span>) indicate required fields.
              </p>
            </div>

            {/* Form */}
            <form className="w-full space-y-4">
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
              <Link
                href="/dashboard"
                className="bg-org text-white py-3 px-6 rounded-full font-bold hover:bg-opacity-90 transition-colors"
              >
                Login
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
          <Image src={loginimage} alt="Login" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Login;
