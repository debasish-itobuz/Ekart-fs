import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import SellerCard from '../components/SellerCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../features/ProductSlice'

const Seller = () => {

    const dispatch = useDispatch()
    const { sellerProduct } = useSelector((state) => state.app)

    useEffect(() => {
        dispatch(getAll())
    }, [])


    return (<>

        <Header />
        <div className='flex items-center justify-center'>

            {/* Modal button to add new Product only for seller */}
            <Link to="/createProduct">
                <button className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-5" type="submit">Add New Product</button>
            </Link>

        </div>

        <div className='flex justify-center mx-auto flex-wrap gap-6 mt-10 w-[1300px]'>
            {
                sellerProduct.map((item, index) => {
                    return <SellerCard key={index} name={item.name} productId={item._id} category={item.category} description={item.description} price={item.price} pic={item.pic} />
                })
            }
        </div>

        <Footer />
    </>
    )
}

export default Seller