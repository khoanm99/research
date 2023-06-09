import { useState, useRef, ReactNode } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useReducedMotion,
  useScroll,
  useIsomorphicLayoutEffect,
} from "framer-motion";

type ParallaxProps = {
  children: ReactNode;
  index?: number;
  offset?: number;
};

const Parallax = ({
  children,
  index,
  offset = 100,
}: ParallaxProps): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // start animating our element when we've scrolled it into view
  const [positionLeft, setPositionLeft] = useState<number>(0);
  // end our animation when we've scrolled the offset specified
  const [positionRight, setPositionRight] = useState<number>(0);

  //we create a mapping function that maps the scrollY value from the range of 0-100 to the range 
  //of 0-360. The useTransform hook takes three arguments: the input value, the input range, and4
  //the output range. In this case, the input value is the scrollY value, and the input range is
  // [0, 100]. The output range is [0, 360], which means that when the scrollY value is 0, the
  //rotation value will be 0, and when the scrollY value is 100, the rotation value will be 360.
  // In this case I wanna adjust the output range so i using index to make it have a little bit
  // different of each item

  const yRange = useTransform(
    scrollY,
    [positionLeft, positionRight], // size of the scroll it's mean
    // we defend on the number of this element to the top off the page till
    // the height off this element to the top off the page
    // we also can understand it like the start position to animate and the end of it
    [
      index && index % 2 == 0 ? 0 : offset, // the deviation of the item from the original
      index && index % 2 != 0 ? -offset : 0,
    ]
  );

  // apply a spring to ease the result
  const y = useSpring(yRange, { stiffness: 55, damping: 20 });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    // save our layout measurements in a function in order to trigger
    // it both on mount and on resize
    const onResize = () => {
      if (!element) return;
      // use getBoundingClientRect instead of offsetLeft in order to
      // get the offset relative to the viewport
      setPositionLeft(element.getBoundingClientRect().left / 2);

      // Similar with above but get the position on the
      setPositionRight(element.getBoundingClientRect().right);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ref]);

  // Don't parallax if the user has "reduced motion" enabled
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: y }}
      className={`flex-[0_0_auto] max-w-[100vw] lg:w-auto`}
    >
      {children}
    </motion.div>
  );
};

export default Parallax;
