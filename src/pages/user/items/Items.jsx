import { ItemCard, SearchBar, ButtonLink } from "../../../components";
import { useItems } from "../../../store/StoreItems";
import { useEffect } from "react";
import { EditItem } from "../../../components";

export const UserItems = () => {
  const items = useItems((state) => state.itemData);
  const { fetchUserItem, itemAdded } = useItems();

  useEffect(() => {
    fetchUserItem();
  }, [fetchUserItem, itemAdded]);

  /*
 ? TODO
 * include the items on the `isEmptyItem` condition - done
 * Archive page - done
 * Breadcrumbs
*/

  return (
    <>
      <section className="flex flex-col gap-4 text-darker dark:text-white">
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="flex items-center justify-end">
          <ButtonLink name={"Archive"} redirect={"/items/trashed"} />
          <ButtonLink name={"Add Item"} redirect={"/items/add"} />
        </div>

        {itemAdded ? (
          items.map((item) => (
            <ItemCard
              id={item.id}
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              description={item.description}
              isEdit={true}
              isDelete={true}
            />
          ))
        ) : (
          <div
            className={`gap-4 flex flex-col items-center justify-center text-black dark:text-white h-screen
        }`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="mb-4">No items yet...</span>
              <div>
                <ButtonLink name={"Add Item"} redirect={"/items/add"} />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
