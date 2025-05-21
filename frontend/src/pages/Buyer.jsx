import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BuyerCard from '../components/BuyerCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, setCurrentPage, setDebouncedSearch, setSortField, setSortOrder } from '../features/ProductSlice'

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const Buyer = () => {
    const accessToken = localStorage.getItem("accessToken")
    const dispatch = useDispatch()

    const [text, setText] = useState("")

    const sortOrder = useSelector((state) => state.app.sortOrder)
    const sortField = useSelector((state) => state.app.sortField)
    const currentPage = useSelector((state) => state.app.currentPage)
    const debouncedSearch = useSelector((state) => state.app.debouncedSearch)
    const totalPage = useSelector((state) => state.app.totalPage);
    const { product } = useSelector((state) => state.app)

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setDebouncedSearch(text));
        }, 500)
        return () => clearTimeout(timer)
    }, [text])


    useEffect(() => {
        const params = {
            sortField: sortField,
            sortOrder: sortOrder,
            searchText: debouncedSearch,
            page: currentPage,
        }
        dispatch(getAllProducts(params))
    }, [sortField, sortOrder, debouncedSearch, currentPage])

    const handleSortChange = (e) => {
        const [field, order] = e.target.value.split("-");
        console.log(field, order)
        dispatch(setSortField(field))
        dispatch(setSortOrder(order))
    }


    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPage) {
            dispatch(setCurrentPage(page));
        }
    };


    const handlePayNow = async (id, amount) => {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay failed to load!!')
            return
        }

        const { data: { key } } = await axios.get("http://localhost:8000/api/payment/getKey")
        console.log(key)
        const { data: { data } } = await axios.post(`http://localhost:8000/payment/paymentCheckout/${id}`, { amount }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('data', data)
        const options = {
            key: key,
            amount: data.amount,
            currency: "INR",
            name: "Ekart",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: data.id,
            callback_url: "http://localhost:8000/payment/paymentVerification",
            notes: { "address": "Razorpay Corporate Office" },
            theme: { "color": "orange" }
        };

        const paymentObject = new window.Razorpay(options);


        paymentObject.on("payment.failed", async (response) => {
            try {
                console.log("my ressss", response);
                const order_id = response.error.metadata.order_id;
                const payment_id = response.error.metadata.payment_id;
                console.log("oooo", order_id);
                console.log("pay", payment_id);
                await axios.post(
                    `http://localhost:8000/payment/paymentFailed/${order_id}/${payment_id}`, {}
                );
            } catch (error) {
                console.log("my error", error);
            }
        });


        paymentObject.open();
    }

    return (<>

        <Header />
        <div className='flex items-center justify-center'>


            <div className="p-4 text-gray-600 dark:text-gray-300 outline-none focus:outline-none">
                <div className="relative flex">
                    <select className="bg-white text-gray-600  h-10 px-8 rounded-l-full text-sm focus:outline-none outline-none border-2 border-gray-500 dark:border-gray-600 border-r-1 cursor-pointer max-h-10 overflow-y-hidden" onChange={handleSortChange}>
                        <option className="font-medium cursor-pointer" value="filter" >
                            Select
                        </option>
                        <option className="font-medium cursor-pointer" value="name-asc">
                            name-asc
                        </option>
                        <option className="font-medium cursor-pointer" value="name-desc">
                            name-desc
                        </option>

                    </select>
                    <input
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="bg-white text-black h-10 flex px-5 w-full rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-gray-500 dark:border-gray-600"
                        autoComplete="off"
                        spellCheck="false"
                        required=""
                        step="any"
                        autoCapitalize="none"
                        onChange={(e) => { setText(e.target.value) }}
                        value={text}
                    />

                </div>
            </div>

        </div>


        <div className='flex justify-center mx-auto flex-wrap gap-6 mt-5 w-[1300px]'>
            {
                product?.map((item, index) => {
                    return <BuyerCard key={index} name={item.name} productId={item._id} category={item.category} description={item.description} price={item.price} handlePayNow={handlePayNow} pic={item.pic} />
                })
            }
        </div>

        <div className="flex justify-center mt-10 gap-1 mb-20">
            <button
                type="button"
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-lg text-center disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <span className="px-3 py-1 md:px-4 md:py-2">
                Page {currentPage} of {totalPage}
            </span>

            <button
                type="button"
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-lg text-center disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
            >
                Next
            </button>
        </div>

        <Footer />
    </>
    )
}

export default Buyer
