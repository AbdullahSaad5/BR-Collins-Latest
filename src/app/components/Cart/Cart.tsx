import React from "react";
import CartIcon from "../../../../public/img/cart/cart.svg";
import TrashIcon from "../../../../public/img/cart/trash.svg";
import CrossIcon from "../../../../public/img/cart/cross.svg";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { toggleCart, removeFromCart, toggleCartVisiblity } from "@/app/store/features/cart/cartSlice";
import { ICourse } from "@/app/types/course.contract";
// import { useUser } from '../context/CartContext';

const Cart = () => {
  // const { items, handleRemoveItem, setCart, bill } = useUser();
  const dispatch = useAppDispatch();
  const { items, discountTotal, isCartOpen, total, isCartVisible } = useAppSelector((state) => state.cart)

  const handleRemoveItem = (courseId: string) => {
    dispatch(removeFromCart(courseId));
  };

  const handleCloseCart = () => {
    dispatch(toggleCartVisiblity());
    setTimeout(() => {
      dispatch(toggleCart());
    }, 300)
  };

  return (
    <div
      className={`relative w-full min-h-screen flex justify-end items-center transition-all duration-500 backdrop-blur-[2px] ${isCartVisible ? 'bg-black/0' : 'bg-black/50'
        }`}
    >
      <div className="z-50 w-full md:w-[90%] lg:w-[40%] flex flex-col p-5 md:p-10 bg-white gap-5 min-h-[100vh]">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl md:text-3xl font-bold line-clamp-1">Your Shopping Cart</h1>
          <button
            className="hover:cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={handleCloseCart}
          >
            <Image src={CrossIcon} alt="Close Cart" width={25} height={25} />
          </button>
        </div>

        <div className="w-full flex justify-start items-center gap-1 text-sm md:text-md">
          <span className="text-blue-500 font-semibold">{`(${items.length})`}</span> Courses in Cart
        </div>

        <div className="w-full flex flex-col gap-5 py-5">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 w-full">Your cart is empty.</p>
          ) : (
            items.map((item: ICourse, index) => (
              <div key={item._id} className="flex flex-col justify-center items-center gap-5">
                {index !== 0 && (
                  <>
                    <hr className="w-[90%] text-[#D9E2E6]" />
                  </>
                )}
                <div className="w-full h-[90px] flex items-center gap-5">
                  <div className="w-[30%] md:w-[20%] h-full flex">
                    <Image
                      // src={item.coverImageUrl || ""}
                      src={"/img/Course/Course.png"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="w-[60%] md:w-[65%] h-full flex flex-col justify-between items-start gap-1">
                    <h2 className="text-xs md:text-lg font-bold h-[60%] text-start leading-snug">{item.title}</h2>
                    <p className="text-xs md:text-md text-gray-400 h-[20%] text-start">
                      by: <span className="text-blue-400">{item.instructor}</span>
                    </p>
                    <p className="font-semibold text-xs md:text-md h-[20%] text-start">
                      ${item.discountPrice || item.price}.00{" "}
                      {item.discountPrice && <span className="text-gray-400 line-through">${item.price}.00</span>}
                    </p>
                  </div>
                  <div
                    onClick={() => handleRemoveItem(item._id)}
                    className="w-[10%] md:w-[15%] flex justify-end items-center cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Image src={TrashIcon} alt="Remove Item" width={20} height={20} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full flex flex-col items-center gap-4 mt-6">
          <div className="w-full flex justify-between items-center">
            <h2 className="font-bold text-sm md:text-md">Subtotal:</h2>
            <h1 className="font-bold text-lg">${discountTotal || 0}.00</h1>
          </div>

          <hr className="w-[90%] text-[#D9E2E6]" />

          <div className="w-full flex justify-between items-center gap-2 mt-4">
            <Link
              href="/viewcart"
              onClick={handleCloseCart}
              className="w-1/2 p-2 rounded-full border border-gray-400 text-gray-800 text-sm md:text-md text-center hover:bg-gray-100 transition"
            >
              View Cart
            </Link>
            <button className="w-1/2 p-2 rounded-full border border-[#F86537] bg-[#F86537] text-sm md:text-md text-white hover:bg-[#f85624] transition">
              <span className="block md:hidden">Proceed →</span>
              <span className="hidden md:block">Proceed to checkout →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
