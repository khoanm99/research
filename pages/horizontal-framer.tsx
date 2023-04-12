import HorizontalScrollWithFramer from "@/components/horizontalScrollSmoth";
import Image from "next/image";

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
  ];
  return (
    <>
      <HorizontalScrollWithFramer>
        {list &&
          list.map((item, key) => {
            return (
              <div
                key={key}
                className={`flex flex-[0_0_auto] max-w-[100vw] lg:w-auto ${
                  key == 0 ? "pl-20" : ""
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
            );
          })}
      </HorizontalScrollWithFramer>
    </>
  );
};

export default ScrollHorizontalPage;
