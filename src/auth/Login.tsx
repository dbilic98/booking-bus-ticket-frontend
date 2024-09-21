import React, { useState } from "react";
import loginImage from "../images/login.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { loginUser } from "../features/auth/authSlice";

const LogIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};

    if (!username.trim()) {
      formErrors.userName = "Email is required.";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required.";
    } else if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const resultAction = await dispatch(loginUser({ username, password }));
        const result = loginUser.fulfilled.match(resultAction);

        if (result) {
          navigate("/home");
        } else {
          setErrors({ general: "Login failed" });
        }
      } catch (error) {
        setErrors({ general: "Login failed" });
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block">
          <img
            src={loginImage}
            alt="Backgound"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center items-center p-8 mb-10">
          <div className="w-80">
            <h2 className="text-4xl font-bold mb-20 text-jet-black">
              Welcome to BMS
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-800"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.userName && (
                  <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Must be 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              {errors.general && (
                <p className="text-red-500 text-xs mt-1">{errors.general}</p>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-jet-black text-white rounded-sm hover:bg-gray-950 mt-16"
                >
                  {" "}
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm">
              Have an account?{" "}
              <a href="/registration" className="text-red-600">
                Register.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
