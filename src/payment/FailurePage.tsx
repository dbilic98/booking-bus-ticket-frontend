import React from "react";
import { useNavigate } from "react-router-dom";

const FailurePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Payment Failed</h1>
      <p>There was an issue with your payment. Please try again.</p>
      <button onClick={() => navigate("/")}>Go Back to Home</button>
    </div>
  );
};

export default FailurePage;
