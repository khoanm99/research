import { Group, Image, Layer, Stage } from "react-konva";
import useImage from "use-image";

const MicroMap = ({}: any) => {
  const [image] = useImage(`/img/map/mikro-map-v2.svg`);
  return (
    <div>
      <div className={`overflow-hidden relative bg-blue-50`}>
        <Stage width={window.innerWidth} height={1000}>
          {/* using draggable then the group should have size */}
          <Layer draggable={true}>
            <Group width={1280} height={892}>
              <Image image={image} alt=""  width={1280} height={892} />
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default MicroMap;
