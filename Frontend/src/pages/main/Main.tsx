import React from "react";
import Navbar from "./Navbar";
import { motion } from "motion/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
type Props = {};

const Main: React.FC<Props> = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const navigate = useNavigate(); 

  return (
    <>
      <motion.div
        key={theme}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Navbar />
        <motion.div className="flex justify-end items-center flex-col">
          {theme === "dark" ? (
            <div className="w-full flex justify-center items-center">
              <motion.video
                width={"100%"}
                height={"100%"}
                autoPlay
                muted
                loop
                className="opacity-20 z-0 "
              >
                <source src={"https://res.cloudinary.com/dgfehnbu5/video/upload/v1751079981/16476271-hd_1920_1080_60fps_gjisdi.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </motion.video>
            </div>
          ) : (
            <div className="w-full h-screen flex justify-center items-center bg-[#EBE9E1]">
            </div>
          )}
          <div className="absolute flex justify-center items-center flex-col gap-1 top-30 right-50">
            <motion.p
              animate={{
                opacity: [0, 1],
                y: [10, 0],
              }}
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0,
                staggerChildren:0.25,
              }}
              className={`${
                theme === "dark" ? "text-white" : "text-[#E43D12]"
              } text-[80px] font-poppins font-bold`}
            >
              EventHive Fuels
            </motion.p>
            <motion.span
            animate={{
                opacity: [0, 1],
                y: [10, 0],
              }}
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0,
                delay:0.5
              }}
              className={`great-vibes-regular text-[80px] ${
                theme === "dark" ? "text-white" : "text-[#E43D12]"
              } font-bold`}
            >
              Their Fun
            </motion.span>

            <div>
              <motion.button onClick={()=>navigate('/Register')} className={`w-40 h-11 rounded-2xl text-[16px] font-medium ${theme==="dark" ? "text-white" :"text-[#E43D12]"} ${theme === "dark" ? "bg-black" : "bg-[#FFA2B6]"} font-poppins m-2`}>
                Create Profile
              </motion.button>
              <motion.button onClick={()=>navigate('/Login')} className={`w-40 h-11 rounded-2xl text-[16px] font-medium ${theme==="dark" ? "text-white" :"text-[#E43D12]"} ${theme === "dark" ? "bg-black" : "bg-[#FFA2B6]"} font-poppins m-2`}>
                Hop In
              </motion.button>
            </div>
          </div>
        </motion.div>
        <Footer/>
      </motion.div>
    </>
  );
};

export default Main;
