import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <div className="flex flex-col gap-5 justify-center items-center pt-32 px-5">
            <h1 className="text-9xl text-red-400">404</h1>
            <p className="text-5xl font-thin text-orange-300 text-center">Page Not Found</p>
            <p className="text-2xl text-center text-gray-400">The page you are looking for dose not exists</p>
            <Link to='/' className="bg-white px-10 py-2 rounded-lg hover:bg-gray-200 font-bold mt-10">
                <button>Home</button>
            </Link>
        </div>
    )
}

export default ErrorPage