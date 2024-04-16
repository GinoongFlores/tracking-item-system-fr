import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../components";
import { ButtonLink } from "../../../components/buttons";
import { ItemCard } from "../../../components/cards";
import { useItems } from "../../../store";
import { useEffect, useState } from "react";

export const TrashedItems = () => {
  const [test, setTest] = useState(false);
  const trashedItems = useItems((state) => state.itemTrashedData);
  const { isEmpty, fetchTrashedItem } = useItems();
  const navigate = useNavigate();
  //   console.log(items);

  useEffect(() => {
    fetchTrashedItem();
  }, [fetchTrashedItem]);
  return (
    <section className="flex flex-col gap-4 text-darker dark:text-white">
      <div className="w-full">
        <SearchBar />
      </div>
      <div className="flex items-center justify-end">
        <ButtonLink redirect={"/items/trashed"} name={"Archive"} />
        <ButtonLink redirect={"/items/"} name={"Items"} />
      </div>

      {isEmpty ? (
        <div
          className={`gap-4 flex flex-col items-center justify-center text-black dark:text-white h-screen
              }`}
        >
          <div className="flex flex-col items-center justify-center">
            <span className="mb-4">No trashed items...</span>
            <div>
              <button
                type="button"
                onClick={() => navigate("/items/add")}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white dark:bg-darker rounded-full border border-gray-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-100"
              >
                Add an Item
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {trashedItems.length
        ? trashedItems.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              description={item.description}
              isRestore={true}
            />
          ))
        : null}
    </section>
  );
};
