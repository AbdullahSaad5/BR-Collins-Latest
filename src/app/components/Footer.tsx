import { Send, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const socialIcons = [{ Icon: Facebook }, { Icon: Twitter }, { Icon: Linkedin }, { Icon: Instagram }];

const footerLinks = ["Courses", "Subscriptions", "About", "Contact Us", "Login & Register"];

export default function Footer() {
  return (
    <footer className="bg-[#0D1B22] text-white px-6 sm:px-10 md:px-20 lg:px-[120px] py-10 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:mr-20 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {footerLinks.map((link, idx) => (
                  <li key={idx}>{link}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Get Contact</h4>
              <p className="text-orange-400 font-semibold text-xl">(406) 555-0120</p>
              <p className="text-sm text-gray-300 mt-1">b.r.collins@example.com</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
                <span>North America, USA</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Join the Community</h4>
            <p className="text-sm text-gray-300 mb-3">2,000+ Students Globally – Connect & Say Hello!</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-[#1C2C34] flex-1 px-4 py-3 text-sm text-white outline-none rounded-full w-full sm:w-auto"
              />
              <button className="bg-orange-500 p-3 rounded-full self-start sm:self-auto">
                <Send className="text-white text-[25px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-gray-600" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4 text-center">
          <div>
            <p>Copyright © 2025 B.R. Collins All Rights Reserved</p>
            <p className="mt-1">
              <a href="#" className="underline text-gray-300">
                Terms Of Service
              </a>
              <a href="#" className="underline text-gray-300 ml-2">
                Privacy Policy
              </a>
              <a href="/dashboard" className="underline text-gray-300 ml-2">
                Dashboard
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-3 flex-wrap justify-center md:justify-end">
              {socialIcons.map(({ Icon }, idx) => (
                <Icon
                  key={idx}
                  className="text-[#85AABA] text-xl"
                  style={{
                    backgroundColor: "#0F2B39",
                    borderRadius: "9999px",
                    padding: "12px",
                    width: "45px",
                    height: "45px",
                  }}
                />
              ))}
            </div>
            <p>
              Design and Developed by{" "}
              <a href="#" className="text-gray-300 underline">
                Abdul Rehman
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
