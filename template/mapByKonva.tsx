import MicroMap from "@/molecules/map/map";
import MicroMapReal from "@/molecules/map/map_old";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/molecules/map/map_old"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const DynamicMicro = dynamic(() => import("@/molecules/map/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const MapByKonVaTemplate = () => {
  const mapMakro = {
    map: "/img/map/makro-map-v2.svg",
    locations: [{ label: "Egnach", x: 868, y: 410 }],
  };

  return (
    <div>
      {/* <MicroMap></MicroMap> */}
      <DynamicMap data={mapMakro} />
      <DynamicMicro />
    </div>
  );
};

export default MapByKonVaTemplate;
