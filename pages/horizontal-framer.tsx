import HorizontalScrollWithFramer from "@/components/horizontalScrollSmoth";
import Parallax from "@/components/ScrollWithParallax";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const ScrollHorizontalPage = () => {
  const list = [
    {
      url: "/img/sample/dummy-1.webp",
      alt: "",
      width: 600,
      height: 700,
    },
    {
      url: "/img/sample/dummy-2.webp",
      alt: "",
      width: 400,
      height: 495,
    },
    {
      url: "/img/sample/dummy-3.webp",
      alt: "",
      width: 300,
      height: 371,
    },
    {
      url: "/img/sample/dummy-4.webp",
      alt: "",
      width: 700,
      height: 875,
    },
    {
      url: "/img/sample/dummy-5.webp",
      alt: "",
      width: 200,
      height: 246,
    },
    {
      url: "/img/sample/dummy-2.webp",
      alt: "",
      width: 400,
      height: 495,
    },
    {
      url: "/img/sample/dummy-1.webp",
      alt: "",
      width: 600,
      height: 700,
    },
    {
      url: "/img/sample/dummy-3.webp",
      alt: "",
      width: 300,
      height: 371,
    },
    {
      url: "/img/sample/dummy-4.webp",
      alt: "",
      width: 700,
      height: 875,
    },
    {
      url: "/img/sample/dummy-5.webp",
      alt: "",
      width: 200,
      height: 246,
    },
    {
      url: "/img/sample/dummy-3.webp",
      alt: "",
      width: 300,
      height: 371,
    },
  ];

  const { scrollY } = useScroll();

  // useEffect(() => {

  //   console.log("data this",  scrollY)
  // }, [scrollY])

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   console.log("Page scroll: ", latest, scrollY);
  // });
  return (
    <>
      <HorizontalScrollWithFramer>
        {list &&
          list.map((item, key) => {
            return (
              <Parallax key={key} index={key}>
                <div
                  key={key}
                  className={`flex flex-[0_0_auto] max-w-[100vw] lg:w-auto ${scrollY} ${
                    key == 0 ? "pl-20" : "mx-[-20px]"
                  } ${key == list.length - 1 ? "pr-20" : ""}`}
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className={`object-cover`}
                  />
                </div>
              </Parallax>
            );
          })}
      </HorizontalScrollWithFramer>
    </>
  );
};

export default ScrollHorizontalPage;
