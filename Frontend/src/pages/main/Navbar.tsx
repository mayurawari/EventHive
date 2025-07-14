import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
// import logo from "../../assets/png/logo.png";
import Toggle from "../../components/buttons/Toggle";
import { useAppSelector } from "../../hooks/useAppSelector";

type Props = {};

const Navbar: React.FC<Props> = () => {
  const theme = useAppSelector((state)=> state.theme.theme)
  return (
    <motion.nav key={theme} initial= {{opacity:0}}
    animate={{opacity:1, width:"100%",backgroundColor : theme === "dark" ? "" : "#ebe9e1"}}
    transition={{
      duration: 0,
      ease:"easeInOut"
    }}
    className="h-20 flex justify-center items-center flex-row p-10">
      <motion.div className="w-full">
        <div className={`${theme === "dark" ? "bg-white" : "bg-[#d6536d]"} w-6 h-0.5 rounded-full m-1`}></div>
        <div className={`${theme === "dark" ? "bg-white" : "bg-[#d6536d]"} w-6 h-0.5 rounded-full m-1`}></div>
        <div className={`${theme === "dark" ? "bg-white" : "bg-[#d6536d]"} w-6 h-0.5 rounded-full m-1`}></div>
      </motion.div>
      <motion.div
      initial={{
        opacity:0,
        zIndex:0
      }}
      animate={{
        opacity:1,
        zIndex:1
      }}
      transition={{
        duration:1,
        ease:"easeInOut"
      }}
       className={`z-1 tracking-wide absolute left-0 mr-56 top-36 font-poppins font-extrabold text-[80px] text-white flex justify-end items-start ${theme === "dark" ? "bg-[#db3f88]" : "bg-black" } bg-[url('/textures/skulls.png')] bg-repeat rounded-bl-md rounded-tl-md p-4 rotate-270`}>
        EventHive
      </motion.div>
      <motion.div className="w-full flex justify-center items-center flex-row">
        <ul className="w-full h-30 p-1 flex justify-center items-center flex-row">
          <li className={`p-2 w-23 flex justify-center items-center text-[16px] font-poppins ${theme === "dark" ? "text-white" : "text-[#d6536d]" } font-[500]`}>
            <Link to="/">Home</Link>
          </li>
          <li className={`p-2 w-23 flex justify-center items-center text-[16px] font-poppins ${theme === "dark" ? "text-white" : "text-[#d6536d]" } font-[500]`}>
            <Link to="/Movies">Movies</Link>
          </li>
          <li className={`p-2 w-23 flex justify-center items-center text-[16px] font-poppins ${theme === "dark" ? "text-white" : "text-[#d6536d]" } font-[500]`}>
            <Link to="/Events">Events</Link>
          </li>
          <li className={`p-2 w-23 flex justify-center items-center text-[16px] font-poppins ${theme === "dark" ? "text-white" : "text-[#d6536d]" } font-[500]`}>
            <Link to="/Sports">Sports</Link>
          </li>
          <li className={`p-2 w-25 flex justify-center items-center text-[16px] font-poppins ${theme === "dark" ? "text-white" : "text-[#d6536d]" } font-[500]`}>
            <Link to="/Standups">Standups</Link>
          </li>
          <li className={`p-2 w-25 flex justify-center items-center text-[16px] font-poppins ${theme === "dark" ? "text-white" : "text-[#d6536d]" } font-[500]`}>
            <Link to="/Streams">Streams</Link>
          </li>
          <li className={`p-2 w-25 flex justify-center items-center text-[16px] font-poppins ${theme === "dark" ? "text-white" : "text-[#d6536d]" } font-[500]`}>
            <Link to="/Traditional">Traditionals</Link>
          </li>
          <li className={`p-2 w-25 flex justify-center items-center text-[16px] font-poppins ${theme === "dark" ? "text-white" : "text-[#d6536d]" } font-[500]`}>
            <Link to="/Concerts">Concerts</Link>
          </li>
          <li className={`p-2 w-40 flex justify-center items-center text-[16px] font-poppins ${theme === "dark" ? "text-white" : "text-[#d6536d]" } font-[500]`}>
            <Link to="/HealthandFitness">Health & Fitness</Link>
          </li>
        </ul>
      </motion.div>
      <div>
      <Toggle className="" />
    </div>
    </motion.nav>
  );
};

export default Navbar;
