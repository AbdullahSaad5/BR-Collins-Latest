'use client';

import NotFoundImage from '../../public/assets/notFound.svg';
import { Search } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center text-center bg-[#F3F6F8] px-4">
            <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row justify-between items-center gap-10 py-12">
                {/* Left Content */}
                <div className="w-full flex flex-col justify-center items-start gap-5 text-start">
                    <h1 className="text-4xl md:text-5xl font-bold text-black">
                        404 Not Found
                    </h1>
                    <h3 className="text-base md:text-lg text-gray-700 max-w-lg">
                        We couldn't find the page you requested. It may have been moved or deleted.
                    </h3>
                    <Link
                        href="/"
                        className="w-full sm:w-fit px-6 py-2 rounded-full border border-[#F86537] bg-[#F86537] text-white text-sm md:text-md hover:bg-[#f85624] transition"
                    >
                        Return to Home
                    </Link>

                    <p className="text-black font-semibold text-md">Or try searching instead</p>

                    <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[80%] xl:w-[65%] flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search..."
                            className="p-2 w-full outline-none"
                        />
                        <Search size={20} className="text-gray-600" />
                    </div>
                </div>

                {/* Right Image */}
                <div className="w-full lg:w-1/2">
                    <Image
                        src={NotFoundImage}
                        alt="not_found"
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
