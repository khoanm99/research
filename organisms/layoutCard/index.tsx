import { motion, PanInfo } from "framer-motion";
import { useRef, useState } from "react";
import { clsx } from "clsx";
const CardSection = ({ cards }: { cards: any }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [canDrag, setCanDrag] = useState<boolean>(false);
  // const containerRefs = useRef(new Array());
  const handlePanEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    card: number
  ) => {
    console.log("this event", event);
    console.log("this is info", info);
    if (selectedId) {
      if (Math.abs(info.offset.x) < 5) {
        const timeout = 0;
        setCanDrag(false);
        setTimeout(() => {
          setSelectedId(null);
        }, timeout);
      }
    } else {
      setCanDrag(true);
      setSelectedId(card);
    }
  };
  return (
    <div className="layout-cards flex flex-wrap gap-2 p-10 bg-rose-200 max-w-[1200px] mx-auto">
      {cards.map((card: any, key: number) => (
        <motion.div
          key={key}
          className={clsx({
            "fixed w-full h-full top-0 left-0 flex flex-nowrap":
              selectedId === card,
            "w-[200px] h-[200px] bg-white rounded-xl cursor-pointer":
              selectedId !== card,
          })}
          layout
          drag={selectedId === card ? "x" : false}
          // onPanEnd={(event, info) => handlePanEnd(event, info, card)}
          dragConstraints={{
            left: canDrag ? -30 : 0,
            right: 300,
          }}
          onClick={() => {
            setCanDrag(true);
            setSelectedId(card);
          }}
        >
          {selectedId === card && (
            <>
              <div
                className={clsx(
                  `bg-yellow-100 h-[150px] w-[300px] rounded-xl m-[10px]`
                )}
                onClick={() =>
                {
                  console.log("aaaa");
                  setCanDrag(false);
                  setSelectedId(null);
                }}
              />
              <div
                className={clsx(
                  `bg-yellow-100 h-[150px] w-[300px] rounded-xl m-[10px]`
                )}
              />
              <div
                className={clsx(
                  `bg-yellow-100 h-[150px] w-[300px] rounded-xl m-[10px]`
                )}
                onClick={() => setSelectedId(null)}
              />
            </>
          )}
        </motion.div>
      ))}
      <motion.div
        className="overlay w-full h-full pointer-events-none bg-black left-0 top-0 fixed"
        animate={{ opacity: selectedId ? 0.3 : 0 }}
      />
    </div>
  );
};

export default CardSection;
