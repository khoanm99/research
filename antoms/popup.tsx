import { motion } from "framer-motion";

const PopupWithText = () => {
  return (
    <motion.div
      className="transition-all duration-500"
      // style={{
      //   left: item.x - offset - RADIUS / 2,
      //   top: item.y - offset,
      //   zIndex: 10,
      //   position: "absolute",
      // }}
      // ref={toolTipRef}
    >
      Location
    </motion.div>
  );
};

export default PopupWithText;
