import React from "react";
import Navbar from "./Navbar";
import { motion } from "motion/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import ShinyText from "../../Designer components/ShinyText";
import TextType from "../../Designer components/TextType";

type Props = {};

const Main: React.FC<Props> = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const sidebarOpen = useAppSelector((state) => state.sidebar.isOpen);

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
                className="opacity-20 image-full h-screen object-cover"
              >
                <source
                  src={
                    "https://res.cloudinary.com/dgfehnbu5/video/upload/v1751079981/16476271-hd_1920_1080_60fps_gjisdi.mp4"
                  }
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </motion.video>
            </div>
          ) : (
            <div className="w-full h-screen flex justify-center items-center bg-[#EBE9E1]"></div>
          )}
          <div
            className={`absolute flex justify-center items-center flex-col gap-1 top-50 z-10 w-full px-4 md:opacity-100 ${
              sidebarOpen ? "pointer-events-none opacity-2" : ""
            }`}
          >
            <motion.p
              animate={{
                opacity: [0, 1],

                y: [10, 0],
              }}
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0,
                staggerChildren: 0.25,
              }}
              className={`${
                theme === "dark" ? "text-white" : "text-[#E43D12]"
              } text-[16px]  font-poppins font-[400] sm:text-xl md:text-xl lg:text-2xl`}
            >
              <TextType
                text={[
                  "Welcome Aboard to EventHive",
                  "For Event Enthusiasts",
                  "Happy Exploring!",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </motion.p>
            <motion.p
              animate={{
                opacity: [0, 1],

                y: [10, 0],
              }}
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0,
                staggerChildren: 0.25,
              }}
              className={`${
                theme === "dark" ? "text-white" : "text-[#E43D12]"
              } text-[30px]  font-poppins font-bold sm:text-4xl md:text-5xl lg:text-6xl mt-5`}
            >
              <ShinyText
                text="EventHive Fuels"
                disabled={false}
                speed={1}
                className="custom-class"
              />
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
                delay: 0.5,
              }}
              className={`great-vibes-regular  ${
                theme === "dark" ? "text-white" : "text-[#E43D12]"
              } font-bold text-[30px] sm:text-4xl md:text-5xl lg:text-6xl sm-align-center sm-justify-center`}
            >
              <ShinyText
                text="Their Fun"
                disabled={false}
                speed={2}
                className="custom-class"
              />
            </motion.span>

            <div className="flex justify-center items-center flex-col gap-2 mt-5 sm:flex-row">
              <motion.button
                onClick={() => navigate("/Register")}
                className={`w-60 h-11 rounded-2xl text-[16px] font-medium ${
                  theme === "dark" ? "text-white" : "text-[#E43D12]"
                } ${
                  theme === "dark" ? "bg-black" : "bg-[#FFA2B6]"
                } font-poppins m-2`}
              >
                Register as an Organizer
              </motion.button>
              <motion.button
                onClick={() => navigate("/Login")}
                className={`w-40 h-11 rounded-2xl text-[16px] font-medium ${
                  theme === "dark" ? "text-white" : "text-[#E43D12]"
                } ${
                  theme === "dark" ? "bg-black" : "bg-[#FFA2B6]"
                } font-poppins m-2`}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
        <Footer />
      </motion.div>
    </>
  );
};

export default Main;
