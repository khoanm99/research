import useWindowSize from "@/hook/useWindowSize";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  imgUrl: string;
}

const ParallaxCard = ({ imgUrl }: Props) => {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxTranslateX, setMaxTranslateX] = useState<number | null>(null);
  const offsetX = useMotionValue(0);
  const { width } = useWindowSize();
  const { scrollY } = useScroll();
  // useEffect(() => {
  //   const container = containerRef.current;
  //   const onResize = () => {
  //     if (!container) return;
  //     offsetX.set(container.getBoundingClientRect().left);

  //     // window.clearTimeout(timer);
  //   };

  //   window.addEventListener("scroll", onResize);
  //   return () => window.removeEventListener("scroll", onResize);
  // }, []);

  useEffect(() => {
    const element = imgWrapRef.current;
    const container = containerRef.current;
    if (!element || !container) return;
    const containerWidth = container?.clientWidth;
    const childrenWidth = element.clientWidth ?? 0;
    const translateX = childrenWidth - (containerWidth ?? 0);
    setMaxTranslateX(translateX);
  }, []);

  useMotionValueEvent(scrollY, "change", () => {
    const container = containerRef.current;
    if (!container) return;
    offsetX.set(container.getBoundingClientRect().left);
  });

  // const handleMouseMove = (event: any) => {
  //   const { clientX } = event;
  //   const progress = clientX / width;
  //   const translateX = -progress * maxTranslateX;
  //   imgWrapRef.current.style.transform = `translateX(${translateX}px)`;
  // };

  // const handleMouseLeave = () => {
  //   imgWrapRef.current.style.transform = "translateX(0)";
  // };

  const xRange = useTransform(
    offsetX,
    [0, width + 20],
    [maxTranslateX ? -maxTranslateX : 0, 0]
  );
  const x = useSpring(xRange, { stiffness: 60, damping: 30 });

  return (
    <>
      <motion.div
        className="w-[calc(100vw/3)] min-w-[500px] overflow-hidden flex-shrink-0 grow-0 basis-[500px]"
        ref={containerRef}
      >
        <motion.div
          className="relative overflow-hidden w-[calc(100vw/2)] min-w-[500px] top-0 right-0 pt-[81%]"
          ref={imgWrapRef}
          style={{ x: x }}
        >
          <Image
            src={imgUrl}
            alt="aaaaa"
            width={600}
            height={407}
            className="absolute top-0 right-0 h-full object-cover object-center z-10 max-w-[9999px] w-full"
          />
          {/* {imgUrl && (
            <motion.div
              className="pt-[47%]"
              // drag="x"
              // dragConstraints={{ left: 0, right: 0 }}
              // style={{ x: xRange }}
            >
              <Image
                src={imgUrl}
                alt="aaaaa"
                width={600}
                height={407}
                className="absolute top-0 right-0 h-full object-cover object-center z-10 max-w-[9999px] w-full"
              />
            </motion.div>
          )} */}
        </motion.div>
      </motion.div>

      {/* <div
        className="w-[calc(100vw/3)] min-w-[500px] overflow-hidden flex-shrink-0 grow-0 basis-[500px]"
        ref={containerRef}
      >
        <div
          className="relative overflow-hidden w-[calc(100vw/2)] min-w-[500px] top-1/2 -translate-y-1/2 right-0"
          ref={imgWrapRef}
        >
          {imgUrl && (
            <motion.div
              className="pt-[47%]"
              // drag="x"
              // dragConstraints={{ left: 0, right: 0 }}
              style={{ x: xRange }}
            >
              <Image
                src={imgUrl}
                alt="aaaaa"
                width={600}
                height={407}
                className="absolute top-0 right-0 h-full object-cover object-center z-10 max-w-[9999px] w-full"
              />
            </motion.div>
          )}
        </div>
      </div> */}
    </>
  );
};

export default ParallaxCard;
