// import CountCard from "../../components/CountCard";
import { CountCard } from "../../components/cards";
import { TabNavigation } from "../../components/navigation";
import { Statistics } from "../user";

export const AdminHome = () => {
  return (
    <>
      <TabNavigation
        tabs={[
          {
            title: "Overview",
            target: "#overview",
            content: (
              <CountCard
                card={{
                  users: {
                    value: "20",
                    title: "Users",
                  },
                  transactions: {
                    value: "50",
                    title: "Transferred Items",
                  },
                  items: {
                    value: "30",
                    title: "Items",
                  },
                }}
              />
            ),
          },
          {
            title: "Statistics",
            target: "#statistics",
            content: <Statistics />,
          },
        ]}
      />
    </>
  );
};
