import { SearchBar } from "../../../components";
import { ButtonLink } from "../../../components/buttons";
import { ViewItems } from "./ViewItems";
import { useState, useEffect } from "react";
import { useItems } from "../../../store";
import { Loader } from "../../../utils";
import { debounce } from "lodash";

export const UserItems = () => {
  const { filterUserItem } = useItems();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const debouncedFilterUserItem = debounce(filterUserItem, 500);
    debouncedFilterUserItem(search);
  }, [search, filterUserItem]);

  return (
    <>
      {/* {loading && <Loader />} */}
      <section className="container max-w-[800px] px-4 mx-auto text-darker dark:text-white">
        <div className="flex items-center justify-end">
          <ButtonLink name={"Archive"} redirect={"/item/trashed"} />
          <ButtonLink name={"Add Item"} redirect={"/item/add"} />
          <ButtonLink name={"Transfer Item"} redirect={"/item/transfer"} />
        </div>
        <div className="w-full">
          <SearchBar
            onSearch={(search) => {
              setSearch(search);
            }}
          />
        </div>
        {/* card items */}
      </section>
      <ViewItems />
    </>
  );
};
