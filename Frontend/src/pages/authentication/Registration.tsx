// [FE/frontend.md > App Flows > Authentication]: Registration component with backend integration
// [FE/designing.md > Colors]: UI uses design system color palette
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RegisterUser } from "../../features/authenticaton/authSlice";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { isLoading, error, isLoggedin } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(RegisterUser({ username, email, password }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${
        theme === "dark" ? "darkBg" : "lightBg"
      } w-full min-h-screen flex justify-center items-center flex-col px-3`}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-xs sm:max-w-sm md:max-w-md rounded-3xl ${
          theme === "dark"
            ? "bg-transparent border border-white"
            : "bg-transparent border-2 border-[#FFA2B6]"
        } p-5 sm:p-8`}
      >
        <motion.div className="w-full m-2 flex justify-center items-center">
          <motion.h1
            className={`font-poppins text-3xl font-medium ${
              theme === "dark" ? "text-white" : "lightBoldText"
            }`}
          >
            Create Profile
          </motion.h1>
        </motion.div>
        <motion.form
          className="flex justify-center items-start flex-col"
          onSubmit={handleRegister}
        >
          <motion.label
            className={`text-lg font-medium ${
              theme === "dark" ? "text-white" : "lightBoldText"
            }`}
          >
            Username
          </motion.label>
          <motion.input
            placeholder="Type Your Full Name"
            className={`border border-gray-400 rounded-xl p-2 w-full ${
              theme === "dark" ? "placeholder-blue-50" : "placeholder-black"
            } ${
              theme === "dark" ? "text-white" : "lightText"
            } text-xs placeholder-opacity-25`}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            } ${
              theme === "dark" ? "text-white" : "lightText"
            } text-xs placeholder-opacity-25`}
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
            } ${
              theme === "dark" ? "text-white" : "lightText"
            } text-xs placeholder-opacity-25`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isLoading && (
            <motion.p className="text-blue-500 mt-2">Registering...</motion.p>
          )}
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mt-2 text-center bg-red-50 p-2 rounded-lg"
            >
              {error}
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-3 w-full bg-buttonBlack text-white rounded-xl mt-5 hover:bg-gray-800 transition-colors disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            Register
          </motion.button>
        </motion.form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`text-sm font-medium ${
          theme === "dark" ? "text-white" : "text-gray-600"
        } m-3`}
      >
        Already have an account?{" "}
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="text-primary hover:underline cursor-pointer font-semibold"
        >
          <Link to="/Login">Login In</Link>
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Register;
