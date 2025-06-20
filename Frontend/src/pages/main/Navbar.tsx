import React from "react";
// import logo from "../../assets/png/glow.png";

type Props = {};

const Navbar: React.FC<Props> = () => {
  return (
    <nav className="w-screen h-20 flex justify-center items-center flex-row p-10  bg-[url('/textures/asfalt-light.png')] bg-repeat">
      <div className="w-full">
        <div className="bg-white w-7 h-1 rounded-full m-1"></div>
        <div className="bg-white w-7 h-1 rounded-full m-1"></div>
        <div className="bg-white w-7 h-1 rounded-full m-1"></div>
      </div>
      <div className="w-full">
        <ul className="w-full h-30 p-10 flex justify-center items-center flex-row">
          <li className="p-2 w-25 flex justify-center items-center text-lg text-white font-thin">Movies</li>
          <li className="p-2 w-25 flex justify-center items-center text-lg text-white font-thin">Events</li>
          <li className="p-2 w-25 flex justify-center items-center text-lg text-white font-thin">Sports</li>
          <li className="p-2 w-25 flex justify-center items-center text-lg text-white font-thin">Standups</li>
          <li className="p-2 w-25 flex justify-center items-center text-lg text-white font-thin">Streams</li>
          <li className="p-2 w-25 flex justify-center items-center text-lg text-white font-thin">Traditionals</li>
          <li className="p-2 w-25 flex justify-center items-center text-lg text-white font-thin">Concerts</li>
          <li className="p-2 w-40 flex justify-center items-center text-lg text-white font-thin">Health & Fitness</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
