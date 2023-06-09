import ScrollFramer from "@/template/framer/scroll";

const ScrollWithFramer = () => {
  const list = [
    'item 1',
    'item 2',
    'item 3',
    'item 4'
  ]
  return (
    <>
      <div className="">
        <ScrollFramer list={list} />
      </div>
    </>
  )
}

export default ScrollWithFramer;