import { TabNavigation } from "../../../components/navigation";
import { SearchBar } from "../../../components";
import { ViewItems } from "./ViewItems";
import { useItems } from "../../../store";

export const Items = () => {
  const filterUserItem = useItems((state) => state.filterUserItem);

  return (
    <section className="pb-20">
      <div className="w-full">
        <SearchBar onSearch={filterUserItem} />
      </div>

      <ViewItems />
    </section>
  );
};
