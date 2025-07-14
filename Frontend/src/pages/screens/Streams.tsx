// import React from 'react'

import { useAppSelector } from "../../hooks/useAppSelector";
import Navbar from "../main/Navbar"

// type Props = {}

const Streams = () => {
  const theme =useAppSelector((state)=>state.theme.theme);
  return (
    <>
      <div className="w-full bg-[url('/textures/asfalt-light.png')] bg-repeat ">
    <Navbar/>
    {theme === "dark" ? (
            <div className="w-full h-screen flex justify-center items-center">
            </div>
          ) : (
            <div className="w-full h-screen flex justify-center items-center bg-[#EBE9E1]">
            </div>
          )}
    </div>
    </>
  );
}

export default Streams