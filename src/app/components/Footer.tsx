// import { Send, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
// import Link from "next/link";

// const socialIcons = [{ Icon: Facebook }, { Icon: Twitter }, { Icon: Linkedin }, { Icon: Instagram }];

// const footerLinks = ["Courses", "Subscriptions", "About", "Contact Us", "Login & Register"];

// export default function Footer() {
//   return (
//     <footer className="bg-[#0D1B22] text-white px-6 sm:px-10 md:px-20 lg:px-[120px] py-10 mt-24">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:mr-20 gap-8">
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//               <ul className="space-y-1 text-sm text-gray-300">
//                 {footerLinks.map((link, idx) => (
//                   <li key={idx}>{link}</li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-lg font-semibold mb-4">Get Contact</h4>
//               <p className="text-orange-400 font-semibold text-xl">(406) 555-0120</p>
//               <p className="text-sm text-gray-300 mt-1">b.r.collins@example.com</p>
//               <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
//                 <span>North America, USA</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold mb-4">Join the Community</h4>
//             <p className="text-sm text-gray-300 mb-3">2,000+ Students Globally – Connect & Say Hello!</p>
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="bg-[#1C2C34] flex-1 px-4 py-3 text-sm text-white outline-none rounded-full w-full sm:w-auto"
//               />
//               <button className="bg-orange-500 p-3 rounded-full self-start sm:self-auto">
//                 <Send className="text-white text-[25px]" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="my-10 border-t border-gray-600" />

//         <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4 text-center">
//           <div>
//             <p>Copyright © 2025 B.R. Collins All Rights Reserved</p>
//             <p className="mt-1">
//               <a href="#" className="underline text-gray-300">
//                 Terms Of Service
//               </a>
//               <a href="#" className="underline text-gray-300 ml-2">
//                 Privacy Policy
//               </a>
//               <a href="/dashboard" className="underline text-gray-300 ml-2">
//                 Dashboard
//               </a>
//             </p>
//           </div>

//           <div className="flex flex-col items-center md:items-end gap-2">
//             <div className="flex gap-3 flex-wrap justify-center md:justify-end">
//               {socialIcons.map(({ Icon }, idx) => (
//                 <Icon
//                   key={idx}
//                   className="text-[#85AABA] text-xl"
//                   style={{
//                     backgroundColor: "#0F2B39",
//                     borderRadius: "9999px",
//                     padding: "12px",
//                     width: "45px",
//                     height: "45px",
//                   }}
//                 />
//               ))}
//             </div>
//             <p>
//               Design and Developed by{" "}
//               <a href="#" className="text-gray-300 underline">
//                 Abdul Rehman
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
"use client";
import React, { useState } from "react";
// import { Send } from "react-icons/io";
import { Send, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";



const QuickLinks = () => {
  return (
    <div className="grow min-h-[235px] max-md:mt-10">
      <h3 className="text-lg gap-3 font-medium text-white">Quick Links</h3>
      <nav className="flex gap-2 flex-col justify-center mt-8 w-full text-lg text-slate-400">
        <a href="#" className=" self-start whitespace-nowrap hover:text-white transition-colors">
          Courses
        </a>
        <a href="#" className=" self-start  whitespace-nowrap hover:text-white transition-colors">
          Subscriptions
        </a>
        <a href="#" className=" hover:text-white transition-colors">
          About
        </a>
        <a href="#" className=" hover:text-white transition-colors">
          Contact Us
        </a>
        <a href="#" className=" hover:text-white transition-colors">
          Login & Register dd
        </a>
      </nav>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="min-h-[172px] max-md:mt-10">
      <h3 className="text-xl font-medium text-white">Get Contact</h3>
      <div className="flex flex-col mt-7 w-full">
        <div className="w-full ">
          <a
            href="tel:+14065550120"
            className="text-3xl font-semibold text-orange-500 hover:text-orange-400 transition-colors"
          >
            (406) 555-0120
          </a>
          <a
            href="mailto:b.r.collins@example.com"
            className="block mt-5 text-lg font-medium text-slate-400 hover:text-white transition-colors"
          >
            b.r.collins@example.com
          </a>
        </div>
        <div className="flex gap-1.5 justify-center items-center self-start mt-5 text-base font-medium text-slate-400">
          <MapPin className="w-5 h-5 text-slate-400" />
          <address className="gap-1 self-stretch my-auto not-italic hover:text-white transition-colors">
            North America, USA
          </address>
        </div>
      </div>
    </div>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="flex flex-col items-start self-start mt-2 text-lg max-md:max-w-full">
      <h3 className="text-xl font-medium text-white">Join the Community</h3>
      <p className="mt-4 text-slate-400">
        2,000+ Students Globally – Connect & Say Hello!
      </p>
      <form onSubmit={handleSubmit} className="w-full my-4 flex flex-row">
      <div className="border-1 bg-[#16313F] border-gray-600 w-full flex flex-row rounded-4xl p-1">
                      <input
                        type="text"
                        className="border-none bg-transparent p-[6px] px-5 w-full placeholder-gray-400 rounded-4xl"
                        name="input"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="rounded-full text-white bg-[#ff6900]">
                      <Send className="w-12 h-12 p-2" />
                    </div>
      </form>
    </div>
  );
};

const SocialIcon = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <a
    href="#"
    aria-label={label}
    className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
  >
    <Icon className="w-5 h-5 text-white" />
  </a>
);

