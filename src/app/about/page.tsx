"use client"
import React, { useState, useRef, useEffect } from "react";
import "../../styles/header.css";
import Link from "next/link";
import Image from "next/image";
import images from "../../../public/assets/images/images";
import AboutBgImage from '../../../public/assets/ourStoryImg.svg';
import axios from "axios";

interface Testimonial {
  message: string;
  avatar: string;
  name: string;
  role: string;
  platformLogo: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const Page = () => {
  const [index, setIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data/reviews.json');
        if (response.data) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.log("Internal Server Error", error);
      }
    };

    fetchData();
  }, []);

  const prev = () => {
    setIndex((prevIndex) => prevIndex === 0 ? prevIndex : prevIndex - 1);
  };

  const next = () => {
    setIndex((prevIndex) => prevIndex === testimonials.length - 1 ? prevIndex : prevIndex + 1);
  };

  return (
    <div className="about flex flex-col justify-center items-center">

      {/* Header */}
      <div className="h-[580px] w-screen relative bg-cover bg-center bg-[url('/assets/images/header.jpeg')] flex justify-center items-center">
        <div className="text-white w-[85%] flex flex-col justify-start items-start gap-5">
          <h2 className="text-lg md:text-4xl font-bold leading-snug">
            We Envision a World Where <br />
            Learning Transforms Lives, <br /> Anywhere, Anytime.
          </h2>
          <Link href="/login" className="bg-orange-500 text-white px-6 py-1 rounded-full hover:bg-orange-600 transition text-sm md:text-md">
            Login to Start
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="bg-blue-50 py-12 text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What Our Learners Say
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10 text-sm">
            Learning communicates to the global world and builds a bright future with our history.
          </p>

          <div className="overflow-hidden w-full">
            <div className="flex gap-6 transition-transform duration-500 translate-x-5" style={{
              transform: `translateX(-${index * 5}%)`
            }}>
              {testimonials.map((t, i) => (
                <div key={i}>
                  <TestimonialCard testimonial={t} isActive={i === index} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100"
            >
              ←
            </button>
            <div className="w-50 h-1 bg-gray-200 rounded overflow-hidden relative">
              <div
                className="h-full bg-[#1176C1] rounded transition-all duration-300"
                style={{
                  width: `${Math.min(100, (index / (testimonials.length - 1)) * 100)}%`
                }}
              ></div>
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </section>
      )}

      {/* Journey Section */}
      <section className="h-[120vh] w-[85%] flex flex-col justify-center items-center gap-5 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="w-full md:w-1/2 h-full">
            <p className="text-orange-600 font-semibold mb-2">OUR STORY</p>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold mb-4 leading-snug">
              Our Journey: <br />
              Revolutionizing Education, <br />
              Empowering Learners
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              <strong>Established in 2024</strong>, B.R. Collins emerged from a vision to revolutionize online education.
              Recognizing the need for accessible, high-quality learning experiences, we set out to create a platform that
              combines expert training with real-world applicability.
            </p>
          </div>

          <div className="w-full md:w-1/2 h-full">
            <Image
              src={AboutBgImage}
              alt="ourStory_img"
              width={100}
              height={100}
              className="w-[100%] h-[100%]"
            />
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center bg-[#1176c1] text-white rounded-2xl overflow-hidden">
          <div className="w-full h-full flex flex-col justify-center items-center p-20 bg-[url('/assets/BAlphabetIcon.svg')] bg-no-repeat">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Start Learning Today!</h3>
            <p className="mb-6 text-sm md:text-base">
              At B.R. Collins, we believe in the transformative power of education.
            </p>
            <Link
              href="/login"
              className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full text-white font-semibold text-sm"
            >
              Log In To Start
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive }) => {
  return (
    <div
      className={`rounded-xl p-6 shadow-md transition-all duration-300 ease-in-out ${isActive ? "bg-blue-400 text-white" : "bg-white text-gray-800"
        } min-w-[250px] sm:min-w-[300px] md:min-w-[250px]`}
    >
      <p className="text-3xl mb-4">“</p>
      <p className="text-sm mb-6">{testimonial.message}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="text-left">
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-xs">{testimonial.role}</p>
          </div>
        </div>
        <img src={testimonial.platformLogo} alt="Platform" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Page;
