import { CiImageOn } from "react-icons/ci";
import { useTransfer } from "../../../store";
import { useFormatDate } from "../../../hooks";
import { ArrowBack, Item } from "../../../../public/svg";
import { useNavigate } from "react-router-dom";
import { ButtonActions } from "../../buttons";

import { ButtonModal } from "../../buttons";
import { useModal } from "../../../hooks";
import { Loader } from "../../../utils";

export const User = () => {
  const { selectedTransaction, receiverReceived, loading } = useTransfer();
  const transactionId = selectedTransaction?.transaction_id;
  const itemId = selectedTransaction?.item_id;
  const itemStatus = selectedTransaction?.status;
  const navigate = useNavigate();

  const { modal, modalRef } = useModal();
  const toggleModal = () => {
    if (modal.current.isVisible()) {
      modal.current.hide();
    } else {
      modal.current.show();
    }
  };

  const itemStatusComponent = {
    delivered: (
      <div className="col-span-2 w-full">
        <ButtonActions name={"Received Item"} action={toggleModal} />

        <div
          ref={modalRef}
          id="popup-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={toggleModal}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              {/* modal body */}
              <div className="p-4 md:p-5 text-center flex flex-col justify-items-center items-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure want to receive this item?
                </h3>

                <div className="flex gap-4 mt-4">
                  <ButtonModal
                    onClick={async () => {
                      const response = await receiverReceived(
                        transactionId,
                        itemId,
                        "received"
                      );
                      if (response.status === 200) {
                        toggleModal();
                        navigate(-1);
                      }
                    }}
                    name={"Yes"}
                  ></ButtonModal>

                  <ButtonModal onClick={toggleModal} name={"No"}></ButtonModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    pending: (
      <div className="col-span-2 w-full mt-6">
        <h3>Your item is waiting for admin approval</h3>
      </div>
    ),
    approved: (
      <div className="col-span-2 w-full mt-6">
        <h3>Your item is waiting for delivery</h3>
      </div>
    ),
    received: (
      <div className="col-span-2 w-full mt-6">
        <h3>You already received this item</h3>
      </div>
    ),
    reject: (
      <div className="col-span-2 w-full mt-6">
        <h3>Your item is rejected by your admin</h3>
      </div>
    ),
  };

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
                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {selectedTransaction?.status || "status"}
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
          {itemStatusComponent[itemStatus]}
        </div>
      </section>
    </>
  );
};
