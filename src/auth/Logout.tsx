import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../features/auth/authSlice";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button
      onClick={() => {
        handleLogout();
      }}
    >
      LOGOUT
    </button>
  );
};

export default LogOut;
