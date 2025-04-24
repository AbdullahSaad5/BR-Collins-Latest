// "use client";


// import Link from "next/link";
// import React from "react";
// import { useUser } from "./context/CartContext";
// import Cart from "./Cart/Cart";
// import { ShoppingCart } from "lucide-react";

// export const Navigation = () => {
//   const { cart, setCart,items } = useUser();
//   return (
//     <nav className="flex flex-wrap gap-10 items-center self-center mt-5 max-md:max-w-full p-1">
//        {/* Cart  */}
//        <div className={`fixed z-50 top-0 right-0 w-full h-full transform transition-transform duration-300 ease-in-out ${cart ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
//                 <Cart />
//             </div>
//       <div className="flex flex-wrap gap-10 items-center self-stretch my-auto font-semibold min-w-60 max-md:max-w-full">
//         <a href="/"><img
//           src="/img/logo.svg"
//           className="object-contain self-stretch my-auto aspect-[4.22] min-w-60 w-[241px]"
//           alt="Logo"
//         /></a>
//         <div className="flex gap-2.5 items-center self-stretch my-auto min-w-60 max-md:max-w-full">
//           <div className="self-stretch my-auto text-base text-gray-400 rounded-none min-w-60 w-[321px]">
//           <div className="flex flex-col justify-center items-start px-6 py-4 w-full bg-white border border-solid border-zinc-200 rounded-[66px] max-md:px-5">
//   <div className="flex gap-2 justify-center items-center w-full">
//     <img
//       src="/img/search.svg"
//       className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
//       alt="Search icon"
//     />
//     <input
//       type="text"
//       placeholder="Search for anything"
//       className="w-full border-none focus:outline-none text-sm placeholder-gray-500"
//     />
//   </div>
// </div>

//           </div>
//           <div className="relative w-full max-w-[138px]">
//   <select
//     className="w-full appearance-none flex gap-1.5 justify-center items-center px-5 py-4 text-lg text-orange-500 bg-white border border-orange-500 border-solid min-h-[52px] rounded-[58px] cursor-pointer"
//   >
//     <option value="">Courses</option>
//     <option value="course1">Course 1</option>
//     <option value="course2">Course 2</option>
//   </select>

//   <img
//     src="/img/downarrow.svg"
//     className="pointer-events-none absolute right-5 top-1/2 transform -translate-y-1/2 w-5 aspect-square"
//     alt="Dropdown icon"
//   />
// </div>

//         </div>
//       </div>
//       <div className="flex flex-wrap gap-10 items-center self-stretch my-auto text-base min-w-60 text-neutral-900 max-md:max-w-full">
//         <div className="flex gap-8 items-center self-stretch my-auto font-medium min-w-60">
//           <a href="/" className="hover:text-sky-600">
//             Home
//           </a>
//           <Link href="/about" className="hover:text-sky-600">
//             About
//           </Link>
//           <a href="/" className="hover:text-sky-600">
//             Contact Us
//           </a>
//           <Link href="/dashboard" className="hover:text-sky-600">
//             Dashboard
//           </Link>
//         </div>
//         <div className="flex gap-4 items-center self-stretch my-auto whitespace-nowrap">
//           {/* <img
//             src="/img/card.svg"
//             className="object-contain shrink-0 self-stretch my-auto w-9 aspect-square"
//             alt="User icon"
//           /> */}
//                <button
//                         onClick={() => {
//                             setCart(true);
//                         }}
//                         className="relative py-2 px-5 border-[#D9E2E6] text-[#AEB5B9] hover:cursor-pointer hover:scale-105 transition-all duration-300"
//                     ><ShoppingCart className="w-6 h-6 text-current" />
//                         <div className="absolute top-0 right-0 text-xs py-1 px-2 rounded-full bg-blue-200 flex justify-center items-center text-black">
//                             {items.length}
//                         </div>
//                     </button>
//           <button className="overflow-hidden gap-1.5 self-stretch px-6 py-4 my-auto bg-white border border-solid border-zinc-200 min-h-[52px] rounded-[56px] max-md:px-5">
//             Login
//           </button>
      
//       </div>
//       </div>
//     </nav>
//   );
// };



// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { useUser } from "./context/CartContext";
// import Cart from "./Cart/Cart";
// import { ShoppingCart, Menu, X } from "lucide-react";

