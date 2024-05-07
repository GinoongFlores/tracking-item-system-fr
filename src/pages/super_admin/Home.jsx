import { CountCard } from "../../components/cards";
import { TabNavigation } from "../../components/navigation";

export const Home = () => {
  return (
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
                  title: "Companies",
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
          content: "Stats",
        },
      ]}
    />
  );
};
