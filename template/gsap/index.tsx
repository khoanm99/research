import { useIsomorphicLayoutEffect } from "@/utils/useIsomorphicEffect";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { LocomotiveScrollOptions, LocomotiveScrollProvider, useLocomotiveScroll } from "react-locomotive-scroll";
// import LocomotiveScroll from 'locomotive-scroll';
gsap.registerPlugin(ScrollTrigger);

const GsapTemplate = ({ name }: { name: string }) => {

  const optionsLocomotive : LocomotiveScrollOptions = {
    smooth: true,

  }


// const scroll = new useLocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   multiplier: 0.5
// });

  const list = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 1',
    'item 2',
    'item 3',
  ]
  // const container = useRef<HTMLDivElement>(null);
  // useIsomorphicLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     ScrollTrigger.create({
  //       trigger: '.box-c',
  //       pin: true,
  //       start: 'center center',
  //       end: '+=300',
  //       markers: true,
  //     });
  //   }, container);
  //   return () => ctx.revert();
  // }, []);

  const container = useRef(null);
  const smoother = useRef();

  useEffect(() =>{
    if (!container) {
      return;
    }
  }, [])

  return (
    <LocomotiveScrollProvider
      options={{ smooth: true} as LocomotiveScrollOptions}
      containerRef={container}
    >
      <div className="relative" data-scroll-section ref={container}>
        {list && list.length > 0 && list.map((item, idx) => (
          <div key={idx} className={`w-screen h-screen bg-rose-50`}>
            {item}
          </div>
        ))}
      </div>
    </LocomotiveScrollProvider>
  );
};

export default GsapTemplate;
