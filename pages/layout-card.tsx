import CardSection from "@/organisms/layoutCard";

const LayoutCard = () => {
  const list = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ];
  return (
    <>
      <div className="bg-rose-200">
        <CardSection cards={list} />
      </div>
    </>
  );
};

export default LayoutCard;
