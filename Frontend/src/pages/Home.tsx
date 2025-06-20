import type React from "react";
import { AnimatePresence, motion } from "motion/react";
import EventhiveSplash from "./splashscreen/EventhiveSplash";
import { useEffect, useState } from "react";
import Main from "./main/Main";

const Home: React.FC = () => {
  const [splascreenFlag, setSplashScreenFlag] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplashScreenFlag(false);
    }, 3500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>

    <AnimatePresence mode="wait" >
        {splascreenFlag ? (
          <EventhiveSplash key="splash" />
        ): (
          <Main/> 
        )
      }
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
