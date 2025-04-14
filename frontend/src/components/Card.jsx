import React, { useContext, useState } from 'react'
import { SlNote } from "react-icons/sl";
import { FiTrash } from "react-icons/fi";
import { myContext } from "../context/myContext.jsx";
import { useNavigate } from 'react-router-dom';
import DeleteProductModal from './DeleteProductModal.jsx';

const Card = ({ name, category, description, price, productId, getAll }) => {

    const { setId } = useContext(myContext)
    const [openDelModal, setOpenDelModal] = useState(false)
    const role = localStorage.getItem("role")
    const navigate = useNavigate()
    return (
        <div className='flex p-3'>
            <div className="w-[300px] rounded overflow-hidden shadow-lg flex justify-between">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{name}</div>
                    <p className="text-gray-700 text-base">{category}</p>
                    <p className="text-gray-700 text-base">{description}</p>
                    <p className="text-gray-700 text-base">{price}</p>
                </div>
                {role === "seller" && <div className='flex px-6 py-4 gap-5'>
                    <SlNote className="size=5 cursor-pointer" onClick={() => { setId(productId); navigate("/editProduct") }} />
                    <FiTrash className="size=5 cursor-pointer" onClick={() => { setId(productId); setOpenDelModal(true) }} />
                </div>}

            </div>
            {openDelModal && <DeleteProductModal setOpenDelModal={setOpenDelModal} getAll={getAll} />}
        </div>
    )
}

export default Card
