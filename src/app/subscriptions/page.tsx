"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import Link from "next/link";

const faqs = [
  {
    question: "What's included in the Corporate Subscription plans?",
    answer:
      "Corporate subscriptions give shared access to our full course library for your team. Choose from 10, 20, or 50-user plans, with custom learning dashboards and centralized team management.",
  },
  {
    question: "Can we upgrade our Corporate Plan later?",
    answer:
      "Corporate subscriptions give shared access to our full course library for your team. Choose from 10, 20, or 50-user plans, with custom learning dashboards and centralized team management.",
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer:
      "Corporate subscriptions give shared access to our full course library for your team. Choose from 10, 20, or 50-user plans, with custom learning dashboards and centralized team management.",
  },
  {
    question: "Is there any trial available before I buy?",
    answer:
      "Corporate subscriptions give shared access to our full course library for your team. Choose from 10, 20, or 50-user plans, with custom learning dashboards and centralized team management.",
  },
  {
    question: "Is there any trial available before I buy?",
    answer:
      "Corporate subscriptions give shared access to our full course library for your team. Choose from 10, 20, or 50-user plans, with custom learning dashboards and centralized team management.",
  },
];

const Subcription = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <section className="bg-[#E3F4FC] text-gray-900">
        <div className="w-full px-[10px] xl:px-[1px] lg:px-[10px] md:px-[20px] mx-auto max-w-[1326px] py-10 md:py-14">
          <div className="flex flex-col justify-center items-center text-center mb-6">
            <h1 className="text-gray-900 font-hanken md:text-5xl text-3xl font-bold lg:mt-8">
              Flexible Pricing for Individuals and Teams
            </h1>
            <p className="my-4 text-gray-600 text-lg md:text-xl max-w-[795px] mx-auto leading-normal">
              Whether you're an individual looking to upskill or a company building stronger teams — we've got you
              covered.
            </p>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-6 h-auto lg:h-[444px]">
            {/* Left Column - Individual Plans */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 h-auto">
              <div className="flex flex-row h-full justify-between">
                <div className="bg-white border-1 border-gray-300  rounded-lg w-full  p-6  flex flex-row justify-between mr-auto">
                  <div className="flex flex-col justify-between  w-1/2">
                    <div>
                      <h1 className="text-xl font-bold text-black mb-2">Individual Courses</h1>
                      <p className="text-gray-700">Take Any Course for Just $99 – One-Time Payment, Lifetime Access!</p>
                    </div>
                    <Link href="/course" className="bg-[#F86537]  text-white py-2 px-6 rounded-4xl self-start">
                      Buy Now
                    </Link>
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
                    <div className="flex flex-col items-end">
                      <h1 className="text-white text-sm uppercase bg-blue-500 w-fit rounded-lg px-2 py-1 self-end mb-2">
                        One-Time Payment
                      </h1>
                    </div>
                    <div>
                      <h2 className="text-6xl font-bold flex items-end flex-col">$99</h2>
                      <p className="flex items-end flex-col">per course</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row h-full justify-between">
                <div className="bg-white border-1 border-gray-300 rounded-lg w-full  p-6  flex flex-row justify-between mr-auto">
                  <div className="flex flex-col justify-between  w-1/2">
                    <div>
                      <h1 className="text-xl font-bold text-black mb-2">Individual Courses</h1>
                      <p className="text-gray-700">Take Any Course for Just $99 – One-Time Payment, Lifetime Access!</p>
                    </div>
                    <button className="bg-[#F86537]  text-white py-2 px-6 rounded-4xl self-start">Buy Now</button>
                  </div>
                  <div className="flex flex-col justify-between w-1/2">
                    <div className="flex flex-col items-end">
                      <h1 className="text-white text-sm uppercase bg-blue-500 w-fit rounded-lg px-2 py-1 self-end mb-2">
                        Yearly
                      </h1>
                    </div>
                    <div>
                      <h2 className="text-6xl font-bold flex items-end flex-col">$199</h2>
                      <p className="flex items-end flex-col">All Courses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Corporate Plans */}
            <div className="w-full lg:w-1/2 bg-white border border-gray-300 rounded-lg p-6 flex flex-col justify-between h-auto lg:h-full">
              <div>
                <h1 className="text-2xl font-bold text-black mb-2">Corporate Subscriptions</h1>
                <p className="text-gray-700 mb-4">
                  Choose from 10, 20, or 50-user plans designed for organizations that value continuous development.
                </p>
                <ul className="space-y-2">
                  <li className="flex py-2 items-center">
                    <div className="flex flex-row w-full justify-between">
                      <div>
                        <h1 className="text-4xl font-bold">$1990</h1>
                      </div>
                      <div className="flex items-center w-1/3 md:w-1/5 justify-between flex-row">
                        <h2>10 users</h2>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" name="checkbox" className="peer hidden" />
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300 p-2 flex items-center justify-center peer-checked:bg-[#F86537] peer-checked:border-[#F86537] transition">
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
                        </label>
                      </div>
                    </div>
                  </li>
                  <hr className="border-gray-200" />
                  <li className="flex py-2 items-center">
                    <div className="flex flex-row w-full justify-between">
                      <div>
                        <h1 className="text-4xl font-bold">$1990</h1>
                      </div>
                      <div className="flex items-center w-1/3 md:w-1/5 justify-between flex-row">
                        <h2>20 users</h2>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" name="checkbox" className="peer hidden" />
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300 p-2 flex items-center justify-center peer-checked:bg-[#F86537] peer-checked:border-[#F86537] transition">
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
                        </label>
                      </div>
                    </div>
                  </li>
                  <hr className="border-gray-200" />
                  <li className="flex py-2 items-center">
                    <div className="flex flex-row w-full justify-between">
                      <div>
                        <h1 className="text-4xl font-bold">$1990</h1>
                      </div>
                      <div className="flex items-center w-1/3 md:w-1/5 justify-between flex-row">
                        <h2>50 users</h2>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" name="checkbox" className="peer hidden" />
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300 p-2 flex items-center justify-center peer-checked:bg-[#F86537] peer-checked:border-[#F86537] transition">
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
                        </label>
                      </div>
                    </div>
                  </li>
                  <hr className="border-gray-200" />
                </ul>
              </div>
              <button className="bg-[#F86537] text-white py-2 px-6 rounded-full w-full">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <div className="contanier px-[10px] xl:px-[100px] lg:px-[50px] md:px-[20px]">
        <div className="w-full px-4 md:px-16 py-16 bg-white text-black">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div>
              <p className="text-lg text-orange-600 font-semibold uppercase mb-2">Have a question with B.R Collins?</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                A Few Frequently <br /> Asked Questions
              </h1>
              <h3 className="text-lg font-medium mb-2">
                Didn’t find the answer you’re <br /> looking for?
              </h3>
              <p className="text-base">
                email us directly at{" "}
                <a href="mailto:b.r.collins@example.com" className="text-blue-600 underline">
                  b.r.collins@example.com
                </a>
              </p>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="border-b border-gray-300 pb-4 cursor-pointer"
                    onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-base text-lg md:text-xl font-semibold">{faq.question}</h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    {isOpen && faq.answer && <p className="text-lg text-gray-700 mt-3">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      \
    </>
  );
};

export default Subcription;
