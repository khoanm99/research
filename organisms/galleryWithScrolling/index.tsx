import clsx from "clsx";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  listItem: {
    imgUrl?: string;
    title?: string;
  }[];
  className?: string;
}

const GallerySection = ({ listItem, className }: Props) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refImgWrap = useRef<HTMLDivElement>(null);
  const [startVal, setStartVal] = useState<number>(0);
  const [endVal, setEndVal] = useState<number>(200);
  const [maxTranslateX, setMaxTranslateX] = useState<number | null>(null);
  const [offsetStart, setOffsetStart] = useState<number>(0);
  const [offsetReach, setOffsetReach] = useState<number>(0);
  const [offsetEnd, setOffsetEnd] = useState<number>(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (
        refContainer.current &&
        refImgWrap.current &&
        typeof window !== "undefined"
      ) {
        const paddingX = 20;
        const offsetTop = refContainer.current.offsetTop - window.innerHeight;
        const offsetCenter =
          offsetTop + refContainer.current.clientHeight + 100;
        const offsetBottom = offsetTop + window.innerHeight;
        const containerChildWidth =
          Array.from(refContainer.current.children)[0].clientWidth + 40;
        const childrenWidth = refImgWrap.current.clientWidth ?? 0;

        const translateX = childrenWidth - containerChildWidth;

        setStartVal(window.innerHeight);
        setOffsetStart(offsetTop);
        setOffsetReach(offsetCenter);
        setOffsetEnd(offsetBottom);
        setMaxTranslateX(translateX);
        setEndVal(
          -containerChildWidth * listItem.length + window.innerWidth - paddingX
        );
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [refContainer, listItem]);

  const xRange = useTransform(
    scrollY,
    [offsetStart, offsetReach, offsetEnd],
    [startVal, 0, endVal]
  );

  const x = useSpring(xRange, { stiffness: 100, damping: 30 });

  const yRange = useTransform(
    scrollY,
    [offsetStart, offsetEnd],
    [maxTranslateX ? -maxTranslateX : 0, 0]
  );

  const y = useSpring(yRange, { stiffness: 60, damping: 20 });

  console.log(maxTranslateX);
  return (
    <>
      {listItem && listItem.length > 0 && (
        <motion.div
          className={clsx("flex flex-nowrap space-x-10 px-5", className)}
          ref={refContainer}
          style={{ x: x }}
          id="#gallery"
        >
          {listItem.map((item, key) => (
            <div
              key={key}
              className="w-[calc(100vw/3)] min-w-[500px] overflow-hidden flex-shrink-0 grow-0 basis-[500px]"
            >
              <div
                className="relative overflow-hidden w-[calc(100vw/2)] min-w-[500px] top-1/2 -translate-y-1/2 right-0"
                key={key}
                ref={refImgWrap}
              >
                {item.imgUrl && (
                  <motion.div className="pt-[47%]" style={{ x: y }}>
                    <Image
                      src={item.imgUrl}
                      alt="aaaaa"
                      width={600}
                      height={407}
                      className="absolute top-0 right-0 h-full object-cover object-center z-10 max-w-[9999px] w-full"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default GallerySection;
