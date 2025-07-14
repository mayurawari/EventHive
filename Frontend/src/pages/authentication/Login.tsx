import React from "react";
import { motion } from "motion/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Link } from "react-router-dom";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const theme = useAppSelector((state)=> state.theme.theme);
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
          <motion.form className="flex justify-center items-start flex-col">
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
            />
            <motion.button className="p-2 w-full bg-black rounded-xl text-white mt-5">
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
