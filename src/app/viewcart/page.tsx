"use client"
import React from 'react';
import TrashIcon from '../../../public/img/cart/trash.svg';
import Image from 'next/image';
import { useUser } from '../components/context/CartContext';



const ViewCart = () => {
    const { items, handleRemoveItem, bill } = useUser();

    return (
         
       
        <div className='w-full min-h-[100vh] flex flex-col justify-center items-center bg-blue-50'>
            
            <div className='w-[80%] min-h-[70vh] flex flex-col justify-start items-start gap-5 py-5'>
                <h2 className='text-xs md:text-md'>
                    {`Home > Courses > Accountablity in the workplace >`} <span className='text-blue-400'>Cart</span>
                </h2>
                <div className='w-full flex flex-col justify-start items-start gap-4'>
                    <h1 className='w-full text-2xl  md:text-3xl font-bold'>Shopping Cart</h1>
                    <div className='w-full h-[2vh] flex justify-start items-center gap-1 text-sm md:text-md'>
                        <span className='text-blue-500'>{`(${items.length})`}</span> Courses in Cart
                    </div>
                </div>
                <div className='w-full h-full flex flex-col md:flex-row justify-start items-start gap-10 py-5'>
                    <div className='w-full md:w-[70%] h-full flex flex-col justify-center items-center gap-20 md:gap-7'>
                        {items.map((items, index) => {
                            return (
                                <div key={index} className='w-full h-[12vh] flex flex-col justify-center items-center gap-2'>
                                    <hr className='w-[90%] text-gray-200' />
                                    <div className='relative w-full h-[12vh] flex justify-center items-start'>
                                        <div className='w-[30%] md:w-[20%] h-full'>
                                            <Image
                                                src={items.imageUrl}
                                                alt='item_pic'
                                                width={100}
                                                height={100}
                                                className='w-full h-full'
                                            />
                                        </div>
                                        <div className='w-[70%] h-full pl-2 md:pl-4 flex flex-col justify-between items-start gap-[1px]'>
                                            <div className='text-[10px] bg-blue-400 text-white py-[2px] px-1 rounded-md'>
                                                {items.hrs}HRS
                                            </div>
                                            <h2 className='text-sm md:text-md leading-5 font-bold'>{items.title}</h2>
                                            <div className='text-xs md:text-md text-gray-400 flex gap-1'>
                                                <Image
                                                    src={items.authorPicUrl}
                                                    alt='author_pic'
                                                    width={15}
                                                    height={15}
                                                    className='w-5 h-5'
                                                />
                                                by: <span className='text-blue-400 underline'>{items.by}</span>
                                                | <span>{items.lessons} Lessons</span>
                                                <span className='text-black font-semibold flex'>
                                                    <span className='mr-1'>
                                                        {items.ratings}
                                                    </span>
                                                    {Array(5).fill(0).map((_, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <svg className={`w-3 h-4 ${items.ratings < (index + 1) ? 'text-[#DADADA]' : 'text-[#F86537]'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                            </div>
                                                        );
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                handleRemoveItem(index)
                                            }}
                                            className='w-[40%] flex flex-col justify-center items-start gap-5'
                                        >
                                            <div className='w-full flex flex-col justify-start items-end'>
                                                <p className='font-semibold text-xs md:text-md text-blue-500'>${items.discountedPrice}.00</p>
                                                <p className='font-semibold text-xs md:text-md'><span className='text-gray-400 line-through'>{items.originalPrice}.00</span></p>

                                            </div>
                                            <Image
                                                src={TrashIcon}
                                                alt='trash_icon'
                                                width={20}
                                                height={20}
                                                className='absolute bottom-0 right-0'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-full md:w-[30%] min-h-[30vh] flex flex-col justify-center items-center bg-white rounded-lg p-5 md:p-5 gap-2 md:mt-0 mt-10'>
                        <div className='w-full flex justify-between items-center'>
                            <div className='w-1/2 flex justify-start items-start text-blue-500 font-bold'>
                                Total:
                            </div>
                            <div className='w-1/2 flex flex-col justify-end items-end'>
                                <h1 className='text-2xl font-bold'>${bill.totalDiscounted}.00</h1>
                                <h1 className='text-xl text-gray-500 line-through'>${bill.totalOriginal}.00</h1>
                                <h1 className='text-lg text-gray-600'>Discount {Math.round(bill.discountPercentage)}% off</h1>
                            </div>
                        </div>
                        <hr className='w-[80%] text-gray-300' />
                        <button className='w-full p-2 rounded-full border border-[#F86537] bg-[#F86537] text-sm md:text-md line-clamp-1 text-white'>
                            {`Proceed to checkout ->`}
                        </button>
                    </div>
                </div>
            </div>
           
        </div>

       
    )
}

export default ViewCart;
