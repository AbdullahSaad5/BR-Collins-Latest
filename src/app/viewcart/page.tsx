"use client";
import React, { useState } from "react";
import TrashIcon from "../../../public/img/cart/trash.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  selectCartDiscountTotal,
} from "@/app/store/features/cart/cartSlice";
import { ICourse } from "@/app/types/course.contract";
import CheckoutPage from "@/app/components/Cart/CheckoutPage";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { showToast } from "@/app/utils/toast";
import { useAppSelector } from "@/app/store/hooks";
import { getAccessToken, isUserLoggedIn } from "@/app/store/features/users/userSlice";
import LoginRequiredModal from "@/app/components/pricing/LoginRequiredModal";

const ViewCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalOriginal = useSelector(selectCartTotal);
  const totalDiscounted = useSelector(selectCartDiscountTotal);
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const accessToken = useAppSelector(getAccessToken);
  const isLoggedIn = useAppSelector(isUserLoggedIn);

  const bill = {
    totalOriginal,
    totalDiscounted,
    discountPercentage: ((totalOriginal - totalDiscounted) / totalOriginal) * 100,
  };

  const handleRemoveItem = (courseId: string) => {
    dispatch(removeFromCart(courseId));
  };

  const createPaymentIntentMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        "/stripe/create-payment-intent",
        {
          itemIds: items.map((item: ICourse) => item._id),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      setShowCheckout(true);
    },
    onError: (error) => {
      showToast("Failed to create payment intent", "error");
      console.error("Error creating payment intent:", error);
    },
  });

  const handleCheckout = () => {
    if (items.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    createPaymentIntentMutation.mutate();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="list-none p-0 inline-flex text-gray-600">
            <li className="flex items-center">
              Home
              <svg className="h-4 w-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="flex items-center">
              Courses
              <svg className="h-4 w-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-blue-500">Cart</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-sm text-gray-600">
            <span className="text-blue-500">{`(${items.length})`}</span> Courses in Cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {items.map((item: ICourse, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-sm mb-4 p-4">
                <div className="flex gap-4">
                  <div className="w-48 h-32 flex-shrink-0">
                    <Image
                      src={"/img/Course/Course.png"}
                      alt={item.title}
                      width={192}
                      height={128}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-md mb-2">
                          {item.noOfHours}HRS
                        </span>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h2>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Image
                              src="/default-instructor-image.jpg"
                              alt={item.instructor}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <span>by: </span>
                            <span className="text-blue-500 hover:underline cursor-pointer">{item.instructor}</span>
                          </div>
                          <span>•</span>
                          <span>{item.noOfLessons} Lessons</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{item.rating}</span>
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(item.rating) ? "text-[#F86537]" : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">${item.discountPrice || item.price}.00</p>
                        {item.discountPrice && <p className="text-sm text-gray-400 line-through">${item.price}.00</p>}
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="mt-4 text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 ml-auto"
                        >
                          <Image src={TrashIcon} alt="Remove" width={16} height={16} />
                          <span className="text-sm">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total:</h3>
                <p className="text-3xl font-bold text-gray-900">${bill.totalDiscounted}.00</p>
              </div>
              {bill.discountPercentage > 0 && (
                <div className="mb-4 text-sm">
                  <p className="text-gray-500">
                    Original Price: <span className="line-through">${bill.totalOriginal}.00</span>
                  </p>
                  <p className="text-green-600">You save: {Math.round(bill.discountPercentage)}%</p>
                </div>
              )}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#F86537] hover:bg-[#E55A2E] text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && clientSecret && (
        <CheckoutPage
          onBack={() => setShowCheckout(false)}
          onClose={() => setShowCheckout(false)}
          clientSecret={clientSecret}
        />
      )}

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        reason="to proceed with your purchase"
      />
    </div>
  );
};

export default ViewCart;
