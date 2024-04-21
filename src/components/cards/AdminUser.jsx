import { CiImageOn } from "react-icons/ci";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useState } from "react";
import { ButtonActions } from "../buttons";
import { useAdmin } from "../../store";

export const AdminUser = ({
  defaultActions,
  isDisable,
  isActivated,
  disableFun,
  deleteFun,
  editFun,

  Image,
  name,
  email,
  id,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const handleToggleActivation = useAdmin(
  //   (state) => state.handleToggleActivation
  // );
  // console.log(isActivated);
  // const handleActivation = () => {
  //   handleToggleActivation(id);
  // };

  return (
    <div className="shadow-xl max-w-3xl visible h-full px-4 w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
      <div className="grid grid-cols-3 grid-flow-row-dense w-full relative">
        <div className="flex gap-4 col-span-2">
          <div className="flex flex-col place-self-center">
            {Image && (
              <Image
                className="object-cover w-full h-12 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                alt="item image"
              />
            )}

            <span className="text-center text-sm text-black dark:text-white">
              Date & time
            </span>
          </div>
          <div className="flex flex-col py-4 leading-normal">
            <h5 className="mb-2.5 text-md md:text-lg lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name || "user name"}
            </h5>
            {/* <span className="text-sm">{`${
                !quantity ? "Quantity: 0" : `Quantity: ${quantity}`
              }`}</span> */}
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {email || "email"}
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
          className={`gap-2 flex w-full justify-end transition-all duration-300 ease-in-out ${
            isExpanded ? "opacity-100 " : "opacity-0 "
          }`}
        >
          {defaultActions && (
            <>
              <ButtonActions action={deleteFun} name={"Delete"} />
              <ButtonActions name={"Edit"} />
              <ButtonActions action={disableFun} name={"View"} />
            </>
          )}
          {isDisable && (
            <ButtonActions
              action={disableFun}
              name={isActivated ? "Enable" : "Disable"}
            />
          )}
        </div>
      )}
    </div>
  );
};
