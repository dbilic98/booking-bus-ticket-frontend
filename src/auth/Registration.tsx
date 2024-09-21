import React, { useState } from "react";
import registrationImage from "../images/registration.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { registerUser } from "../features/auth/authSlice";

const Registrations: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      formErrors.firstName = "First name is required.";
    }

    if (!lastName.trim()) {
      formErrors.lastName = "Last name is required.";
    }

    if (!username.trim()) {
      formErrors.userName = "Email is required.";
    }

    if (!createPassword.trim()) {
      formErrors.createPassword = "Password is required.";
    } else if (createPassword.length < 8) {
      formErrors.createPassword = "Password must be at least 8 characters.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const resultAction = await dispatch(
          registerUser({
            firstName,
            lastName,
            username: username,
            password: createPassword,
          })
        );
        const result = registerUser.fulfilled.match(resultAction);

        if (result) {
          navigate("/login");
        } else {
          setErrors({ general: "Registration failed" });
        }
      } catch (error) {
        setErrors({ general: "Registration failed" });
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block">
          <img
            src={registrationImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center items-center p-8 mb-10">
          <div className=" w-72">
            <h2 className="text-4xl font-bold mb-14 text-jet-black">Join us</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-800"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Enter your full name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Enter your full name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
                {errors.userName && (
                  <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="createPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Create password
                </label>
                <input
                  type="password"
                  id="createPassword"
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Must be 8 characters"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                />
                {errors.createPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.createPassword}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-jet-black text-white rounded-sm hover:bg-gray-950 mt-16"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm">
              Have an account?{" "}
              <a href="/login" className="text-red-600">
                Login.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrations;
