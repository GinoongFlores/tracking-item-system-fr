import { ButtonActions, ButtonModal } from "../components/buttons";
import { useModal } from "../hooks";
import { useTransfer } from "../store";
import { useNavigate } from "react-router-dom";

export const ItemStatusComponent = ({ itemStatus, transactionId, itemId }) => {
  const receiverReceived = useTransfer((state) => state.receiverReceived);
  const navigate = useNavigate();
  const { modal, modalRef } = useModal();

  const toggleModal = () => {
    if (modal.current.isVisible()) {
      modal.current.hide();
    } else {
      modal.current.show();
    }
  };

  const components = {
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

  return components[itemStatus] || null;
};
