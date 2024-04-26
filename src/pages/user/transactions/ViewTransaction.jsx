import { TransactionCard } from "../../../components/cards";
import { useTransfer } from "../../../store";
import { CiImageOn } from "react-icons/ci";
import { useState, useEffect } from "react";

export const ViewTransaction = () => {
  const { transactions, fetchUserTransferItems } = useTransfer((state) => ({
    transactions: state.transactions,
    fetchUserTransferItems: state.fetchUserTransferItems,
    loading: state.loading,
  }));

  useEffect(() => {
    if (transactions.length === 0) {
      fetchUserTransferItems();
    }
  }, [fetchUserTransferItems, transactions]);

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
      {transactions.map((transaction) =>
        transaction.items.map((item, index) => (
          <TransactionCard
            key={index}
            Image={CiImageOn}
            status={item.status}
            name={item.name}
            transaction_num={item.transaction_id}
            receiver={transaction.receiver_full_name}
          />
        ))
      )}
    </div>
  );
};
