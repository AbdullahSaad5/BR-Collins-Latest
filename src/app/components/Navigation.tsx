"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "./context/CartContext";
import Cart from "./Cart/Cart";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { logout } from "@/app/store/features/users/userSlice";
import { IUser } from "../types/user.contract";
import Image from "next/image";

const isValidProfilePicture = (url: string | undefined): url is string => {
  return typeof url === "string" && url.length > 0;
};

const toTitleCase = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const Navigation = () => {
  const { cart, setCart, items } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [DropdownMenu, setDropDownMenu] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.accessToken !== null);
  const user = useAppSelector((state) => state.user.user);
  const profilePicture = (user as IUser).profilePicture;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoute = e.target.value;
    router.push(selectedRoute);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className="relative text-gray-900 flex items-center justify-between p-1 mt-5 w-full max-w-[1326px] mx-auto lg:px-5 xl:px-0 mb-5">
      {/* Mobile Header */}
      <div className="flex items-center justify-between w-full md:hidden">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-neutral-900">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <a href="/">
            <img src="/img/logo.svg" className="object-contain aspect-[4.22] w-[241px]" alt="Logo" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setCart(true)} className="relative p-2">
            <ShoppingCart className="w-6 h-6 text-[#AEB5B9]" />
            {items.length > 0 && (
              <div className="absolute top-0 right-0 text-xs py-1 px-2 rounded-full bg-blue-200">{items.length}</div>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-10 flex-1">
          <a href="/">
            <img src="/img/logo.svg" className="object-contain aspect-[4.22] min-w-60 w-[241px]" alt="Logo" />
          </a>

          <div className="flex gap-2.5 items-center w-full max-w-[500px]">
            <div className="flex flex-col justify-center items-start px-5 py-3 w-full bg-white border border-solid border-zinc-200 rounded-[66px]">
              <div className="flex gap-2 justify-center items-center w-full">
                <img src="/img/search.svg" className="object-contain w-5 aspect-square" alt="Search icon" />
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="w-full border-none focus:outline-none text-sm placeholder-gray-500"
                />
              </div>
            </div>

            <div className="relative w-full max-w-[120px] m-1">
              <select
                onChange={handleChange}
                defaultValue="/course"
                className="w-full appearance-none flex justify-center items-center px-1 py-1 text-sm text-orange-500 bg-white border border-orange-500 border-solid min-h-[42px] rounded-[58px] cursor-pointer"
              >
                <option value="/course">Courses</option>
                <option value="/about">About</option>
                <option value="/contact">Contact</option>
              </select>
              <img
                src="/img/downarrow.svg"
                className="pointer-events-none absolute right-5 top-1/2 transform -translate-y-1/2 w-5 aspect-square"
                alt="Dropdown icon"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-10">
          <div className="flex gap-8 items-center font-medium">
            <Link href="/subscriptions" className="hover:text-sky-600 whitespace-nowrap">
              Subscriptions
            </Link>
            <Link href="/about" className="hover:text-sky-600 whitespace-nowrap">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-sky-600 whitespace-nowrap">
              Contact Us
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
            {isLoggedIn ? (
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                <div className="flex items-center gap-2">
                  {isValidProfilePicture(profilePicture) ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image src={profilePicture} alt="Profile" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">{`${(user as IUser).firstName} ${
                      (user as IUser).lastName
                    }`}</span>
                    <span className="text-xs font-light text-gray-500">{`${toTitleCase((user as IUser).role)}`}</span>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <button className="overflow-hidden gap-1.5 px-5 py-0.5 bg-white border border-solid border-zinc-200 min-h-[52px] rounded-[56px] whitespace-nowrap">
                  Login
                </button>
              </Link>
            )}
          </div>
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
                <img src="/img/search.svg" className="object-contain w-5 aspect-square" alt="Search icon" />
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="w-full border-none focus:outline-none text-sm placeholder-gray-500"
                />
              </div>
            </div>

            <div className="relative w-full">
              <select className="w-full appearance-none flex gap-1.5 justify-center items-center px-5 py-1 text-lg text-orange-500 bg-white border border-orange-500 border-solid min-h-[52px] rounded-[58px] cursor-pointer">
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
            <a href="/subscriptions" className="p-2 hover:bg-gray-100 rounded">
              Subscriptions
            </a>
          </div>

          {!isLoggedIn && (
            <Link href="/login">
              <button className="w-full px-2 py-1 bg-white border border-solid border-zinc-200 rounded-[56px] mt-4">
                Login
              </button>
            </Link>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-3 p-2">
              {isValidProfilePicture(profilePicture) ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={profilePicture} alt="Profile" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <span className="text-lg font-medium">{`${(user as IUser).firstName} ${(user as IUser).lastName}`}</span>
            </div>
          )}
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
