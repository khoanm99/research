type StaticProps = {
  params: {
    types: string;
  };
};

export const generateStaticParams = async () => {
  const fakeData = ['services', 'blog'];

  return fakeData.map(item => ({ types: item }));
};

const PageTypes = ({ params }: StaticProps) => {
  console.log(params);
  return (
    <div>
      <div>this is params type : {params.types}</div>
    </div>
  );
};

export default PageTypes;
