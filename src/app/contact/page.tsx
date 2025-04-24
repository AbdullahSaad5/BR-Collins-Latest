import React from "react";

const ContactUs: React.FC = () => {
  return (
    <section className="w-full py-10 px-4 md:px-8 lg:px-0">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Section - Contact Info */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2 justify-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Get in Touch with Us
            </h1>
            <p className="text-gray-600">
              The quickest way to get in touch with us is by using the contact information below.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-gray-800">
            <div className="flex flex-col gap-1">
              <h2 className="font-medium">Phone:</h2>
              <p className="font-bold">(406) 555-0120</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-medium">Email:</h2>
              <p className="underline text-blue-500">brcollins@brcollins.com</p>
            </div>
          </div>

          <div className="w-full">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256018566!2d-73.987844924525!3d40.74844097192396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTkuMyJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="300"
              className="rounded-2xl border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10 shadow-xl rounded-xl">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
            Get a Free Course - Contact Us
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Fill out the form below and we'll send you a free course sample.
          </p>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <input
              type="text"
              id="subject"
              placeholder="Subject"
              className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />

            <textarea
              id="message"
              rows={4}
              placeholder="Your message"
              className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-orange-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
