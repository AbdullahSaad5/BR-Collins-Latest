// import { IoLocationSharp } from "react-icons/io5";
import { Send, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0D1B22] text-white px-[10px] sm:px-[120px] py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-cols-2 md:mr-[100px]">
            <div>
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>Courses</li>
                  <li>Subscriptions</li>
                  <li>About</li>
                  <li>Contact Us</li>
                  <li>Login & Registerdd</li>
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Get Contact</h4>
                <p className="text-orange-400 font-semibold text-xl">
                  (406) 555-0120
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  b.r.collins@example.com
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
                  {/* <IoLocationSharp className="text-lg" /> */}
                  <span>North America, USA</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Join the Community</h4>
            <p className="text-sm text-gray-300 mb-3">
              2,000+ Students Globally – Connect & Say Hello!
            </p>
            <div className="flex items-center py-3">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-[#1C2C34] flex-1 px-4 py-3 text-sm text-white outline-none rounded-full"
              />
              <button className="bg-orange-500 p-3 mx-5 rounded-full">
                <Send className="text-white text-[25px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-gray-600 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-3"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-sm text-gray-400 gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p>Copyright © 2025 B.R. Collins All Rights Reserved</p>
            <p>
              <a href="#" className="underline text-gray-300">
                Terms Of Service
              </a>{" "}
              <a href="#" className="underline text-gray-300 ml-2">
                Privacy Policy
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-3">
              <Facebook
                className="text-[#85AABA] text-xl"
                style={{
                  backgroundColor: "#0F2B39",
                  borderRadius: "9999px",
                  padding: "12px",
                  width: "45px",
                  height: "45px",
                }}
              />
              <Twitter
                className="text-[#85AABA] text-xl"
                style={{
                  backgroundColor: "#0F2B39",
                  borderRadius: "9999px",
                  padding: "12px",
                  width: "45px",
                  height: "45px",
                }}
              />
              <Linkedin
                className="text-[#85AABA] text-xl"
                style={{
                  backgroundColor: "#0F2B39",
                  borderRadius: "9999px",
                  padding: "12px",
                  width: "45px",
                  height: "45px",
                }}
              />
              <Instagram
                className="text-[#85AABA] text-xl"
                style={{
                  backgroundColor: "#0F2B39",
                  borderRadius: "9999px",
                  padding: "12px",
                  width: "45px",
                  height: "45px",
                }}
              />
            </div>
            <p>
              Design and Developed by{" "}
              <a href="#" className="text-gray-300 underline">
                Muhammad Naeem
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
