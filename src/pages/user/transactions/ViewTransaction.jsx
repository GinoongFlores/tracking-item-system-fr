import { TransactionCard } from "../../../components/cards";
import { useTransfer } from "../../../store";

export const ViewTransaction = () => {
  const transactions = useTransfer((state) => state.transactions);
  console.log("user transactions ", transactions);

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
      {transactions &&
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
        )}
    </div>
  );
};
