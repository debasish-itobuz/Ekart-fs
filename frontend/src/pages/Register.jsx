import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import img from "../assets/shop.jpg";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import registerSchema from "../validators/registerSchema.js";

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(registerSchema),
    });
    const params = useParams()
    const role = params.role
    // console.log("role", role)
    const [toggle, setToggle] = useState(false);
    const onError = (errors, e) => console.log(errors, e);
    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`http://localhost:8000/auth/register/${role}`, data);
            console.log(res)
            if (res.data.success) {
                console.log(res.data)
                toast.success(
                    "Registration successful! Please check your email for the verification link."
                );


                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                toast.error(
                    res.data.message || "Registration failed. Please try again."
                );
                console.log("Registration failed. Please try again.")
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "An unexpected error occurred."
            );
            console.log(error)
        }
    };


    return (
        <>
            <div className="min-h-screen bg-purple-200">
                <Header />
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="flex items-center justify-center w-full mt-20 md:mt-30 px-5 sm:px-0">
                        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
                            <div className="hidden lg:block lg:w-1/2 bg-cover object-contain self-center p-5">
                                <img src={img}></img>
                            </div>
                            <div className="w-full p-8 lg:w-1/2 bg-sky-100">
                                <p className="text-xl text-gray-600 text-center capitalize">
                                    Register as {role}
                                </p>
                                <div className="mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Name
                                    </label>
                                    <input
                                        className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                        type="text"
                                        {...register("name")}
                                        required
                                    />
                                    <p className="text-xs text-red-600 font-semibold h-6">
                                        {formState.errors.userName?.message}
                                    </p>

                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                        type="email"
                                        {...register("email")}
                                        required
                                    />
                                    <p className="text-xs text-red-600 font-semibold h-6">
                                        {formState.errors.email?.message}
                                    </p>
                                    <label className="text-gray-700 text-sm font-bold mb-2">
                                        Password
                                    </label>
                                    {!toggle ? (
                                        <div className="relative">
                                            <input
                                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 mt-2"
                                                type="password"
                                                {...register("password")}
                                                required
                                            />
                                            <FaEyeSlash
                                                className="absolute inset-y-3 right-2 w-[20px]"
                                                onClick={() => setToggle(true)}
                                            />
                                        </div>
                                    ) : (<div className="relative">
                                        <input
                                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none mt-2"
                                            type="text"
                                            {...register("password")}
                                            required
                                        />
                                        <FaEye
                                            className="absolute inset-y-3 right-2 w-[20px]"
                                            onClick={() => setToggle(false)}
                                        />
                                    </div>)}

                                    <p className="text-xs text-red-600 font-semibold h-6">
                                        {formState.errors.password?.message}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                                        Register
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
                <Footer />
            </div>
        </>
    );
};

export default Register;
