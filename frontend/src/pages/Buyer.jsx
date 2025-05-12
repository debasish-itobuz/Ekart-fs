import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '../components/Card'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
// import { myContext } from '../context/myContext'

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
    // const [product, setProduct] = useState([])
    const accessToken = localStorage.getItem("accessToken")
    // const role = localStorage.getItem("role")


    const [product, setProduct] = useState([])
    const [text, setText] = useState("")
    const [sortField, setSortField] = useState("name")
    const [sortOrder, setSortOrder] = useState("asc")
    const [debounce, setDebounce] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    useEffect(() => {
        const timer = setTimeout(() => {
            // console.log("my text", text);

            setDebounce(text)
        }, 500)
        return () => clearTimeout(timer)
    }, [text])


    const getAll = async (page = 1) => {
        try {
            const res = await axios.get(`http://localhost:8000/product/searchSortPaginate?sortField=${sortField}&sortOrder=${sortOrder}&searchText=${debounce}&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log("res", res)

            setProduct(res.data.product)
            setCurrentPage(res.data.pagination.currentPage)
            setTotalPage(Math.max(1, res.data.pagination.totalPages));

        } catch (error) {
            toast.error(error.reponse.data.message)
        }
    }

    const handleSortChange = (e) => {
        const [field, order] = e.target.value.split("-");
        console.log(field, order)
        setSortField(field)
        setSortOrder(order)
    }

    const handlePageChange = (page) => {
        // console.log("page val", page);

        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page)
            getAll(page)
        }
    }



    useEffect(() => {
        getAll(currentPage);
    }, [sortField, sortOrder, debounce, currentPage])




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


        <div className='flex justify-center mx-auto flex-wrap gap-6 mt-20 w-[1300px]'>
            {
                product.map((item, index) => {
                    return <Card key={index} name={item.name} productId={item._id} category={item.category} description={item.description} price={item.price} getAll={getAll} handlePayNow={handlePayNow} />
                })
            }
        </div>

        <div className="flex justify-center mt-10 gap-1">
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
