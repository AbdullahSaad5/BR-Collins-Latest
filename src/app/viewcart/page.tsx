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
import { getAccessToken } from "@/app/store/features/users/userSlice";

const ViewCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalOriginal = useSelector(selectCartTotal);
  const totalDiscounted = useSelector(selectCartDiscountTotal);
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const accessToken = useAppSelector(getAccessToken);

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
    createPaymentIntentMutation.mutate();
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-center items-center bg-blue-50">
      <div className="w-[80%] min-h-[70vh] flex flex-col justify-start items-start gap-5 py-5">
        <h2 className="text-xs md:text-md">
          {`Home > Courses > Accountablity in the workplace >`} <span className="text-blue-400">Cart</span>
        </h2>
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <h1 className="w-full text-2xl  md:text-3xl font-bold">Shopping Cart</h1>
          <div className="w-full h-[2vh] flex justify-start items-center gap-1 text-sm md:text-md">
            <span className="text-blue-500">{`(${items.length})`}</span> Courses in Cart
          </div>
        </div>
        <div className="w-full h-full flex flex-col md:flex-row justify-start items-start gap-10 py-5">
          <div className="w-full md:w-[70%] h-full flex flex-col justify-center items-center gap-20 md:gap-7">
            {items.map((item: ICourse, index: number) => {
              return (
                <div key={index} className="w-full h-[12vh] flex flex-col justify-center items-center gap-2">
                  <hr className="w-[90%] text-gray-200" />
                  <div className="relative w-full h-[12vh] flex justify-center items-start">
                    <div className="w-[30%] md:w-[20%] h-full">
                      <Image
                        // src={item.coverImageUrl || "/default-course-image.jpg"}
                        src={"/img/Course/Course.png"}
                        alt="item_pic"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[70%] h-full pl-2 md:pl-4 flex flex-col justify-between items-start gap-[1px]">
                      <div className="text-[10px] bg-blue-400 text-white py-[2px] px-1 rounded-md">
                        {item.noOfHours}HRS
                      </div>
                      <h2 className="text-sm md:text-md leading-5 font-bold">{item.title}</h2>
                      <div className="text-xs md:text-md text-gray-400 flex gap-1">
                        <Image
                          src="/default-instructor-image.jpg"
                          alt="author_pic"
                          width={15}
                          height={15}
                          className="w-5 h-5"
                        />
                        by: <span className="text-blue-400 underline">{item.instructor}</span>|{" "}
                        <span>{item.noOfLessons} Lessons</span>
                        <span className="text-black font-semibold flex">
                          <span className="mr-1">{item.rating}</span>
                          {Array(5)
                            .fill(0)
                            .map((_, index) => {
                              return (
                                <div key={index}>
                                  <svg
                                    className={`w-3 h-4 ${
                                      item.rating < index + 1 ? "text-[#DADADA]" : "text-[#F86537]"
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                  >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                  </svg>
                                </div>
                              );
                            })}
                        </span>
                      </div>
                    </div>
                    <div
                      onClick={() => handleRemoveItem(item._id)}
                      className="w-[40%] flex flex-col justify-center items-start gap-5"
                    >
                      <div className="w-full flex flex-col justify-start items-end">
                        <p className="font-semibold text-xs md:text-md text-blue-500">
                          ${item.discountPrice || item.price}.00
                        </p>
                        <p className="font-semibold text-xs md:text-md">
                          <span className="text-gray-400 line-through">{item.price}.00</span>
                        </p>
                      </div>
                      <Image
                        src={TrashIcon}
                        alt="trash_icon"
                        width={20}
                        height={20}
                        className="absolute bottom-0 right-0"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full md:w-[30%] min-h-[30vh] flex flex-col justify-center items-center bg-white rounded-lg p-5 md:p-5 gap-2 md:mt-0 mt-10">
            <div className="w-full flex justify-between items-center">
              <div className="w-1/2 flex justify-start items-start text-blue-500 font-bold">Total:</div>
              <div className="w-1/2 flex flex-col justify-end items-end">
                <h1 className="text-2xl font-bold">${bill.totalDiscounted}.00</h1>
                <h1 className="text-xl text-gray-500 line-through">${bill.totalOriginal}.00</h1>
                <h1 className="text-lg text-gray-600">Discount {Math.round(bill.discountPercentage)}% off</h1>
              </div>
            </div>
            <hr className="w-[80%] text-gray-300" />
            <button
              onClick={handleCheckout}
              className="w-full p-2 rounded-full border border-[#F86537] bg-[#F86537] text-sm md:text-md line-clamp-1 text-white hover:bg-[#E55A2E] transition-colors"
            >
              {`Proceed to checkout ->`}
            </button>
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
    </div>
  );
};

export default ViewCart;
