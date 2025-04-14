

import React from 'react'
import { Link } from 'react-router-dom'

export default function RegisterButton() {
    return (
        <div className="mx-auto flex items-center justify-center">
            <div className="group relative cursor-pointer">
                <div className="flex text-xl items-center font-serif px-3 py-1 border border-gray-700 rounded-md transition-all hover:border-[#8B0000] hover:text-[#8B0000] cursor-pointer">
                    Register as..
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </span>
                </div>
                <div className="cursor-pointer invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                    <Link to="/register/buyer" className="my-2 cursor-pointer block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                        Buyer
                    </Link>
                    <Link to="/register/seller" className="my-2 cursor-pointer block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                        Seller
                    </Link>

                </div>
            </div>
        </div>
    )
}
