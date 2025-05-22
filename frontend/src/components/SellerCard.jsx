import { useState } from 'react'
import { SlNote } from "react-icons/sl";
import { FiTrash } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import DeleteProductModal from './DeleteProductModal.jsx';
import { useDispatch } from 'react-redux';
import { setId } from '../features/ProductSlice.js';

const SellerCard = ({ name, category, description, price, productId, pic }) => {
    const dispatch = useDispatch();
    const [openDelModal, setOpenDelModal] = useState(false)
    let pics = pic
    const navigate = useNavigate()

    const handleEdit = () => {
        dispatch(setId(productId));
        navigate("/editProduct");
    }

    const handleDelete = () => {
        dispatch(setId(productId));
        setOpenDelModal(true);
    }

    return (
        <div className="flex items-center justify-center p-4 mb-10">
            <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
                <div className="h-[200px] w-full flex items-center justify-center bg-white">
                    {pics ? (
                        <img className="h-full w-[500px] object-contain" src={pics} alt="Product" />
                    ) : (
                        <div className="text-gray-400">No Image</div>
                    )}
                </div>

                <div className="flex flex-col gap-1 mt-4 px-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">{name}</h2>
                    <span className="font-normal text-gray-600 dark:text-gray-300">{category}</span>
                    <span className="font-normal text-gray-600 dark:text-gray-300">{description}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-50">Rs {price}</span>
                </div>


                <div className="flex justify-between items-center px-4 py-4 border-t border-gray-200 dark:border-gray-500">
                    <button onClick={handleEdit} className="text-blue-600 dark:text-blue-300 hover:underline flex items-center gap-2">
                        <SlNote className="text-xl" /> Edit
                    </button>
                    <button onClick={handleDelete} className="text-red-600 dark:text-red-300 hover:underline flex items-center gap-2">
                        <FiTrash className="text-xl" /> Delete
                    </button>
                </div>


            </article>

            {openDelModal && (
                <DeleteProductModal setOpenDelModal={setOpenDelModal} />
            )}
        </div>
    )
}

export default SellerCard;
