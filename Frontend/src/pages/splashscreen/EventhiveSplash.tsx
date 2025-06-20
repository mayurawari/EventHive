import video from "../../assets/mp4/glow.mp4";
import { easeInOut, motion} from 'motion/react'

const EventhiveSplash = () => {
  return (
    <motion.div
    animate={{
      opacity:1
    }}
    exit={{
      
    }}
    transition={{
       duration:1.5,
       ease:easeInOut
    }}
     className="w-screen h-screen flex justify-center items-center bg-black">
      <video width={400} height={400} autoPlay muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};

export default EventhiveSplash;
