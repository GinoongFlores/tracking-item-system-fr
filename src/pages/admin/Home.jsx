// import CountCard from "../../components/CountCard";
import { CountCard } from "../../components/cards";

export const AdminHome = () => {
  const cards = [
    {
      count: 1,
      title: "Users",
    },
    {
      count: 2,
      title: "Items",
    },
    {
      count: 3,
      title: "",
    },
  ];
  return (
    <>
      <CountCard />
    </>
  );
};
