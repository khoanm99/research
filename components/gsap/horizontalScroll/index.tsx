import ScrollItem from "@/template/framer/item";
import { horizontalScroll } from "@/utils/registerHorizontalScroll";
import { useIsomorphicLayoutEffect } from "@/utils/useIsomorphicEffect";
import gsap from "gsap";
import { useRef, useState } from "react";
// import { useParallaxAnimation } from '@/hooks/useGSAPAnimation';

export const HorizontalScroll = ({ list }: { list: string[] }) => {
  const refContainer = useRef(null);
  const [scrollTween, setScrollTween] = useState<gsap.core.Animation>();
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (refContainer && refContainer.current !== null) {
        const { mainScrollTween } = horizontalScroll({
          wrapper: refContainer.current,
        });

        // console.log("main", mainScrollTween);

        setScrollTween(mainScrollTween);
      }
    }, refContainer);

    return () => ctx.revert();
  }, []);

  // const refItem
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex flex-nowrap h-screen items-center"
          ref={refContainer}
        >
          {list &&
            list.map((itemList, key) => (
              <div
                key={key}
                className={`${key == 0 ? `pl-20` : ``} ${
                  key == list.length - 1 ? "pr-20" : ""
                } item`}
                data-scroll-item
              >
                <ScrollItem name={itemList} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
