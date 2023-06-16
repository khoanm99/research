import GallerySection from "@/organisms/galleryWithScrolling";
import sampleData from "@/data/gallery.json";
import GalleryWithGsap from "@/organisms/galleryWithGsap";

const Gallery = () => {
  return (
    <>
      <div className="h-[50vh] w-full flex items-end">
        <div className="w-full text-center">
          <h1 className={`text-[80px]`}>
            <span className="block">WHAT WE </span>
            <span className={` block indent-8`}>ALREADY DID</span>
          </h1>
        </div>
      </div>
      <div className="h-[50vh] w-full flex items-end">
        <div className="w-full text-center">
          <h1 className={`text-[80px]`}>
            <span className="block">WHAT WE </span>
            <span className={` block indent-8`}>ALREADY DID</span>
          </h1>
        </div>
      </div>
      <div className="h-[50vh] w-ful l flex items-end">
        <div className="w-full text-center">
          <h1 className={`text-[80px]`}>
            <span className="block">WHAT WE </span>
            <span className={` block indent-8`}>ALREADY DID</span>
          </h1>
        </div>
      </div>
      {/* <GallerySection
        listItem={sampleData.data.listItem}
        className="pt-[20px]"
      /> */}

      <GalleryWithGsap listItem={sampleData.data.listItem} className="" />

      <div className="h-[100vh] w-full flex items-center">
        <div className="w-full text-center">
          <button
            className={`border border-black w-full max-w-[390px] border-solid px-5 py-2.5 text-center`}
          >
            alle projekte
          </button>
        </div>
      </div>
    </>
  );
};

export default Gallery;
