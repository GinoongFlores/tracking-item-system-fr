import { CiImageOn } from "react-icons/ci";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useState } from "react";
import { useItems } from "../../store";
import { ButtonActions } from "../buttons";
import { EditItem } from "../../components/modal";
import { useFormatDate } from "../../hooks/useFormatDate";
import { IoArrowDownOutline, IoArrowUp } from "react-icons/io5";

export const ItemCard = ({
  id,
  name,
  image,
  description,
  quantity,
  isEdit,
  isDelete,
  isRestore,
  updated_at,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const deleteUserItem = useItems((state) => state.deleteUserItem);
  const restoreUserTrashedItem = useItems(
    (state) => state.restoreUserTrashedItem
  );

  const item = { id, name, description, quantity, image };

  return (
    <div className="shadow-xl max-w-3xl visible h-full px-4 w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
      <div className="grid grid-cols-3 grid-flow-row-dense w-full relative">
        <div className="flex gap-4 col-span-2">
          <div className="flex flex-col place-self-center">
            {image ? (
              <img
                src={`https://ucarecdn.com/${
                  image.split(",")[0]
                }/-/resize/400x400/`}
                alt="item image"
                className="object-cover w-full h-12 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              />
            ) : (
              <CiImageOn
                className="object-cover w-full h-12 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                alt="item image"
              />
            )}
            <div>
              <span className="text-center text-sm text-black dark:text-white">
                {useFormatDate(updated_at) || "Date & time"}
              </span>
            </div>
          </div>
          <div className="flex flex-col py-4 leading-normal">
            <h5 className="mb-2.5 text-md md:text-lg lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name || "Item name"}
            </h5>
            <span className="text-sm">{`${
              !quantity ? "Quantity: 0" : `Quantity: ${quantity}`
            }`}</span>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description || "description"}
            </p>
          </div>
        </div>
        <div className="place-self-center">
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <IoArrowUp className="w-full object-cover h-6 text-gray-500 dark:text-gray-400" />
            ) : (
              <IoArrowDownOutline className="w-full object-cover h-6 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
      {/* actions */}
      {isExpanded && (
        <div
          className={`gap-4 flex w-full justify-end transition-all duration-300 ease-in-out ${
            isExpanded ? "opacity-100 " : "opacity-0 "
          }`}
        >
          {isDelete && (
            <div>
              <ButtonActions
                action={() => deleteUserItem(id)}
                name={"Delete"}
              />
            </div>
          )}
          {isEdit && (
            <div>
              <EditItem item={item} />
            </div>
          )}
          {isRestore && (
            <div>
              <ButtonActions
                action={() => restoreUserTrashedItem(id)}
                name={"Restore"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