// export const Navigation = () => {
//   const { cart, setCart, items } = useUser();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="relative w-full">
//       {/* Mobile Header */}
//       <div className="md:hidden flex justify-between items-center p-4 border-b">
//         <div className="flex items-center gap-4">
//           <button onClick={() => setIsOpen(!isOpen)} className="p-2">
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//           <a href="/">
//             <img
//               src="/img/logo.svg"
//               className="h-8 w-auto"
//               alt="Logo"
//             />
//           </a>
//         </div>
        
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setCart(true)}
//             className="relative"
//           >
//             <ShoppingCart className="w-6 h-6" />
//             {items.length > 0 && (
//               <div className="absolute -top-1 -right-1 text-xs py-1 px-2 rounded-full bg-blue-200">
//                 {items.length}
//               </div>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`md:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       }`}>
//         <div className="p-4 space-y-4">
//           <a href="/" className="block p-2 hover:bg-gray-100 rounded">Home</a>
//           <Link href="/about" className="block p-2 hover:bg-gray-100 rounded">About</Link>
//           <a href="/" className="block p-2 hover:bg-gray-100 rounded">Contact Us</a>
//           <Link href="/dashboard" className="block p-2 hover:bg-gray-100 rounded">Dashboard</Link>
//           <button className="w-full p-2 text-left hover:bg-gray-100 rounded">Login</button>
//         </div>
//       </div>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex flex-wrap items-center justify-between px-6 py-4">
//         <div className="flex items-center gap-8">
//           <a href="/">
//             <img
//               src="/img/logo.svg"
//               className="h-8 w-auto"
//               alt="Logo"
//             />
//           </a>

//           <div className="relative flex items-center gap-4">
//             <div className="relative">
//               <div className="flex items-center bg-white border rounded-full px-6 py-2">
//                 <img
//                   src="/img/search.svg"
//                   className="w-5 h-5 mr-2"
//                   alt="Search"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search for anything"
//                   className="outline-none w-48"
//                 />
//               </div>
//             </div>

//             <div className="relative">
//               <select className="appearance-none px-4 py-2 border border-orange-500 rounded-full bg-white text-orange-500">
//                 <option>Courses</option>
//                 <option>Course 1</option>
//                 <option>Course 2</option>
//               </select>
//               <img
//                 src="/img/downarrow.svg"
//                 className="absolute right-3 top-3 w-4 h-4 pointer-events-none"
//                 alt="Dropdown"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-8">
//           <div className="flex gap-6">
//             <a href="/" className="hover:text-sky-600">Home</a>
//             <Link href="/about" className="hover:text-sky-600">About</Link>
//             <a href="/" className="hover:text-sky-600">Contact Us</a>
//             <Link href="/dashboard" className="hover:text-sky-600">Dashboard</Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setCart(true)}
//               className="relative"
//             >
//               <ShoppingCart className="w-6 h-6" />
//               {items.length > 0 && (
//                 <div className="absolute -top-1 -right-1 text-xs py-1 px-2 rounded-full bg-blue-200">
//                   {items.length}
//                 </div>
//               )}
//             </button>
//             <button className="px-6 py-2 border rounded-full hover:bg-gray-50">
//               Login
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Cart Overlay */}
//       <div className={`fixed z-50 inset-0 bg-white transition-transform duration-300 ${
//         cart ? "translate-x-0" : "translate-x-full"
//       }`}>
//         <Cart />
//       </div>
//     </nav>
//   );
// };





"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "./context/CartContext";
import Cart from "./Cart/Cart";
import { ShoppingCart, Menu, X } from "lucide-react";

