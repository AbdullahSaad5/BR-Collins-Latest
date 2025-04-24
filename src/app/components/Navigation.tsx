"use client";


import Link from "next/link";
import React from "react";
import { useUser } from "./context/CartContext";
import Cart from "./Cart/Cart";
import CartIcon from '../../../public/img/cart/cart.svg';
import { ShoppingCart } from "lucide-react";

export const Navigation = () => {
  const { cart, setCart,items } = useUser();
  return (
    <nav className="flex flex-wrap gap-10 items-center self-center mt-5 max-md:max-w-full p-1">
       {/* Cart  */}
       <div className={`fixed z-50 top-0 right-0 w-full h-full transform transition-transform duration-300 ease-in-out ${cart ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                <Cart />
            </div>
      <div className="flex flex-wrap gap-10 items-center self-stretch my-auto font-semibold min-w-60 max-md:max-w-full">
        <a href="/"><img
          src="/img/logo.svg"
          className="object-contain self-stretch my-auto aspect-[4.22] min-w-60 w-[241px]"
          alt="Logo"
        /></a>
        <div className="flex gap-2.5 items-center self-stretch my-auto min-w-60 max-md:max-w-full">
          <div className="self-stretch my-auto text-base text-gray-400 rounded-none min-w-60 w-[321px]">
            <div className="flex flex-col justify-center items-start px-6 py-4 w-full bg-white border border-solid border-zinc-200 rounded-[66px] max-md:px-5">
              <div className="flex gap-2 justify-center items-center">
                <img
                  src="/img/search.svg"
                  className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  alt="Search icon"
                />
                <span>Search for anything</span>
              </div>
            </div>
          </div>
          <button className="flex overflow-hidden gap-1.5 justify-center items-center self-stretch px-5 py-4 my-auto text-lg text-orange-500 whitespace-nowrap border border-orange-500 border-solid min-h-[52px] rounded-[58px] w-[138px]">
            <span>Courses</span>
            <img
              src="/img/downarrow.svg"
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
              alt="Dropdown icon"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 items-center self-stretch my-auto text-base min-w-60 text-neutral-900 max-md:max-w-full">
        <div className="flex gap-8 items-center self-stretch my-auto font-medium min-w-60">
          <a href="/" className="hover:text-sky-600">
            Home
          </a>
          <Link href="/about" className="hover:text-sky-600">
            About
          </Link>
          <a href="/" className="hover:text-sky-600">
            Contact Us
          </a>
          <Link href="/dashboard" className="hover:text-sky-600">
            Dashboard
          </Link>
        </div>
        <div className="flex gap-4 items-center self-stretch my-auto whitespace-nowrap">
          {/* <img
            src="/img/card.svg"
            className="object-contain shrink-0 self-stretch my-auto w-9 aspect-square"
            alt="User icon"
          /> */}
               <button
                        onClick={() => {
                            setCart(true);
                        }}
                        className="relative py-2 px-5 border-[#D9E2E6] text-[#AEB5B9] hover:cursor-pointer hover:scale-105 transition-all duration-300"
                    ><ShoppingCart className="w-6 h-6 text-current" />
                        <div className="absolute top-0 right-0 text-xs py-1 px-2 rounded-full bg-blue-200 flex justify-center items-center text-black">
                            {items.length}
                        </div>
                    </button>
          <button className="overflow-hidden gap-1.5 self-stretch px-6 py-4 my-auto bg-white border border-solid border-zinc-200 min-h-[52px] rounded-[56px] max-md:px-5">
            Login
          </button>
      
      </div>
      </div>
    </nav>
  );
};
