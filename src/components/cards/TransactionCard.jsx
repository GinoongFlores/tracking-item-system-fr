import { useState, useEffect } from "react";
import { BreadCrumbsArrow } from "../../../public/svg";
import { useTransfer } from "../../store";
import { useFormatDate } from "../../hooks";
import { CiImageOn } from "react-icons/ci";
import { Admin as AdminTransaction } from "../forms";
import { useNavigate } from "react-router-dom";

export const TransactionCard = ({
  image,
  name,
  quantity,
  receiver_company,
  sender_company,
  receiver_phone,
  sender_phone,
  status,
  receiver,
  sender,
  date,

  isTransaction,
  isReceiver,
  isSuperAdmin,
  transaction_id,
  item_id,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const setSelectedTransaction = useTransfer(
    (state) => state.setSelectedTransaction
  );
  const transaction = {
    transaction_id,
    item_id,
    description,
    receiver_company,
    sender_company,
    receiver_phone,
    sender_phone,
    // for cards

    quantity,
    image,
    name,
    status,
    receiver,
    sender,
    date,
  };

  return (
    <div className="shadow-xl shadow-slate-400 dark:shadow-gray-800 max-w-3xl visible h-full px-4 w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
      <div
        className={`${
          isTransaction && `cursor-pointer`
        } grid grid-cols-3 grid-flow-row-dense w-full relative`}
        onClick={() => {
          console.log("selected transaction: ", transaction);
          setSelectedTransaction(transaction);
          isTransaction ? navigate("/admin/transaction") : null;
          isSuperAdmin ? navigate("/all-transaction") : null;
          isReceiver ? navigate("/item/view-receive") : null;
        }}
      >
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

            {/* <span className="text-center text-sm text-black dark:text-white">
                  Date & time
                </span> */}
          </div>
          <div className="py-4 leading-normal relative text-gray-900 dark:text-white">
            <div className="w-full flex gap-4 col-span-3">
              <div className="justify-self-start">
                <h5 className="mb-2.5 text-md md:text-lg lg:text-2xl font-bold tracking-tight">
                  {name || "Item name"}
                </h5>
              </div>

              {/* badge (status) */}
              <div className="justify-self-end absolute left-40">
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

              {receiver && <p>{`Receiver: ${receiver || "N/A"}`}</p>}
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