export const Navigation = () => {
  const { cart, setCart, items } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative flex flex-wrap items-center justify-between p-1 mt-5 max-md:max-w-full lg:px-20 sm:px-1">
      {/* Mobile Header */}
      <div className="flex items-center justify-between w-full md:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-neutral-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <a href="/">
            <img
              src="/img/logo.svg"
              className="object-contain aspect-[4.22] w-[241px]"
              alt="Logo"
            />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCart(true)}
            className="relative p-2"
          >
            <ShoppingCart className="w-6 h-6 text-[#AEB5B9]" />
            {items.length > 0 && (
              <div className="absolute top-0 right-0 text-xs py-1 px-2 rounded-full bg-blue-200">
                {items.length}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Left Section */}
      <div className="items-center flex-grow hidden md:flex gap-10">
        <a href="/">
          <img
            src="/img/logo.svg"
            className="object-contain aspect-[4.22] min-w-60 w-[241px]"
            alt="Logo"
          />
        </a>
        
        <div className="flex gap-2.5 items-center">
          <div className="flex flex-col justify-center items-start px-6 py-4 w-full bg-white border border-solid border-zinc-200 rounded-[66px]">
            <div className="flex gap-2 justify-center items-center w-full">
              <img
                src="/img/search.svg"
                className="object-contain w-5 aspect-square"
                alt="Search icon"
              />
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full border-none focus:outline-none text-sm placeholder-gray-500"
              />
            </div>
          </div>

          <div className="relative w-full max-w-[138px]">
            <select
              className="w-full appearance-none flex gap-1.5 justify-center items-center px-5 py-4 text-lg text-orange-500 bg-white border border-orange-500 border-solid min-h-[52px] rounded-[58px] cursor-pointer"
            >
              <option value="">Courses</option>
              <option value="course1">Course 1</option>
              <option value="course2">Course 2</option>
            </select>
            <img
              src="/img/downarrow.svg"
              className="pointer-events-none absolute right-5 top-1/2 transform -translate-y-1/2 w-5 aspect-square"
              alt="Dropdown icon"
            />
          </div>
        </div>
      </div>

      {/* Desktop Right Section */}
      <div className="items-center flex-grow hidden md:flex gap-10 justify-between">
        <div className="flex gap-8 items-center font-medium">
          <a href="/" className="hover:text-sky-600">Home</a>
          <Link href="/about" className="hover:text-sky-600">About</Link>
          <a href="/" className="hover:text-sky-600">Contact Us</a>
          <Link href="/dashboard" className="hover:text-sky-600">Dashboard</Link>
        </div>

        <div className="flex gap-4 items-center">
         <button
onClick={() => setCart(true)}
className="relative"
>
<ShoppingCart className="w-6 h-6" />
{items.length > 0 && (
  <div className="absolute -top-1 -right-1 text-xs py-1 px-2 rounded-full bg-blue-200">
    {items.length}
  </div>
)}
</button>
          
          <button className="overflow-hidden gap-1.5 px-6 py-4 bg-white border border-solid border-zinc-200 min-h-[52px] rounded-[56px]">
            Login
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-4 space-y-6 mt-4">
          {/* Search and Courses in Mobile Menu */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-center items-start px-6 py-4 w-full bg-white border border-solid border-zinc-200 rounded-[66px]">
              <div className="flex gap-2 justify-center items-center w-full">
                <img
                  src="/img/search.svg"
                  className="object-contain w-5 aspect-square"
                  alt="Search icon"
                />
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="w-full border-none focus:outline-none text-sm placeholder-gray-500"
                />
              </div>
            </div>

            <div className="relative w-full">
              <select
                className="w-full appearance-none flex gap-1.5 justify-center items-center px-5 py-4 text-lg text-orange-500 bg-white border border-orange-500 border-solid min-h-[52px] rounded-[58px] cursor-pointer"
              >
                <option value="">Courses</option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
              </select>
              <img
                src="/img/downarrow.svg"
                className="pointer-events-none absolute right-5 top-1/2 transform -translate-y-1/2 w-5 aspect-square"
                alt="Dropdown icon"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4 text-lg">
            <a href="/" className="p-2 hover:bg-gray-100 rounded">Home</a>
            <Link href="/about" className="p-2 hover:bg-gray-100 rounded">About</Link>
            <a href="/" className="p-2 hover:bg-gray-100 rounded">Contact Us</a>
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded">Dashboard</Link>
          </div>

          <button className="w-full px-6 py-4 bg-white border border-solid border-zinc-200 rounded-[56px] mt-4">
            Login
          </button>
        </div>
      </div>

      {/* Cart Overlay */}
      <div className={`fixed z-50 top-0 right-0 w-full h-full transform transition-transform duration-300 ease-in-out ${
        cart ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <Cart />
      </div>
    </nav>
  );
};