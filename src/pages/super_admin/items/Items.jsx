import React from "react";
import { TabNavigation } from "../../../components/navigation";
import { ViewItems } from "./ViewItems";
import { useItems } from "../../../store";

export const Items = () => {
  return (
    <section className="pb-20">
      <TabNavigation
        tabs={[
          {
            title: "All Items",
            target: "#all-items",
            content: <ViewItems />,
          },
          {
            title: "All Transactions",
            target: "#transactions",
            content: "All Transactions",
          },
        ]}
      />
    </section>
  );
};
