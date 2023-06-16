import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

const parallaxAnimation = ({
  el,
  containerAnimation,
  from = '0',
  to = '0',
  id = '',
  start = 'left right',
  end = 'right left',
  index
}: {
  el: HTMLElement;
  containerAnimation?: gsap.core.Animation;
  from?: string;
  to?: string;
  id?: string;
  start?: string;
  end?: string;
  index?: number
}) => {
  gsap.registerPlugin(ScrollTrigger);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (el.parentNode && vw >= vh) {

    console.log({from});
    gsap.fromTo(
      el,
      {
        x: from
      },
      {
        x: to,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentNode as gsap.DOMTarget, //.panel-wide
          containerAnimation: containerAnimation,
          start: start,
          end: end,
          scrub: true,
          invalidateOnRefresh: true,
          id: id,
          markers: {
            startColor: `${index === 0 ? 'purple' : 'green'}`,
            endColor: `${index === 0 ? 'yellow': 'red'}`
          },
          onRefresh: self => {
            if (self.start < 0) {
              self.animation?.progress(
                gsap.utils.mapRange(self.start, self.end, 0, 1, 0)
              );
            }
          }
        }
      }
    );
  }
};

export const useParallaxAnimation = ({
  scrollTween,
  from = '0',
  to = '0',
  id = '',
  start = 'left right' ,
  end = 'right left',
  isAuto = false,
  index
}: {
  scrollTween?: gsap.core.Animation;
  from?: string;
  to?: string;
  id?: string;
  start?: string;
  end?: string;
  isAuto?: boolean;
  index?: number
}) => {
  const ref = useRef<HTMLImageElement>(null);
  const windowSize = useWindowSize();
  const vw = windowSize.width;

  useEffect(() => {
    if (ref && ref.current !== null) {
      let autoFrom = '0';
      let autoTo = '0';

      if (isAuto === true && scrollTween) {
        autoFrom = -(ref.current.clientWidth - vw/3) + 'px';
        start = 'left right'
        end = 'right center';
      }

      parallaxAnimation({
        el: ref.current,
        containerAnimation: scrollTween,
        from: isAuto === true ? autoFrom : from,
        to: isAuto === true ? autoTo : to,
        id,
        start,
        end,
        index
      });
    }
  }, [end, from, id, isAuto, scrollTween, start, to, vw]);

  return { ref };
};