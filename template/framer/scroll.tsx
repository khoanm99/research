import { useScroll } from "framer-motion";

const ScrollFramer = ({ list }: { list: string[] }) => {

  const { scrollY } = useScroll();
  return (
    <div>
      {list &&
        list.length > 0 &&
        list.map((item, key) => (
          <div className={`w-screen h-screen bg-slate-700`} key={key}>
            {item}
          </div>
        ))}
    </div>
  );
};

export default ScrollFramer;
