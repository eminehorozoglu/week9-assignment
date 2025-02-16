"use client"; 
import enjoy from "@/../public/enjoy-your-life.jpg";
import Image from "next/image";


import * as motion from "motion/react-client";

export default function WellcomeAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center text-amber-600 text-6xl" 
    >
      <h1>Welcome to the Website</h1>
      <Image  className="rounded-full"
        src={enjoy}
        alt={"enjoy your life"}
        width={850}
        height="fill"
        priority="false"
        placeholder="blur"
       />
    
    </motion.div>
    
  );
}