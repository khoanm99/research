import { useParallaxAnimation } from "@/utils/useGSAPAnimation";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { endianness } from "os";
import { useRef, useState } from "react";
import { start } from "repl";
import { useIsomorphicLayoutEffect, useWindowSize } from "usehooks-ts";
import GalleryItem from "./item";

interface Props {
  listItem: {
    imgUrl?: string;
    title?: string;
  }[];
  className?: string;
}

const GalleryWithGsap = ({ listItem, className }: Props) => {
  // const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [mainScrollTween, setMainScrollTween] = useState<gsap.core.Animation>();
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  gsap.registerPlugin(ScrollTrigger);

  useIsomorphicLayoutEffect(() => {
    if (!wrapRef.current) return;
    // console.log(-width);
    // console.log("wrapper", -wrapRef.current.clientWidth);
    // const pin = gsap.fromTo(
    //   wrapRef.current,
    //   {
    //     translateX: 0,
    //   },
    //   {
    //     translateX: -wrapRef.current.scrollWidth + width,
    //     ease: "none",
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: triggerRef.current,
    //       start: "top top",
    //       end: `+=${wrapRef.current.scrollWidth}`,
    //       scrub: 0.6,
    //       pin: true,
    //       // markers: true
    //     },
    //   }
    // );

    // console.log(getTotalWidth());

    let mainScrollTween: gsap.core.Animation | undefined = undefined;
    mainScrollTween = gsap.fromTo(
      wrapRef.current,
      {
        x: () => width,
      },
      {
        x: () => width - (wrapRef.current ? wrapRef.current.scrollWidth : 0),
        ease: "none",
      }
    );

    const scrollTriggerEl: ScrollTrigger = ScrollTrigger.create({
      animation: mainScrollTween,
      trigger: wrapRef.current,
      pin: true,
      start: `bottom 90%`,
      end: () =>
        "+=" + (wrapRef.current && wrapRef.current.scrollWidth - width),
      invalidateOnRefresh: true,
      onEnter: () => setStartAnimation(true),
      onEnterBack: () => setStartAnimation(true),
      onLeave: () => setStartAnimation(false),
      onLeaveBack: () => setStartAnimation(false),
      scrub: 0.5,
      // markers: true
    });

    setMainScrollTween(mainScrollTween);

    return () => {
      scrollTriggerEl.kill();
    };
  }, [width]);

  return (
    <>
      {listItem && (
        <div className="relative">
          <div
            // className={`w-full text-center ${
            //   startAnimation ? "fixed top-[10%]" : "relative"
            // }`}
            className={`w-full text-center sticky top-[10%]`}
          >
            <h1 className={`text-[80px]`}>
              <span className="block">WHAT WE </span>
              <span className={` block indent-8`}>ALREADY DID IT</span>
            </h1>
          </div>
          <div className={`flex flex-row relative`} ref={wrapRef}>
            {listItem.map((item, key) => (
              <GalleryItem
                key={key}
                index={key}
                imgUrl={item.imgUrl}
                length={listItem.length}
                mainScrollTween={mainScrollTween}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryWithGsap;
