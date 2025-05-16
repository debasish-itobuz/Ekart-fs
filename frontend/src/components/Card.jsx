import { useContext, useState } from 'react'
import { SlNote } from "react-icons/sl";
import { FiTrash } from "react-icons/fi";
import { myContext } from "../context/myContext.jsx";
import { useNavigate } from 'react-router-dom';
import DeleteProductModal from './DeleteProductModal.jsx';
// import axios from 'axios';
// import toast from 'react-hot-toast';


const Card = ({ name, category, description, price, productId, getAll, handlePayNow, pic }) => {

    const { setId } = useContext(myContext)
    const [openDelModal, setOpenDelModal] = useState(false)
    let pics = pic
    console.log("my pic", pics);



    const role = localStorage.getItem("role")
    // const accessToken = localStorage.getItem("accessToken")
    const navigate = useNavigate()

    const handleBuyNow = () => {
        handlePayNow(productId, price)
    }


    // const handleFileUpload = async (event) => {
    //     const file = event.target.files[0];
    //     try {
    //         const formData = new FormData();
    //         formData.append("pic", file);
    //         const res = await axios.post(`http://localhost:8000/product/pic/${productId}`, formData, { headers: { 'Authorization': `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" } });

    //         console.log("pic", res)
    //         if (res.data.success) {
    //             setPics(res.data.data)
    //             localStorage.setItem(`pic/${name}`, res.data.data)
    //             toast.success("Picture uploaded successfully!");
    //         }
    //     } catch (error) {
    //         toast.error(error.response?.data?.message || "Failed to upload file");
    //         console.error("Error updating image:", error);
    //     }
    // }


    return (
        <div className='flex p-3'>
            <div className="w-[380px] h-[190px] rounded overflow-hidden shadow-lg flex ">
                <div className="w-[35%] px-2 py-3 ">
                    <div className="font-bold text-xl mb-2 overflow-scroll no-scroll">{name}</div>
                    <p className="text-gray-700 text-base overflow-scroll no-scroll">{category}</p>
                    <p className="text-gray-700 text-base overflow-scroll no-scroll">{description}</p>
                    <p className="text-gray-700 text-base overflow-scroll no-scroll">{price}</p>
                </div>
                {role === "seller" ? (<div className='flex flex-col px-2 py-3 gap-5'>

                    <div className=' flex gap-3'>
                        <SlNote className="size-5 cursor-pointer ms-3" onClick={() => { setId(productId); navigate("/editProduct") }} />
                        <FiTrash className="size-5 cursor-pointer" onClick={() => { setId(productId); setOpenDelModal(true) }} />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 break-all">
                            {pics ? (<img className='w-[70px] h-[70px]' src={pics} alt={pics} />) : (<></>)}
                        </p>
                    </div>


                </div>) : (
                    <div className='flex flex-col items-start'>
                        <button className='bg-green-700 p-2 m-2 rounded size=4 text-nowrap text-white' onClick={handleBuyNow}>Buy Now</button>

                        {pics ? (<img className='w-[70px] h-[70px]' src={pics} alt={pics} />) : (<></>)}

                    </div>
                )}

            </div>
            {openDelModal && <DeleteProductModal setOpenDelModal={setOpenDelModal} getAll={getAll} />}
        </div>
    )
}

export default Card
