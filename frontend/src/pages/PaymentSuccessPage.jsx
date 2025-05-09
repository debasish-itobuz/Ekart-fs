import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccessPage = () => {
  const searchQuery = useSearchParams()[0];
  const reference = searchQuery.get("reference");
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  let paymentId = "N/A";
  let orderId = "N/A";

  if (reference) {
    [paymentId, orderId] = reference.split(",");
  }

  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <Confetti width={width} height={height} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-center mb-4 text-green-600">
            Payment Successful!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Thank you for your purchase.
          </p>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Order ID:</p>
            <p className="text-gray-600">{orderId}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Payment ID:</p>
            <p className="text-gray-600">{paymentId}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700">Date:</p>
            <p className="text-gray-600">{currentDate}</p>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/home")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessPage;