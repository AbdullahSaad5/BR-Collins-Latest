"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import B from "../../../public/img/login/Bb.png";
import LoginImage from "../../../public/img/login/loginimage.png";
import logo from "../../../public/img/login/lowerlogo.png";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken, setRefreshToken } from "@/app/store/features/users/userSlice";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (res) => {
      const data = res.data;

      // Store user data in Redux
      dispatch(setUser(data.user));
      dispatch(setAccessToken(data.accessToken));
      dispatch(setRefreshToken(data.refreshToken));

      showToast("Login successful", "success");
      router.push("/dashboard");
    },
    onError: (error) => {
      showToast("Login failed. Please check your credentials.", "error");
      console.error("Login error:", error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <section className="">
      <div className="flex flex-col lg:flex-row w-full bg-org">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 bg-[#0365AD] text-white relative py-12 lg:py-0">
          <div className="absolute bottom-0 w-full lg:w-[712px]">
            <Image src={B} alt="Decorative background" className="w-full h-auto" />
          </div>

          <div className="relative z-10 w-full px-6 lg:w-[630px] mx-auto flex flex-col gap-8 justify-center items-start min-h-[600px] lg:min-h-[700px]">
            <div className="w-12 h-12 rounded-full bg-[#3584BD] flex items-center justify-center">
              <IoArrowBackOutline className="w-7 h-7 text-white" />
            </div>
            <div>
              <Image src={logo} alt="Logo" className="h-10 w-auto" />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-bold font-hanken text-white">Sign in to your account</h1>
              <p>Build skills for today, tomorrow, and beyond. Education to future-proof your career.</p>
              <p className="text-gray-300">
                Asterisks (<span className="text-org font-bold">*</span>) indicate required fields.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 space-y-4" noValidate>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  {...register("email")}
                  required
                  placeholder="Email*"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-400 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-org"
                />
                {errors.email && <p className="text-white text-xs">{errors.email.message}</p>}
                <input
                  type="password"
                  {...register("password")}
                  required
                  placeholder="Password*"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-400 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-org"
                />
                {errors.password && <p className="text-white text-xs">{errors.password.message}</p>}
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex items-center gap-3 cursor-pointer group">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 flex items-center justify-center peer-checked:bg-org peer-checked:border-org transition-colors">
                      <svg
                        className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="ml-2 text-gray-100 font-light transition-colors group-hover:text-white">
                      Remember me
                    </span>
                  </label>
                </div>
                <div>
                  <h2 className="underline font-light">Forgot your password?</h2>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || loginMutation.isPending}
                className="bg-org text-white gap-2 items-center flex flex-row py-3 px-6 rounded-full font-base hover:bg-opacity-90 w-fit transition-colors disabled:opacity-50"
              >
                {isSubmitting || loginMutation.isPending ? "Logging in..." : "Login"}{" "}
                <span>
                  <IoMdArrowForward className="flex flex-row items-center justify-center my-auto" />
                </span>
              </button>
            </form>

            <p className="text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-org underline">
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:block lg:w-1/3">
          <Image src={LoginImage} alt="Login" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Login;
