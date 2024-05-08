import { SearchBar } from "../../components";
import { ViewItems } from "./ViewItems";
import { TrashedItems } from "./TrashedItems";
import { useItems } from "../../store";

import { TabNavigation } from "../../components/navigation";
import { AddItem } from "../../components/forms";

export const UserItems = () => {
  const filterUserItem = useItems((state) => state.filterUserItem);

  return (
    <>
      <section className="container text-darker dark:text-white pb-20">
        <div className="w-full">
          <SearchBar onSearch={filterUserItem} />
        </div>

        <TabNavigation
          tabs={[
            {
              title: "All Items",
              target: "#all-items",
              content: <ViewItems />,
            },
            {
              title: "Add Item",
              target: "#add-item",
              content: <AddItem />,
            },
            {
              title: "Archived Items",
              target: "#archived-items",
              content: <TrashedItems />,
            },
          ]}
        />
      </section>
    </>
  );
};
