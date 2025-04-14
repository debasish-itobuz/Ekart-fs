import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import RegisterButton from './RegisterButton';

function Header() {
    const user = localStorage.getItem("name");
    let status = localStorage.getItem("loginStatus");
    const [state, setState] = useState(status);
    const accessToken = localStorage.getItem("accessToken")

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {

            const res = await axios.delete('http://localhost:8000/auth/logout', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(res)
            setState(false);
            navigate("/login")
            toast.success("User Logged Out Successfully")
            localStorage.clear();

        } catch (error) {
            console.log(error);
        }
    }

    const handleLogin = () => {
        navigate("/login");
    }

    return (
        <nav className='flex justify-between bg-gray-100 p-2 lg:p-3'>
            <div className='flex gap-2'>
                <Link to="/">
                    <h1 className='self-center text-3xl cursor-pointer'>E Kart</h1></Link>

            </div>
            <div className=' flex gap-2'>

                {state ? (
                    <div className='flex gap-5 items-center capitalize'>
                        <p>Hello, {user}</p><div className="self-center text-xl font-serif px-3 py-1 border border-gray-700 rounded-md transition-all hover:border-[#8B0000] hover:text-[#8B0000] cursor-pointer" onClick={handleLogout}> Logout &rarr;</div>
                    </div>) : (
                    <>
                        <RegisterButton />
                        <div className="self-center text-xl font-serif px-3 py-1 border border-gray-700 rounded-md transition-all hover:border-[#8B0000] hover:text-[#8B0000] cursor-pointer" onClick={handleLogin}>Login &rarr;</div>

                    </>
                )
                }
            </div>
        </nav >
    )
}

export default Header
