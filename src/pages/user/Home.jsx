import { TabNavigation } from "../../components/navigation";
import { CountCard } from "../../components/cards";
import { Statistics } from "./statistics/Statistics";

export const UserHome = () => {
  return (
    <div>
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
                    title: "Received Items",
                  },
                  transactions: {
                    value: "10",
                    title: "Transactions",
                  },
                  items: {
                    value: "8",
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
    </div>
  );
};
