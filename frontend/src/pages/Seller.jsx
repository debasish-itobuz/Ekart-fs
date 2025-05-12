import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '../components/Card'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Seller = () => {
    const accessToken = localStorage.getItem("accessToken")

    const [product, setProduct] = useState([])


    const getAll = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/product/getAll`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log("res", res)

            setProduct(res.data.data)

        } catch (error) {
            toast.error(error.reponse.data.message)
        }
    }


    useEffect(() => {
        getAll();
    }, [])



    return (<>

        <Header />
        <div className='flex items-center justify-center'>

            {/* Modal button to add new Product only for seller */}
            <Link to="/createProduct">
                <button className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-5" type="submit">Add New Product</button>
            </Link>



        </div>


        <div className='flex justify-center mx-auto flex-wrap gap-6 mt-20 w-[1300px]'>
            {
                product.map((item, index) => {
                    return <Card key={index} name={item.name} productId={item._id} category={item.category} description={item.description} price={item.price} getAll={getAll} />
                })
            }
        </div>


        <Footer />
    </>
    )
}

export default Seller