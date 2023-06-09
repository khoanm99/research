import { HorizontalScroll } from "@/components/gsap/horizontalScroll";
import { GetStaticProps } from "next";

interface HomeProps {
  pageData: any;
}
const ScrollHorizontalPage = ({ pageData }: HomeProps) => {
  console.log(pageData);
  const list = [
    "item 1",
    "item 2",
    "item 3",
    "item 4",
    "item 1",
    "item 2",
    "item 3",
  ];
  return (
    <>
      <div className="">
        <HorizontalScroll list={list} />
      </div>
    </>
  );
};

export default ScrollHorizontalPage;

export const getStaticProps: GetStaticProps = async (_context) => {
  const getHomeData = await fetch(
    process.env.NEXT_PUBLIC_CMS_URL + `/api/home-page?populate=*`
  );
  
  const res = await getHomeData.status;

  if (res !== 200) {
    return {
      props: {
        pageData: {},
      },
    } 
  }

  const homeData = await getHomeData.json();

  if (!homeData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pageData: homeData ?? {},
    },
  };
};
