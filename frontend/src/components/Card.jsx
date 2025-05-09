import React, { useContext, useState } from 'react'
import { SlNote } from "react-icons/sl";
import { FiTrash } from "react-icons/fi";
import { myContext } from "../context/myContext.jsx";
import { useNavigate } from 'react-router-dom';
import DeleteProductModal from './DeleteProductModal.jsx';

const Card = ({ name, category, description, price, productId, getAll, handlePayNow }) => {

    const { setId } = useContext(myContext)
    const [openDelModal, setOpenDelModal] = useState(false)
    const role = localStorage.getItem("role")
    const navigate = useNavigate()

    const handleBuyNow = () => {
        handlePayNow(productId, price)
    }

    return (
        <div className='flex p-3'>
            <div className="w-[330px] rounded overflow-hidden shadow-lg flex justify-between">
                <div className="w-[70%] px-6 py-4 ">
                    <div className="font-bold text-xl mb-2 overflow-scroll no-scroll">{name}</div>
                    <p className="text-gray-700 text-base overflow-scroll no-scroll">{category}</p>
                    <p className="text-gray-700 text-base overflow-scroll no-scroll">{description}</p>
                    <p className="text-gray-700 text-base overflow-scroll no-scroll">{price}</p>
                </div>
                {role === "seller" ? (<div className='flex px-6 py-4 gap-5'>
                    <SlNote className="size-5 cursor-pointer" onClick={() => { setId(productId); navigate("/editProduct") }} />
                    <FiTrash className="size-5 cursor-pointer" onClick={() => { setId(productId); setOpenDelModal(true) }} />
                </div>) : (
                    <div className='flex items-start'>
                        <button className='bg-green-700 p-2 m-2 rounded size=4 text-nowrap text-white' onClick={handleBuyNow}>Buy Now</button>

                    </div>
                )}

            </div>
            {openDelModal && <DeleteProductModal setOpenDelModal={setOpenDelModal} getAll={getAll} />}
        </div>
    )
}

export default Card
