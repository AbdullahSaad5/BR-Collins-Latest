"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Mock API call
const mockSubmitForm = async (data: IFormInputs): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 2000); // 2 seconds delay to simulate API call
  });
};

const ContactUs: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const result = await mockSubmitForm(data);
      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        reset(); // Reset form after successful submission
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <section className="w-full bg-[#edf7fc] py-20 px-4 md:px-8 lg:px-0 ">
        <div className="max-w-[1326px] mx-auto flex flex-col lg:flex-row gap-10 lg:px-3 px-4">
          {/* Left Section - Contact Info */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2 justify-center ">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Get in Touch with Us</h1>
              <p className="text-gray-600 mt-1">
                The quickest way to get in touch with us is by using the contact information below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 text-gray-800 md:mt-6">
              <div className="flex flex-col gap-1">
                <h2 className="font-medium">Phone:</h2>
                <p className="font-bold">(406) 555-0120</p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-medium">Email:</h2>
                <p className="underline text-blue-500">brcollins@brcollins.com</p>
              </div>
            </div>

            <div className="w-full md:mt-4">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256018566!2d-73.987844924525!3d40.74844097192396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTkuMyJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="300"
                className="rounded-3xl border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10 shadow-xl rounded-xl ">
            <h2 className="text-2xl font-bold text-center text-gray-800 my-8">
              Get a Free Course You Can Contact With Us
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Your name"
                  {...register("name", { required: "Name is required" })}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  placeholder="Your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                />
                {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <textarea
                  rows={4}
                  placeholder="Your message"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 px-6 rounded-full font-bold hover:bg-primary-hover transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
