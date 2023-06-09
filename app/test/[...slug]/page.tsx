type StaticProps = {
  params: {
    slug: string[];
  };
};

export const generateStaticParams = async () => {
  const fakeData = [
    {
      types: 'services',
      data: 'test-1'
    },
    {
      types: 'services',
      data: 'test-2'
    }
  ];

  return fakeData.map(item => ({ slug: [`${item.types}`, `${item.data}`] }));
};

const PageSlug = ({ params }: StaticProps) => {
  return (
    <div>
      <div>This is slug page : {params.slug} </div>
    </div>
  );
};

export default PageSlug;
