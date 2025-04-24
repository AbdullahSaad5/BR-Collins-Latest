// components/Register.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import loginimage from '../../../public/img/login/loginimage.png';
import B from '../../../public/img/login/Bb.png';
import logo from '../../../public/img/login/lowerlogo.png';
import Link from 'next/link';

const Register: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'org' | null>(null);

  return (
    <section className="">
      <div className="flex flex-col lg:flex-row w-full bg-org">
        {/* Left Side */}
        <div className="w-full lg:w-2/3 bg-[#0365AD] text-white relative py-12 lg:py-0">
          <div className="absolute bottom-0 w-full lg:w-[712px]">
            <Image src={B} alt="Decorative background element" className="w-full" />
          </div>
          <div className="w-full px-6 lg:w-[630px] mx-auto flex flex-col gap-8 justify-center items-start lg:h-[700px] relative z-10">
            <div>
              <Image src={logo} alt="Company logo" className="h-10 w-auto" />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-bold font-hanken text-white">
                Register Your Account
              </h1>
              <p className="text-gray-300">
                Asterisks (<span className="text-org font-bold">*</span>) indicate required fields.
              </p>
            </div>

            {/* User Type Selection */}
            <div className="w-full">
              <h2 className="text-white mb-4">Select User Type <span className="text-org">*</span></h2>
              <div className="flex flex-wrap gap-6">
                {(['student', 'org'] as const).map((type) => (
                  <label key={type} className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      checked={userType === type}
                      onChange={() => setUserType(type)}
                      className="peer hidden"
                    />
                    <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:bg-org peer-checked:border-org transition-colors">
                      <svg
                        className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="ml-2 text-white capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <form className="w-full space-y-4">
              <div className="flex flex-col lg:flex-row gap-3 w-full">
                <input
                  type="text"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-org"
                  placeholder="Enter your first name"
                />
                <input
                  type="text"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-org"
                  placeholder="Enter your last name"
                />
              </div>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-org"
                placeholder="Enter your email"
              />
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-org"
                placeholder="Create a password"
              />
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-org"
                placeholder="Confirm your password"
              />
              <button
                type="submit"
                className="bg-org text-white py-3 px-6 rounded-full font-bold hover:bg-opacity-90 transition-colors"
              >
                Register
              </button>
            </form>

            <p className="text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-org underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="hidden lg:block lg:w-1/3">
          <Image
            src={loginimage}
            alt="Login illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
