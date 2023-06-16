import { useParallaxAnimation } from "@/utils/useGSAPAnimation";
import Image from "next/image";
import gsap from "gsap";
import clsx from "clsx";

interface Props {
  mainScrollTween?: gsap.core.Animation;
  index?: number;
  length: number;
  imgUrl?: string;
  title?: string;
}

const GalleryItem = ({
  mainScrollTween,
  index,
  length,
  imgUrl,
  title,
}: Props) => {
  const { ref } = useParallaxAnimation({
    scrollTween: mainScrollTween,
    isAuto: true,
    index: index,
  });

  return (
    <div
      className={clsx(
        "w-[calc(100vw/3)] basis-[calc(100vw/3)] grow-0 shrink-0 overflow-hidden",
        {
          "ml-10 mr-5": index === 0,
          "mr-5": index !== 0 && index !== length - 1,
          "mr-10": index === length - 1,
        }
      )}
    >
      {imgUrl && (
        <div
          className={`relative w-[calc(100vw/2)] pt-[calc((100vw/3)*0.75)]`}
        >
          <Image
            ref={ref}
            src={imgUrl}
            alt=""
            fill
            className={`will-change-transform object-cover h-full w-auto max-w-[99999px]`}
          />
        </div>
      )}
      {title && <div></div>}
    </div>
  );
};

export default GalleryItem;
