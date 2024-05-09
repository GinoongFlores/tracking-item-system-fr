import { useNavigate } from "react-router-dom";
import { ItemCard } from "../../components/cards";
import { useItems } from "../../store";
import { useEffect } from "react";
import { Loader } from "../../utils";

export const TrashedItems = () => {
  const trashedItems = useItems((state) => state.itemTrashedData);
  const { loading, fetchTrashedItem } = useItems();
  const navigate = useNavigate();
  //   console.log(items);

  useEffect(() => {
    fetchTrashedItem();
  }, [fetchTrashedItem]);
  return (
    <section className="flex flex-col gap-4 text-darker dark:text-white">
      <div className="w-full">{/* <SearchBar /> */}</div>
      {loading && <Loader />}
      {trashedItems.length > 0 ? (
        trashedItems.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            quantity={item.quantity}
            description={item.description}
            isRestore={true}
          />
        ))
      ) : (
        <>
          <div
            className={`gap-4 flex flex-col items-center justify-center text-black dark:text-white h-screen
              }`}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="mb-4">No trashed items...</span>
              <div>
                <button
                  type="button"
                  onClick={() => navigate("/item/add")}
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white dark:bg-darker rounded-full border border-gray-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-100"
                >
                  Add an Item
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
