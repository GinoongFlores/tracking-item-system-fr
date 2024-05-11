import { CiImageOn } from "react-icons/ci";
import { useTransfer } from "../../../store";
import { useFormatDate, UserRole, useStatusComponent } from "../../../hooks";
import { TransactionStatus } from "../../select/TransactionStatus";
import { ArrowBack, Item } from "../../../../public/svg";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const { selectedTransaction } = useTransfer();
  const itemStatus = selectedTransaction?.status;
  const navigate = useNavigate();

  const userRole = UserRole();
  const superAdmin = userRole === "super_admin";
  const statusColor = useStatusComponent();

  const sender = [
    {
      name: "Name",
      value: selectedTransaction.sender || "Christian Paul Flores",
    },
    {
      name: "Contact",
      value: selectedTransaction.sender_phone || "09273334152",
    },
    {
      name: "Company",
      value: selectedTransaction.sender_company || "Company 1",
    },
  ];

  const receiver = [
    {
      name: "Name",
      value: selectedTransaction.receiver || "Marcus Aurelius",
    },
    {
      name: "Contact",
      value: selectedTransaction.receiver_phone || "09273334152",
    },
    {
      name: "Company",
      value: selectedTransaction.receiver_company || "Company 3",
    },
  ];
  return (
    <>
      <section className="container mx-auto w-full">
        <div className="grid grid-cols-2 gap-4 px-4 pb-4">
          <div className="header mb-8 col-span-2 border-b border-gray-500 p-4">
            <div className="flex gap-4">
              <button onClick={() => navigate(-1)}>
                <ArrowBack />
              </button>
              <h3>View Item Transaction Details</h3>
            </div>
          </div>

          <div className="status col-span-2 place-self-end w-full">
            <div className="flex justify-between">
              <div className="transaction_num flex gap-4">
                <p className="text-gray-400">Transaction number: </p>
                <span>{selectedTransaction.transaction_id || "123123123"}</span>
              </div>

              <div>
                <span
                  className={`${
                    statusColor[itemStatus || ""]
                  } text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}
                >
                  {(itemStatus === "reject" && "cancelled") ||
                    itemStatus ||
                    "status"}
                </span>
              </div>
            </div>
          </div>

          <div className="name">
            <p className="text-gray-400">Item name</p>
            <p>{selectedTransaction?.name}</p>
          </div>

          <div className="qty">
            <p className="text-gray-400">Quantity</p>
            <p>{selectedTransaction?.quantity || "123"}</p>
          </div>

          <div className="description col-span-2">
            <p className="text-gray-400">Description</p>
            <p>
              {selectedTransaction?.description ||
                "lorem ipsum lorem ipsum lorem ipsum lorem ipsum"}
            </p>
          </div>
          <div className="flex gap-4 flex-wrap image col-span-2 justify-self-start">
            {selectedTransaction.image ? (
              selectedTransaction.image
                .split(",")
                .map((imageUrl, index) => (
                  <img
                    key={index}
                    src={`https://ucarecdn.com/${imageUrl}/-/resize/400x400/`}
                    alt={`Transaction image ${index + 1}`}
                    className="object-cover w-full h-16 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  />
                ))
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
                  {useFormatDate(selectedTransaction.date) ||
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
                  {selectedTransaction.sender || "John Doe"} is requesting to
                  transfer an item.
                </p>
              </div>
            </div>
          </div>

          {/* sender & receiver */}
          <div className="sender gap-4 flex flex-col">
            <h1 className="text-lg font-bold my-2">Sender</h1>

            {sender.map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-400">{item.name}</p>
                <p className="text-md">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="receiver gap-4 flex flex-col">
            <h1 className="text-lg font-bold my-2">Receiver</h1>
            {receiver.map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-400">{item.name}</p>
                <p className="text-md">{item.value}</p>
              </div>
            ))}
          </div>
          {!superAdmin &&
            (selectedTransaction.status === "received" ? (
              <div className="col-span-2 w-full mt-6">
                <p>
                  The item is already received by{" "}
                  {selectedTransaction?.receiver}
                </p>
              </div>
            ) : (
              <div className="col-span-2 w-full">
                {/* <ButtonActions name={"Reject"} />
                <ButtonActions name={"Approve"} /> */}
                <TransactionStatus
                  status={selectedTransaction.status}
                  transactionId={selectedTransaction.transaction_id}
                />
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
