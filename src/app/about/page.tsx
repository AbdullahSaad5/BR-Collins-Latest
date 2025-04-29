"use client"
import React, { useState, useRef, useEffect } from "react";
import "../../styles/header.css";
import Link from "next/link";
import Image from "next/image";
import AboutBgImage from '../../../public/assets/ourStoryImg.svg';
import axios from "axios";
import images from "../../../public/assets/images/images";
import { Quote } from "lucide-react";
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
  const containerRef = useRef(null);
  const [index, setIndex] = useState(2);
  const [translateX, setTranslateX] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const middleIndex = Math.floor((testimonials.length - 1) / 2);
      setIndex(middleIndex);
    }
  }, [testimonials]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current as HTMLDivElement;

    const timeout = setTimeout(() => {
      const card = container.children[index] as HTMLElement;
      if (card) {
        const containerWidth = container.offsetWidth;
        const cardWidth = card.offsetWidth;
        const cardOffsetLeft = card.offsetLeft;
        const centerPosition = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);
        setTranslateX(-centerPosition);
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [index, testimonials]);


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
      <div className="h-[580px] w-screen bg-cover bg-center bg-[url('/assets/images/header.jpeg')] flex justify-center items-center overlay-bg ">
  <div className="max-w-[1326px] w-full mx-auto px-1 max-[1334px]:px-4 flex justify-start items-center h-full">
    <div className="text-white flex flex-col items-start gap-5">
      <h2 className="text-lg md:text-5xl font-bold leading-snug">
        We Envision a World Where <br />
        Learning Transforms Lives, <br />
        Anywhere, Anytime.
      </h2>
      <Link
        href="/login"
        className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition text-lg md:text-md font-semibold"
      >
        Log In to Start
      </Link>
    </div>
  </div>
</div>

      <ImpactSection/>

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
            <div ref={containerRef} className="flex gap-6 transition-transform duration-500" style={{ transform: `translateX(${translateX}px)` }}>
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
      <section className="min-h-[120vh] max-w-[1326px] flex flex-col justify-center items-center gap-5 py-10 lg:px-5 px-2">
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
          <div className="w-full h-full flex flex-col justify-center items-center p-5 md:p-20 bg-[url('/assets/BAlphabetIcon.svg')] bg-no-repeat">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">Start Learning Today!</h3>
            <p className="mb-6 text-sm md:text-base text-center">
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
      className={`rounded-xl p-6 shadow-md transition-all duration-300 ease-in-out ${isActive ? "bg-[#1176C1] text-gray-50" : "bg-white text-gray-800"
        }2xl:h-[420px] xl:h-[420px] lg:h-[420px] md:h-[420px] sm:h-[400px] 2xl:w-[422px] xl:w-[422px] lg:w-[422px] md:w-[422px] sm:w-[400px] h-[350px] w-[350px] flex flex-col justify-between`}
    >
      <p className="text-5xl mb-3 text-start text-gray-700"><Quote /></p>
      <p className={`text-2xl font-semibold mb-auto text-start ${isActive ? "text-gray-50" : "text-gray-800"}`}>{testimonial.message}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="text-left">
            <p className= {`font-semibold ${isActive ? "text-gray-50" : "text-gray-800"}`}>{testimonial.name}</p>
            <p className= {`text-xs ${isActive ? "text-gray-50" : "text-gray-800"}`}>{testimonial.role}</p>
          </div>
        </div>
        <img src={testimonial.platformLogo} alt="Platform" className="w-6 h-6" />
      </div>
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section className="flex flex-col items-center justify-center py-12 md:py-20 bg-white text-center max-w-[1326px] px-2">
    <h2 className="text-2xl lg:text-5xl xl:text-6xl  md:text-4xl font-bold text-gray-900 mb-4">
      Creating Impact Around The World
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-10">
      With our global catalog spanning the latest skills and topics, people and organizations
      everywhere are able to adapt to change and thrive.
    </p>

    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full">
      <div className="2xl:w-[650px] xl:w-[520px] lg:w-[450px] md:w-100 w-full rounded-xl overflow-hidden shadow-md h-[350px]">
        <Image
          src={images.Impact}
          alt="Happy learner"
          className="object-cover w-full h-[350px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 2xl:w-[640px] xl:w-[600px] lg:w-[430px] md:w-90 w-full h-[350px]">
        <div className="bg-red-50 p-6 rounded-xl shadow-sm flex flex-col justify-center ">
          <h3 className="text-2xl 2xl:text-5xl xl:text-4xl md:text-3xl sm:text-2xl font-semibold text-gray-900 mb-2" >500+</h3>
          <p className="text-sm text-gray-600">Learners & counting</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm flex flex-col justify-center">
          <h3 className="text-2xl 2xl:text-5xl xl:text-4xl md:text-3xl sm:text-2xl font-semibold text-gray-900">800+</h3>
          <p className="text-sm text-gray-600">Courses & Video</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm flex flex-col justify-center">
          <h3 className="text-2xl 2xl:text-5xl xl:text-4xl md:text-3xl sm:text-2xl font-semibold text-gray-900">100+</h3>
          <p className="text-sm text-gray-600">Registered Enrolls</p>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow-sm flex flex-col justify-center">
          <h3 className="text-2xl 2xl:text-5xl xl:text-4xl md:text-3xl sm:text-2xl font-semibold text-gray-900">1000+</h3>
          <p className="text-sm text-gray-600">Certified Students</p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Page;

