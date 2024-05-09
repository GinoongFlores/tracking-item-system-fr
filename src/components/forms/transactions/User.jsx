import { CiImageOn } from "react-icons/ci";
import { useTransfer } from "../../../store";
import { useFormatDate, useStatusComponent } from "../../../hooks";
import { ArrowBack, Item } from "../../../../public/svg";
import { useNavigate } from "react-router-dom";
import { Loader, ItemStatusComponent } from "../../../utils";

export const User = () => {
  const { selectedTransaction, loading } = useTransfer();
  const transactionId = selectedTransaction?.transaction_id;
  const itemId = selectedTransaction?.item_id;
  const itemStatus = selectedTransaction?.status;
  const navigate = useNavigate();
  const statusColor = useStatusComponent();

  return (
    <>
      {loading && <Loader />}
      <section className="container mx-auto w-full">
        <div className="grid grid-cols-2 gap-4 px-4">
          <div className="header mb-8 col-span-2 border-b border-gray-500 p-4">
            <div className="flex gap-4">
              <button onClick={() => navigate(-1)}>
                <ArrowBack />
              </button>
              <h3>View Receiver Item Details</h3>
            </div>
          </div>

          <div className="status col-span-2 place-self-end w-full">
            <div className="flex justify-between">
              <div className="transaction_num">
                <p>
                  Transaction number:{" "}
                  <span>
                    {selectedTransaction?.transaction_id || "123123123"}
                  </span>
                </p>
              </div>

              <div>
                <span
                  className={`${
                    statusColor[itemStatus || ""]
                  } text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}
                >
                  {itemStatus || "status"}
                </span>
              </div>
            </div>
          </div>

          <div className="name">
            <p>Item name</p>
            <p>{selectedTransaction?.name}</p>
          </div>

          <div className="qty">
            <p>Quantity</p>
            <p>{selectedTransaction?.quantity || "123"}</p>
          </div>

          <div className="description col-span-2">
            <p>Description</p>
            <p>
              {selectedTransaction?.description ||
                "lorem ipsum lorem ipsum lorem ipsum lorem ipsum"}
            </p>
          </div>
          <div className="flex flex-wrap image col-span-2 justify-self-start">
            {selectedTransaction?.image ? (
              <img
                src={`https://ucarecdn.com/${
                  selectedTransaction.image.split(",")[0]
                }/-/resize/400x400/`}
                alt="image"
                className="object-cover w-full h-12 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              />
            ) : (
              <div className="item">
                <CiImageOn
                  className="object-cover w-full h-12 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  alt=" image"
                />
              </div>
            )}
          </div>

          <div className="col-span-2 text-sm my-4 rounded-md bg-sky-200 dark:bg-gray-700 p-4">
            <div className="flex gap-4 items-center">
              <div className="time">
                <p>
                  {useFormatDate(selectedTransaction?.date) ||
                    "March 30, 2024 at 6:00 pm"}
                </p>
              </div>

              <div className="Image">
                <Item
                  className="object-cover w-full h-14 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  alt=" image"
                />
              </div>

              <div className="transfer">
                <p className="font-semibold">Request Item Transfer</p>
                <p className="text-gray-500 dark:text-gray-300">
                  {selectedTransaction?.sender || "John Doe"} is requesting to
                  transfer an item.
                </p>
              </div>
            </div>
          </div>

          {/* sender & receiver */}
          <div className="sender gap-4 flex flex-col">
            <h1 className="text-lg font-bold my-2">Sender</h1>

            <div>
              <p className="text-sm">Name</p>
              <p className="text-md">
                {selectedTransaction?.sender || "Christian Paul Flores"}
              </p>
            </div>

            <div>
              <p className="text-sm">Contact</p>
              <p className="text-md">
                {selectedTransaction?.sender_phone || "09273334152"}
              </p>
            </div>

            <div>
              <p className="text-sm">Company</p>
              <p className="text-md">
                {selectedTransaction?.sender_company || "Company 1"}
              </p>
            </div>
          </div>

          <div className="receiver gap-4 flex flex-col">
            <h1 className="text-lg font-bold my-2">Receiver</h1>

            <div>
              <p className="text-sm">Name</p>
              <p className="text-md">
                {selectedTransaction?.receiver || "Marcus Aurelius"}
              </p>
            </div>

            <div>
              <p className="text-sm">Contact</p>
              <p className="text-md">
                {selectedTransaction?.receiver_phone || "09273334152"}
              </p>
            </div>

            <div>
              <p className="text-sm">Company</p>
              <p className="text-md">
                {selectedTransaction?.receiver_company || "Company 3"}
              </p>
            </div>
          </div>
          {/* item status */}
          {/* {itemStatusComponent[itemStatus]} */}

          <ItemStatusComponent
            itemStatus={itemStatus}
            transactionId={transactionId}
            itemId={itemId}
          />
        </div>
      </section>
    </>
  );
};
