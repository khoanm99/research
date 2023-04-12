import { HorizontalScroll } from "@/components/gsap/horizontalScroll";

const ScrollHorizontalPage = () => {
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
        <HorizontalScroll list={list} />
      </div>
    </>
  )
}

export default ScrollHorizontalPage;