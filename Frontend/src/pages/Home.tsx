import type React from "react";
import { AnimatePresence } from "motion/react";
import EventhiveSplash from "./splashscreen/EventhiveSplash";
import { useEffect, useState } from "react";
import Main from "./main/Main";

const Home: React.FC = () => {
  const [splashscreenFlag, setSplashScreenFlag] = useState<boolean>(()=>JSON.parse(localStorage.getItem("splashShown") || "true"));

  useEffect(() => {
    let timeout: any;
    if(splashscreenFlag){
      timeout = setTimeout(() => {
        setSplashScreenFlag(false);
        localStorage.setItem("splashShown" , "false");
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="bg-[url('/textures/asfalt-light.png')] bg-repeat">
      <AnimatePresence mode="wait">
        {splashscreenFlag ? <EventhiveSplash key="splash" /> : <Main />}
      </AnimatePresence>
    </div>
  );
};

export default Home;

// <motion.div
//   drag
//   dragConstraints={{
//     top: 0,
//     left: 0,
//     right: 1200,
//     bottom: 500,
//   }}
//   dragDirectionLock
//   animate={{
//     x: [0, 1000, 1000, 0, 0],
//     y: [0, 0, 500, 500, 0],
//     rotate: [0, 720, 0, -720, 0],
//   }}
//   transition={{
//     duration: 5,
//     delay: 1,
//     repeat: Infinity,
//   }}
//   className="text-2xl text-black font-medium bg-amber-50 w-20 h-20"
// >
//   Home
// </motion.div>
