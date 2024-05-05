import { TransactionCard } from "../../../components/cards";
import { useTransfer } from "../../../store";
import { useEffect } from "react";
import { Paginate } from "../../../components/navigation";
import { Loader } from "../../../utils";

export const ViewTransaction = () => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    fetchUserTransferItems,
    transactions,
  } = useTransfer();

  useEffect(() => {
    fetchUserTransferItems(currentPage);
  }, [fetchUserTransferItems, currentPage]);

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
      {loading && <Loader />}
      {transactions.length > 0 ? (
        transactions &&
        transactions.map(
          (transaction) =>
            transaction.items &&
            transaction.items.map((item, index) => (
              <TransactionCard
                key={index}
                image={item.image}
                status={item.status}
                name={item.name}
                date={item.updated_at}
                transaction_num={item.transaction_id}
                receiver={transaction.receiver_full_name}
              />
            ))
        )
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div>
            <p>No transactions yet</p>
          </div>
        </div>
      )}

      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChanges={setCurrentPage}
      />
    </div>
  );
};
