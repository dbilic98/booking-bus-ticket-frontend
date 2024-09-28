import {useNavigate } from "react-router-dom";

import { MdCloudDone } from "react-icons/md";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen p-28">
      <div className="bg-cream p-2 sm:p-6 md:p-8 lg:p-10 shadow-lg rounded-md w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-center mb-1">
          PAYMENT SUCCESSFUL
        </h2>
        <p className="text-center text-emerald-900 mb-4">
          Your payment has been successfully processed.
        </p>
        <div className="flex items-center justify-center mb-10">
          <MdCloudDone className="text-9xl text-emerald-900" />
        </div>
        <button
          className="bg-jet-black text-white px-24 py-3 rounded-md"
          onClick={() => navigate("/home")}
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
