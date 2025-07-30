import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LoginUser } from "../../features/authenticaton/authSlice";

// Login page for user authentication
const Login: React.FC = () => {
  // Redux hooks for dispatching actions and selecting state
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { isLoading, error, isLoggedin } = useAppSelector((state) => state.auth);

  // Local state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // React Router hook for navigation
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  // Handle form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(LoginUser({ email, password }));
  };

  return (
    <>
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
          <motion.div
            className={`w-full m-2  flex justify-center items-center`}
          >
            <motion.h1
              className={`font-poppins text-3xl font-medium ${
                theme === "dark" ? "text-white" : "lightBoldText"
              }`}
            >
              Log In
            </motion.h1>
          </motion.div>
          {/* Login form */}
          <motion.form className="flex justify-center items-start flex-col" onSubmit={handleLogin}>
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
            {/* Show loading indicator while logging in */}
            {isLoading && (
              <motion.p className="text-blue-500 mt-2">Logging in...</motion.p>
            )}
            {/* Show error message if login fails */}
            {error && (
              <motion.p className="text-red-500 mt-2">{error}</motion.p>
            )}
            <motion.button
              className="p-2 w-full bg-black rounded-xl text-white mt-5"
              type="submit"
              disabled={isLoading}
            >
              Login
            </motion.button>
          </motion.form>
        </motion.div>
        <motion.div
          className={`text-sm font-medium ${
            theme === "dark" ? "text-white" : "lightText"
          } m-3`}
        >
          Don't have an account ?{" "}
          <motion.span className="text-sm font-medium mx-1 text-blue-600">
            <Link to="/Register">Sign up</Link>
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
