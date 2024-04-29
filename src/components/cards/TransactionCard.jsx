import { useState, useEffect } from "react";
import { BreadCrumbsArrow } from "../../../public/svg";
import { useTransfer } from "../../store";
import { useFormatDate } from "../../hooks";

export const TransactionCard = ({
  Image,
  name,
  transaction_num,
  status,
  receiver,
  sender,
  date,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="shadow-xl shadow-slate-400 dark:shadow-gray-800 max-w-3xl visible h-full px-4 w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
      <div className="grid grid-cols-3 grid-flow-row-dense w-full relative">
        <div className="flex gap-4 col-span-2">
          <div className="flex flex-col place-self-center">
            {Image && (
              <Image
                className="object-cover w-full h-12 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                alt="item image"
              />
            )}

            {/* <span className="text-center text-sm text-black dark:text-white">
                  Date & time
                </span> */}
          </div>
          <div className="py-4 leading-normal text-gray-900 dark:text-white">
            <div className="flex justify-between gap-4 relative">
              <div className="self-center justify-self-center">
                <h5 className="mb-2.5 text-md md:text-lg lg:text-2xl font-bold tracking-tight">
                  {name || "Item name"}
                </h5>
              </div>

              {/* badge (status) */}
              <div className="">
                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {status || "N/A"}
                </span>
              </div>
            </div>
            <span className="text-sm leading-relaxed">
              {sender && (
                <>
                  <span className="font-semibold">Sender</span>:{" "}
                  {`${sender || "N/A"}`}
                </>
              )}

              <p>{`Receiver: ${receiver || "N/A"}`}</p>
              <p className="">{useFormatDate(date) || "Date"}</p>
            </span>
          </div>
        </div>
        {/* 2nd column */}
        <div className="place-self-center">
          <div className="">
            <button onClick={() => setIsExpanded(!isExpanded)}>
              <BreadCrumbsArrow />
            </button>
          </div>
          {/* <div className="relative top-4">
            <p className="text-sm leading-normal">
              {`Transaction id: ${transaction_num || "N/A"}`}
            </p>
          </div> */}
        </div>
      </div>
      {/* actions */}
    </div>
  );
};
