import { useItems } from "../../../store";
import { ButtonLink } from "../../../components/buttons";
import { ItemCard } from "../../../components/cards";
import { EditItem } from "../../../components/modal";
import { useEffect } from "react";
import { Loader } from "../../../utils";

export const ViewItems = () => {
  const { fetchUserItem, itemData } = useItems();

  useEffect(() => {
    if (itemData.length === 0) {
      fetchUserItem();
    }
  }, [fetchUserItem, itemData]);

  return (
    <div className="flex flex-col gap-4">
      {itemData.length > 0 ? (
        itemData.map((item) => (
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
  );
};
