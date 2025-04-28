import React from 'react';
import CartIcon from '../../../../public/img/cart/cart.svg';
import TrashIcon from '../../../../public/img/cart/trash.svg';
import CrossIcon from '../../../../public/img/cart/cross.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '../context/CartContext';

const Cart = () => {
  const { items, handleRemoveItem, setCart, bill } = useUser();

  return (
    <div className="w-full min-h-screen flex justify-end items-center bg-[#0A141980]/50 backdrop-brightness-50 backdrop-blur-[2px]">

      <div className="w-full md:w-[90%] lg:w-[40%] flex flex-col p-10 md:p-20 bg-white gap-5 min-h-[100vh]">

        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold line-clamp-1">Your Shopping Cart</h1>
          <button
            className="hover:cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => setCart(false)}
          >
            <Image src={CrossIcon} alt="Close Cart" width={30} height={30} />
          </button>
        </div>

        <div className="w-full flex justify-start items-center gap-1 text-sm md:text-md">
          <span className="text-blue-500">{`(${items.length})`}</span> Courses in Cart
        </div>

        <div className="w-full flex flex-col gap-5 py-5">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 w-full">Your cart is empty.</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="w-full flex items-center">
                <div className="w-[25%]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div className="w-[60%] pl-2 flex flex-col justify-start gap-1">
                  <h2 className="text-xs md:text-md font-bold line-clamp-2">{item.title}</h2>
                  <p className="text-xs md:text-md text-gray-400">
                    by: <span className="text-blue-400">{item.by}</span>
                  </p>
                  <p className="font-semibold text-xs md:text-md">
                    ${item.discountedPrice}.00{' '}
                    <span className="text-gray-400 line-through">${item.originalPrice}.00</span>
                  </p>
                </div>
                <div
                  onClick={() => handleRemoveItem(index)}
                  className="w-[15%] flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
                >
                  <Image src={TrashIcon} alt="Remove Item" width={20} height={20} />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full flex flex-col items-center gap-4 mt-6">
          <div className="w-full flex justify-between items-center">
            <h2 className="font-bold text-sm md:text-md">Subtotal:</h2>
            <h1 className="font-bold text-lg">${bill?.totalDiscounted || 0}.00</h1>
          </div>

          <hr className="w-[90%] border-gray-300" />

          <div className="w-full flex justify-between items-center gap-2 mt-4">
            <Link
              href="/viewcart"
              onClick={() => setCart(false)}
              className="w-1/2 p-2 rounded-full border border-gray-400 text-gray-800 text-sm md:text-md text-center hover:bg-gray-100 transition"
            >
              View Cart
            </Link>
            <button className="w-1/2 p-2 rounded-full border border-[#F86537] bg-[#F86537] text-sm md:text-md text-white hover:bg-[#f85624] transition">
              {`Proceed to checkout →`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
