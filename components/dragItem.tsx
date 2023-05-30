import * as React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

export const DragItem = () => {
  const constraintsRef = useRef(null);

  return (
    <motion.div
      className="container w-[300px] h-[300px] overflow-hidden bg-slate-400"
      ref={constraintsRef}
    >
      <motion.div
        className="item w-[100px] h-[100px] bg-gray-600 rounded-full"
        drag
        dragConstraints={constraintsRef}
      />
    </motion.div>
  );
};
