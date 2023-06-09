import { HorizontalScroll } from "@/components/gsap/horizontalScroll";
import GsapTemplate from "@/template/gsap";

const GsapPage = () => {
  const list = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 1',
    'item 2',
    'item 3',
  ]
  return (
    <>
      <div className="">
        <GsapTemplate name="khoa" />
      </div>
    </>
  )
}

export default GsapPage;