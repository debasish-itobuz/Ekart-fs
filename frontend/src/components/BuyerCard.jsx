import React from 'react'
import { useState } from 'react'
import { SlNote } from "react-icons/sl";
import { FiTrash } from "react-icons/fi";
// import { myContext } from "../context/myContext.jsx";
// import { useNavigate } from 'react-router-dom';
import DeleteProductModal from './DeleteProductModal.jsx';
// import axios from 'axios';
// import toast from 'react-hot-toast';

export default function BuyerCard({ name, category, description, price, productId,  handlePayNow, pic }) {
        const [pics, setPics] = useState(pic);
        console.log("my pic", pics);
        console.log("my pic", setPics);

        // const role = localStorage.getItem("role")
        //     const accessToken = localStorage.getItem("accessToken")
        
            const handleBuyNow = () => {
                handlePayNow(productId, price)
            }
        

    return (
        <div>
          <div className="w-[400px] flex items-center justify-center bg-gray-200 dark:bg-gray-800">
    {/* product card */}
    <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
        <div className="h-[200px] w-full flex items-center justify-center bg-white">
            <img
                className="h-full w-full object-contain"
                src={pics}
                alt="Product"
            />
        </div>
        <div className="flex flex-col gap-1 mt-4 px-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
                {name}
            </h2>
            <span className="font-normal text-gray-600 dark:text-gray-300">
                {category}
            </span>
            <span className="font-normal text-gray-600 dark:text-gray-300">
                {description}
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-50">Rs {price}</span>
        </div>
        <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
            <button
                className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50"
                onClick={handleBuyNow}
            >
                <span className="text-base">Buy Now</span>
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </button>
        </div>
    </article>
</div>

        </div>
    )
}
