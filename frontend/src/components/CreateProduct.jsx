import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { productValidateSchema } from '../validators/productValidate';
import { useState } from 'react';

const CreateProduct = () => {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(productValidateSchema)
    })

    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken")
    const [file, setFile] = useState("")
    const [prevImage, setPrevImage] = useState("");


    const createProduct = async (data) => {
        const formData = new FormData();

        if (file !== "") {
            formData.append("pic", file)
        }
        formData.append("price", data.price)
        formData.append("description", data.description)
        formData.append("category", data.category)
        formData.append("name", data.name)


        try {
            const res = await axios.post("http://localhost:8000/product/create", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log("res", res)
            toast.success("Product added successfully")
            navigate("/seller")

        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    const handleCancel = () => {
        navigate("/seller")
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const imageURL = URL.createObjectURL(selectedFile);
            setPrevImage(imageURL); // ✅ Set a temporary image URL
        }

    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(createProduct)}>
                    <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
                        <div className="mb-6">
                            <label htmlFor="title" className="text-sm font-semibold leading-7 text-gray-600 mt-3">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                {...register('name')}
                                className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                            <p className='text-xs text-red-600 font-semibold'>{formState.errors.name?.message}</p>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="title" className="text-sm font-semibold leading-7 text-gray-600 mt-3">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                {...register('category')}
                                className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                            <p className='text-xs text-red-600 font-semibold'>{formState.errors.category?.message}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="text-sm leading-7 font-semibold text-gray-600">
                                Description
                            </label>
                            <textarea
                                name="description"
                                {...register('description')}
                                className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                defaultValue={""}
                            />
                            <p className='text-xs text-red-600 font-semibold'>{formState.errors.description?.message}</p>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="title" className="text-sm font-semibold leading-7 text-gray-600 mt-3">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                {...register('price')}
                                className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                            <p className='text-xs text-red-600 font-semibold'>{formState.errors.price?.message}</p>
                        </div>
                        <input type='file' accept=".png, .jpg, .jpeg" onChange={handleFileChange} />

                        {prevImage && (
                            <div className="mb-4">
                                <label className="text-sm font-semibold text-gray-600">Current Image</label>
                                <img src={prevImage} alt="Current Product" className="h-32 w-32 object-cover rounded mt-2" />
                            </div>
                        )}


                        <div className='flex justify-center gap-5'>

                            <button className="rounded border-0 mt-5 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" type='submit'>
                                Add
                            </button>
                            <button className="rounded border-0 mt-5 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" type='button' onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
