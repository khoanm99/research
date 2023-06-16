import clsx from "clsx";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ParallaxCard from "./card";

interface Props {
  listItem: {
    imgUrl?: string;
    title?: string;
  }[];
  className?: string;
}

const GallerySection = ({ listItem, className }: Props) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [startVal, setStartVal] = useState<number>(0);
  const [endVal, setEndVal] = useState<number>(0);
  const [childWidth, setChildWidth] = useState<number | null>(null);
  const [offsetStart, setOffsetStart] = useState<number>(0);
  const [offsetReach, setOffsetReach] = useState<number>(0);
  const [offsetEnd, setOffsetEnd] = useState<number>(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (refContainer.current && typeof window !== "undefined") {
        const paddingX = 20;
        const offsetTop = refContainer.current.offsetTop - window.innerHeight;
        const offsetCenter =
          offsetTop + refContainer.current.clientHeight + 100;
        const offsetBottom = offsetTop + window.innerHeight;
        const containerChildWidth =
          Array.from(refContainer.current.children)[0].clientWidth + 40;
        setChildWidth(containerChildWidth);
        setStartVal(window.innerWidth);
        setOffsetStart(offsetTop);
        setOffsetReach(offsetCenter);
        setOffsetEnd(offsetBottom);
        // setOffsetReach(refContainer.current.offsetTop)
        // setOffsetEnd(refContainer.current.offsetTop * 2)
        setEndVal(
          -containerChildWidth * listItem.length + window.innerWidth - paddingX
        );
      }
    };
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, [refContainer, listItem]);

  const xRange = useTransform(
    scrollY,
    [offsetStart, offsetReach, offsetEnd],
    [startVal, 0, endVal]
  );

  // const xRange = useTransform(
  //   scrollY,
  //   [0, offsetReach, offsetEnd],
  //   [startVal, 0, endVal]
  // );

  const x = useSpring(xRange, { damping: 30, stiffness: 100 });

  return (
    <>
      {listItem && listItem.length > 0 && (
        <motion.div
          className={clsx(
            "flex flex-nowrap space-x-10 px-5 will-change-scroll",
            className
          )}
          ref={refContainer}
          style={{ x: x }}
          id="#gallery"
        >
          {listItem.map((item, key) => (
            <ParallaxCard key={key} imgUrl={item.imgUrl ?? "/"} />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default GallerySection;
