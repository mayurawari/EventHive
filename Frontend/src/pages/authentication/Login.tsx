import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LoginUser } from "../../features/authenticaton/authSlice";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { isLoading, error, isLoggedin } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <>
      <motion.div
        className={`${
          theme === "dark" ? "darkBg" : "lightBg"
        } w-full min-h-screen flex justify-center items-center flex-col p-4 sm:p-8`}
      >
        <motion.div
          className={`w-full max-w-sm sm:max-w-md rounded-3xl ${
            theme === "dark"
              ? "bg-transparent border border-white"
              : "bg-transparent border-2 border-[#FFA2B6]"
          } p-6 sm:p-10 shadow-md`}
        >
          <motion.div className="w-full mb-6 flex justify-center items-center">
            <motion.h1
              className={`font-poppins text-2xl sm:text-3xl font-medium ${
                theme === "dark" ? "text-white" : "lightBoldText"
              }`}
            >
              Log In
            </motion.h1>
          </motion.div>
          <motion.form
            className="flex flex-col gap-4"
            onSubmit={handleLogin}
          >
            <motion.label
              className={`text-base sm:text-lg font-medium ${
                theme === "dark" ? "text-white" : "lightBoldText"
              }`}
            >
              Email ID
            </motion.label>
            <motion.input
              placeholder="Type Your UserName"
              className={`border border-gray-400 rounded-xl p-2 w-full text-sm sm:text-base ${
                theme === "dark" ? "placeholder-blue-50" : "placeholder-black"
              } placeholder-opacity-25`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.label
              className={`text-base sm:text-lg font-medium ${
                theme === "dark" ? "text-white" : "lightBoldText"
              }`}
            >
              Password
            </motion.label>
            <motion.input
              placeholder="Type Your Password"
              className={`border border-gray-400 rounded-xl p-2 w-full text-sm sm:text-base ${
                theme === "dark" ? "placeholder-blue-50" : "placeholder-black"
              } placeholder-opacity-25`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isLoading && (
              <motion.p className="text-blue-500 mt-2 text-sm sm:text-base">
                Logging in...
              </motion.p>
            )}
            {error && (
              <motion.p className="text-red-500 mt-2 text-sm sm:text-base">
                {error}
              </motion.p>
            )}
            <motion.button
              className="p-3 w-full bg-black rounded-xl text-white mt-6 text-base sm:text-lg disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              Login
            </motion.button>
          </motion.form>
        </motion.div>
        <motion.div
          className={`text-sm sm:text-base font-medium mt-6 ${
            theme === "dark" ? "text-white" : "lightText"
          }`}
        >
          Don't have an account?{" "}
          <motion.span className="text-blue-600 hover:underline cursor-pointer">
            <Link to="/Register">Sign up</Link>
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
