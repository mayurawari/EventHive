import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RegisterUser } from "../../features/authenticaton/authSlice";

// Registration page for new users
const Register: React.FC = () => {
  // Redux hooks for dispatching actions and selecting state
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { isLoading, error, isLoggedin } = useAppSelector((state) => state.auth);

  // Local state for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // React Router hook for navigation
  const navigate = useNavigate();

  // Redirect to home if already logged in (after registration)
  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  // Handle form submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(RegisterUser({ name, email, password }));
  };

  return (
    <motion.div
      className={`${
        theme === "dark" ? "darkBg" : "lightBg"
      } w-full h-screen flex justify-center items-center flex-col `}
    >
      <motion.div
        className={`w-120  rounded-3xl ${
          theme === "dark"
            ? "bg-transparent border border-white"
            : "bg-transparent border-2 border-[#FFA2B6]"
        } p-5`}
      >
        <motion.div className={`w-full m-2  flex justify-center items-center`}>
          <motion.h1
            className={`font-poppins text-3xl font-medium ${
              theme === "dark" ? "text-white" : "lightBoldText"
            }`}
          >
            Create Profile
          </motion.h1>
        </motion.div>
        {/* Registration form */}
        <motion.form className="flex justify-center items-start flex-col" onSubmit={handleRegister}>
          <motion.label
            className={`text-lg font-medium ${
              theme === "dark" ? "text-white" : "lightBoldText"
            }`}
          >
            Name
          </motion.label>
          <motion.input
            placeholder="Type Your Full Name"
            className={`border border-gray-400 rounded-xl p-2 w-full ${
              theme === "dark" ? "placeholder-blue-50" : "placeholder-black"
            } text-xs placeholder-opacity-25 `}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <motion.label
            className={`text-lg font-medium ${
              theme === "dark" ? "text-white" : "lightBoldText"
            } mt-4`}
          >
            Email ID
          </motion.label>
          <motion.input
            placeholder="Type Your UserName"
            className={`border border-gray-400 rounded-xl p-2 w-full ${
              theme === "dark" ? "placeholder-blue-50" : "placeholder-black"
            } text-xs placeholder-opacity-25 `}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.label
            className={`text-lg font-medium ${
              theme === "dark" ? "text-white" : "lightBoldText"
            } mt-4`}
          >
            Password
          </motion.label>
          <motion.input
            placeholder="Type Your Password"
            className={`border border-gray-400 rounded-xl p-2 w-full ${
              theme === "dark" ? "placeholder-blue-50" : "placeholder-black"
            } text-xs placeholder-opacity-25 `}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Show loading indicator while registering */}
          {isLoading && (
            <motion.p className="text-blue-500 mt-2">Registering...</motion.p>
          )}
          {/* Show error message if registration fails */}
          {error && (
            <motion.p className="text-red-500 mt-2">{error}</motion.p>
          )}
          <motion.button
            className="p-2 w-full bg-black rounded-xl text-white mt-5"
            type="submit"
            disabled={isLoading}
          >
            Register
          </motion.button>
        </motion.form>
      </motion.div>
      <motion.div
        className={`text-sm font-medium ${
          theme === "dark" ? "text-white" : "lightText"
        } m-3`}
      >
        Already have an account ?{" "}
        <motion.span className="text-sm font-medium mx-1 text-blue-600">
          <Link to="/Login">Login In</Link>
        </motion.span>
      </motion.div>
    </motion.div>
  );
};
export default Register;
