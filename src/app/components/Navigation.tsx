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
    <nav className="relative flex flex-wrap items-center justify-between p-1 mt-5 max-md:max-w-full lg:px-20 sm:px-1 mb-5">
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
          <button onClick={() => setCart(true)} className="relative p-2">
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
            <select className="w-full appearance-none flex gap-1.5 justify-center items-center px-5 py-4 text-lg text-orange-500 bg-white border border-orange-500 border-solid min-h-[52px] rounded-[58px] cursor-pointer">
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
          <a href="/" className="hover:text-sky-600">
            Home
          </a>
          <Link href="/about" className="hover:text-sky-600">
            About
          </Link>
          <a href="/contact" className="hover:text-sky-600">
            Contact Us
          </a>
          <Link href="/dashboard" className="hover:text-sky-600">
            Dashboard
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={() => setCart(true)} className="relative">
            <ShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <div className="absolute -top-1 -right-1 text-xs py-1 px-2 rounded-full bg-blue-200">
                {items.length}
              </div>
            )}
          </button>
          <Link href="/login">
          <button className="overflow-hidden gap-1.5 px-6 py-4 bg-white border border-solid border-zinc-200 min-h-[52px] rounded-[56px]">
            Login
          </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
              <select className="w-full appearance-none flex gap-1.5 justify-center items-center px-5 py-4 text-lg text-orange-500 bg-white border border-orange-500 border-solid min-h-[52px] rounded-[58px] cursor-pointer">
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
            <a href="/" className="p-2 hover:bg-gray-100 rounded">
              Home
            </a>
            <a href="/about" className="p-2 hover:bg-gray-100 rounded">
              About
            </a>
            <a href="/contact" className="p-2 hover:bg-gray-100 rounded">
              Contact Us
            </a>
            <a href="/dashboard" className="p-2 hover:bg-gray-100 rounded">
              Dashboard
            </a>
          </div>

          <Link href="/login">
            <button className="w-full px-6 py-4 bg-white border border-solid border-zinc-200 rounded-[56px] mt-4">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Cart Overlay */}
      <div
        className={`fixed z-50 top-0 right-0 w-full h-full transform transition-transform duration-300 ease-in-out ${
          cart ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <Cart />
      </div>
    </nav>
  );
};
