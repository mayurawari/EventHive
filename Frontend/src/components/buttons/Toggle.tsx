import React from "react";
import { motion } from "motion/react";
import { toggleTheme } from "../../features/theme/themeSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import Sunsvg from "../../assets/svg/sun.svg?react"
import Moonsvg from "../../assets/svg/moon.svg?react"

type Props = {
  className: string;
};

const Toggle: React.FC<Props> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <>
      <motion.button
        onClick={() => dispatch(toggleTheme())}
        className="w-10 h-6 bg-[#D83F87] rounded-4xl"
      >
        <motion.div
        animate={{x: theme === "dark" ? 17 : 3 }}
        transition={{
            duration:0.5,
            ease: "anticipate"
        }}
         className={`w-[50%] h-5 rounded-full ${className} flex justify-center items-center`}
        >{theme === "dark" ? <Moonsvg className="w-5 h-4" /> : <Sunsvg className="w-5 h-4" /> }</motion.div>
      </motion.button>
    </>
  );
};

export default Toggle;
