import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
export const horizontalScroll = ({ wrapper }: { wrapper: HTMLDivElement }) => {
  gsap.registerPlugin(ScrollTrigger);

  const sections: HTMLElement[] = [].slice.call(
    wrapper.querySelectorAll("[data-scroll-item]")
  );

  let mainScrollTween: gsap.core.Animation | undefined = undefined;

  // console.log("sections", sections);
  
  if (sections && sections.length > 0) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (vw >= vh) {
      let clamp: any, dragRatio: number;
      const getTotalWidth = () => {
        let width: number = 0;4
        sections.forEach((el) => (width += el.offsetWidth));
        return width;
      };
      
      
      if (getTotalWidth() > vw) {
        console.log("vo trong nay", getTotalWidth());
        mainScrollTween = gsap.to(wrapper, {
          x: () => vw - getTotalWidth(),
          ease: "none",
        });

        const scrollTriggerEl: ScrollTrigger = ScrollTrigger.create({
          animation: mainScrollTween,
          trigger: wrapper,
          pin: true,
          start: 0,
          end: () => "+=" + (wrapper.scrollWidth - vw),
          invalidateOnRefresh: true,
          scrub: 1,
        });

        ScrollTrigger.addEventListener(`refresh`, () => {
          clamp = gsap.utils.clamp(
            scrollTriggerEl.start + 1,
            scrollTriggerEl.end - 1
          );
          dragRatio = 1.5;
        });

        sections.forEach((slide: HTMLElement, key: number) => {
          gsap.to(slide, {
            scrollTrigger: {
              trigger: slide,
              start: 'left center',
              end: 'right center',
              scrub: 1,
              containerAnimation: mainScrollTween,
              invalidateOnRefresh: true,
              markers: true
            } 
          })
        })
      }
      
    }
  }

  return { mainScrollTween };
};
