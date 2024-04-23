import { SearchBar } from "../../../components";
import { ButtonLink } from "../../../components/buttons";
import { ItemCard } from "../../../components/cards";
import { useItems } from "../../../store";
import { useEffect } from "react";
import { EditItem } from "../../../components/modal";
import { Loader } from "../../../utils";

export const UserItems = () => {
  const items = useItems((state) => state.itemData);
  const { fetchUserItem, itemAdded, loading } = useItems();

  useEffect(() => {
    fetchUserItem();
  }, [fetchUserItem, itemAdded]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="container max-w-[800px] px-4 mx-auto text-darker dark:text-white">
        <div className="flex items-center justify-end">
          <ButtonLink name={"Archive"} redirect={"/item/trashed"} />
          <ButtonLink name={"Add Item"} redirect={"/item/add"} />
          <ButtonLink name={"Transfer Item"} redirect={"/item/transfer"} />
        </div>
        <div className="w-full">
          <SearchBar />
        </div>

        <div className="flex flex-col gap-4">
          {itemAdded ? (
            items.map((item) => (
              <ItemCard key={item.id} {...item} isEdit={true} isDelete={true} />
            ))
          ) : (
            <div
              className={`gap-4 flex flex-col items-center justify-center text-black dark:text-white h-screen
        }`}
            >
              <div className="flex flex-col items-center justify-center">
                <span className="mb-4">No items yet...</span>
                <div>
                  <ButtonLink name={"Add Item"} redirect={"/item/add"} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
