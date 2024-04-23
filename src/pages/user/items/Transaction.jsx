import { TransactionCard } from "../../../components/cards";
import { CiImageOn } from "react-icons/ci";
import { useTransfer } from "../../../store";
import { useState, useEffect } from "react";
import { Loader } from "../../../utils";

export const Transaction = () => {
  const { transactions, fetchUserTransferItems, loading } = useTransfer(
    (state) => ({
      transactions: state.transactions,
      fetchUserTransferItems: state.fetchUserTransferItems,
      loading: state.loading,
    })
  );

  useEffect(() => {
    fetchUserTransferItems();
  }, [fetchUserTransferItems]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
        {transactions.map((transaction, index) => (
          <TransactionCard
            key={index}
            Image={CiImageOn}
            status={transaction.items[0]?.status}
            name={transaction.items[0]?.name}
            transaction_num={transaction.items[0]?.transaction_id}
            receiver={transaction.receiver_full_name}
          />
        ))}
      </div>
    </section>
  );
};