const Footer = () => {
  return (
    <footer className="flex flex-col items-center px-20 pt-20 pb-8 mt-24 w-full bg-neutral-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="w-full max-w-[1326px] max-md:max-w-full">
        <div className="flex flex-wrap gap-10 max-w-full w-[1264px]">
          <div className="flex-auto max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="w-[38%] max-md:ml-0 max-md:w-full">
                <QuickLinks />
              </div>
              <div className="ml-5 w-[62%] max-md:ml-0 max-md:w-full">
                <ContactInfo />
              </div>
            </div>
          </div>
          <Newsletter />
        </div>

        <hr className="shrink-0 mt-10 h-px border border-solid border-gray-600 border-opacity-10 max-md:max-w-full" />

        <div className="flex justify-between flex-wrap mt-8 w-full max-md:max-w-full">
  {/* Left Block - Fixed Width */}
  <Image
                src="/assets/lowerlogo.png"
                width={120}
                height={60}
                alt="Logo"
                className="object-contain"
              />

  {/* Right Block - Fills Remaining Space */}
  <div className="flex flex-1 justify-end gap-4 items-center min-h-[52px]">
    <SocialIcon icon={Facebook} label="Facebook" />
    <SocialIcon icon={Twitter} label="Twitter" />
    <SocialIcon icon={Instagram} label="Instagram" />
    <SocialIcon icon={Linkedin} label="LinkedIn" />
  </div>
</div>


        <hr className="shrink-0 mt-8 h-px border border-solid border-gray-600 border-opacity-10 max-md:max-w-full" />

        <div className="flex flex-wrap gap-5 justify-between mt-12 w-full text-base text-slate-500 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-wrap gap-5 items-center min-h-[21px] max-md:max-w-full">
            <p className="self-stretch my-auto">
              Copyright © 2025 B.R. Collins All Rights Reserved
            </p>
            <div className="flex gap-3 items-center self-stretch my-auto font-semibold text-right underline min-w-60">
              <a href="#" className="self-stretch my-auto hover:text-white transition-colors">
                Terms of service
              </a>
              <a href="#" className="self-stretch my-auto hover:text-white transition-colors">
                Privacy policy
              </a>
            </div>
          </div>
          <p className="font-medium text-right">
            <span className="font-normal">Design and Developed by </span>
            <a href="#" className="font-normal underline hover:text-white transition-colors">
              Agency Partner Interactive
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;