import { CiImageOn } from "react-icons/ci";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useState } from "react";
import { useItems } from "../../store/StoreItems";

export const ItemCard = ({ id, name, description, quantity }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const deleteUserItem = useItems((state) => state.deleteUserItem);

  const handleDelete = async () => {
    console.log(id);
    await deleteUserItem(id);
  };

  return (
    <div className="max-w-3xl px-4 w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="grid grid-cols-3 grid-flow-row-dense w-full relative">
        <div className="flex gap-4 col-span-2">
          <div className="flex flex-col place-self-center">
            <CiImageOn
              className="object-cover w-full h-12 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              alt="item image"
            />
            <span className="text-center text-sm text-black dark:text-white">
              Date & time
            </span>
          </div>
          <div className="flex flex-col py-4 leading-normal">
            <h5 className="mb-2.5 text-md md:text-lg lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name || "Item name"}
            </h5>
            <span className="text-sm">{`${
              !quantity ? "Quantity: 0" : `Quantity ${quantity}`
            }`}</span>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description || "lorem10 asdasdasadjfhaj hdfajh dfjahkjd"}
            </p>
          </div>
        </div>
        <div className="place-self-center">
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <FaArrowAltCircleUp className="w-full object-cover h-6 text-gray-500 dark:text-gray-400" />
            ) : (
              <FaArrowAltCircleDown className="w-full object-cover h-6 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
      {/* actions */}
      {isExpanded && (
        <div
          className={`gap-4 flex w-full justify-end transition-all duration-300 ease-in-out  ${
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          <div>
            <button
              onClick={handleDelete}
              type="button"
              className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white dark:bg-darker rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-100"
            >
              Delete
            </button>
          </div>
          <div>
            <button
              type="button"
              className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white dark:bg-darker rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-100"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
