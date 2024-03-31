import CountCard from "../../components/CountCard";

export const Home = () => {
  const cards = [
    {
      count: 1,
      title: "Companies",
    },
    {
      count: 2,
      title: "Users",
    },
    {
      count: 3,
      title: "Admins",
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {cards.map((card, index) => (
        <CountCard key={index} title={card.title} count={card.count} />
      ))}
    </div>
  );
};
