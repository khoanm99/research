import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Group, Image, Circle } from "react-konva";
import useImage from "use-image";
import { Html } from "react-konva-utils";
import useWindowSize from "@/hook/useWindowSize";
import {motion} from "framer-motion";
interface Props {
  data: {
    map: string;
    locations: {
      label: string;
      x: number;
      y: number;
    }[];
  };
}

const Compass = () => {
  return (
    <div className="absolute hidden bottom-5 right-10 z-50 lg:block">
      <svg
        width="69"
        height="69"
        viewBox="0 0 69 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.7453 68.4805C53.3824 68.4805 68.4907 53.3775 68.4907 34.7471C68.4907 16.1166 53.3824 1.01367 34.7453 1.01367C16.1083 1.01367 1 16.1166 1 34.7471C1 53.3775 16.1083 68.4805 34.7453 68.4805Z"
          stroke="#29472E"
          strokeMiterlimit="10"
        />
        <path
          d="M34.745 53.3074L54.9412 61.7796L34.745 1L14.5488 61.7796L34.745 53.3074Z"
          fill="#29472E"
        />
      </svg>
    </div>
  );
};

const MicroMap = ({ data }: Props) => {
  const HEIGHT_MOBILE = 435;
  const HEIGHT_DESKTOP = 892;
  console.log(data.map);
  const [image] = useImage(data.map);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { width } = useWindowSize();
  const RADIUS = 40;

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setIsMobile(width > 1024 ? false : true);
    }, 100);
    return () => {
      clearTimeout(timer1);
    };
  }, [width]);

  const RenderTooltip = ({ item }: { item: any }) => {
    const toolTipRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
      let timer2 = setTimeout(() => {
        let _elem = toolTipRef.current;
        if (_elem) {
          setOffset(_elem.clientWidth / 2);
        }
      }, 100);
      return () => {
        clearTimeout(timer2);
      };
    }, []);

    return (
      <>
        <Html>
          <motion.div
            className="transition-all duration-500"
            style={{
              left: item.x - offset - RADIUS / 2,
              top: item.y - offset,
              zIndex: 10,
              position: 'absolute'
            }}
            ref={toolTipRef}
          >
            Location
          </motion.div>
        </Html>
        <Circle
          x={item.x - RADIUS / 2}
          radius={item.radius ? item.radius : RADIUS}
          y={item.y - RADIUS / 2}
          fill="red"
          opacity={0}
        />
      </>
    );
  };

  const renderTooltips = () => {
    const { locations } = data;

    return (
      <>
        {locations &&
          locations.map((item: any, key: number) => {
            return <RenderTooltip key={key} item={item} />;
          })}
      </>
    );
  };

  return (
    <div className="mt-20 ">
      <div className="overflow-hidden relative  mx-auto max-w-[1280px]">
        <Stage
          width={window.innerWidth}
          height={isMobile ? HEIGHT_MOBILE : HEIGHT_DESKTOP}
        >
          <Layer draggable={true}>
            <Group width={1280} height={892}>
              <Image image={image} alt="" width={1280} height={892} />
              {renderTooltips()}
            </Group>
          </Layer>
        </Stage>
        <Compass />
      </div>
    </div>
  );
};

export default MicroMap;
