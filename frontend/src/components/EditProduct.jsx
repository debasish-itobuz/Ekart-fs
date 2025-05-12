import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { myContext } from '../context/myContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { productValidateSchema } from '../validators/productValidate';

const EditProduct = () => {
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(productValidateSchema)
  })
  const { id } = useContext(myContext)
  // console.log("id", id)
  const accessToken = localStorage.getItem("accessToken")
  const navigate = useNavigate()

  const getProduct = async () => {
    try {

      const res = await axios.get(`http://localhost:8000/product/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      // console.log("product", res);
      const name = res.data.data.name
      const category = res.data.data.category
      const description = res.data.data.description
      const price = res.data.data.price

      setValue('name', name)
      setValue('category', category)
      setValue('description', description)
      setValue('price', price)
    } catch (error) {
      console.log(error)
    }

  }

  const updateProduct = async (data) => {
    try {
      const res = await axios.put(`http://localhost:8000/product/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log("res", res);
      toast.success("Product updated Successfully")
      navigate("/seller")

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleCancel = () => {
    navigate('/seller')
  }


  useEffect(() => {
    getProduct()
  }, [id])


  return (
    <div>
      <form onSubmit={handleSubmit(updateProduct)}>
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
          <div className='flex justify-center gap-5'>

            <button className="rounded border-0 mt-5 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" type='submit'>
              Update
            </button>
            <button className="rounded border-0 mt-5 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" type='button' onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
