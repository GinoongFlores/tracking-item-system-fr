import { useEffect, useRef, useState } from "react";
import { useTransfer } from "../../store";
import { ButtonLink, ButtonActions } from "../buttons";
import { useNavigate } from "react-router-dom";

export const TransactionStatus = ({ transactionId, status }) => {
  const { attachTransactionStatus, handleTransactionChange } = useTransfer();
  const [selectedStatus, setSelectedStatus] = useState(status);
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event && event.target) {
      let status = event.target.value;
      setSelectedStatus(status);
      handleTransactionChange(transactionId, status);
    }
  };
  return (
    <form className="max-w-sm">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select Transaction Status
      </label>
      <select
        id="countries"
        onChange={handleChange}
        value={selectedStatus || ""}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Choose a status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="delivered">Delivered</option>
        <option value="reject">Reject</option>
      </select>

      <div className="flex gap-4 items-center justify-center mt-5">
        <div className="w-60 md:w-full px-4">
          <ButtonActions
            name={"submit"}
            action={async () => {
              await attachTransactionStatus(transactionId, selectedStatus);
              navigate("/transaction");
            }}
          />
        </div>

        <div className="w-60 md:w-full">
          <ButtonActions
            name={"Back"}
            action={() => navigate("/transaction")}
          />
        </div>
      </div>
    </form>
  );
};
