import React, { useRef, useState, useCallback, ReactNode } from "react";
import ResizeObserver from "resize-observer-polyfill";
import {
  motion,
  useTransform,
  useSpring,
  useIsomorphicLayoutEffect,
  useScroll,
  useDragControls,
} from "framer-motion";

const HorizontalScrollWithFramer = ({ children }: { children: ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageHeight = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const controls = useDragControls();

  useIsomorphicLayoutEffect(() => {
    if (!scrollRef || !scrollRef.current) return;
    setScrollRange(scrollRef.current.scrollWidth ?? 0);
  }, [scrollRef]);

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!pageHeight || !pageHeight.current) return;
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    resizeObserver.observe(pageHeight.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useScroll();
  const transform = useTransform(
    scrollYProgress,
    [0, 1], // It mean use this Effect for hold section 
    [0, -scrollRange + viewportW] // Calc the position that need to end 
  );
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }; // easing of smooth scroll
  const spring = useSpring(transform, physics); // apply easing to the negative scroll value

  return (
    <>
      <div className="scroll-container w-full fixed left-0 top-0 will-change-transform bg-slate-400">
        <motion.div
          ref={scrollRef}
          style={{ x: spring }}
          className="flex flex-nowrap h-screen items-center relative"
          drag
          dragControls={controls}
          onDirectionLock={(e) => console.log("Aaaaaa", e)}
          onDrag={(e) => console.log(e)}
        >
          {children}
        </motion.div>
      </div>
      {/* Ghost div */}
      <div
        ref={pageHeight}
        style={{ height: scrollRange }}
        className={`w-screen`}
      />
    </>
  );
};

export default HorizontalScrollWithFramer;
