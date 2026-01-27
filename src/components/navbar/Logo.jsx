import React from "react";
import { GiBeveledStar } from "react-icons/gi";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <aside>
      <div className="flex text-xl items-center font-serif">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <GiBeveledStar className="text-4xl text-blue-500 mr-1 size-10" />
        </motion.div>
        Innovators hub music
      </div>
    </aside>
  );
};

export default Logo;