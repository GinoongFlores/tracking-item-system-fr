import { useTransfer } from "../../../store";
import { TransactionCard } from "../../../components/cards";

export const ViewReceive = () => {
  const transactions = useTransfer((state) => state.transactions);
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
      {transactions.map((transaction) =>
        transaction.items.map((item, index) => (
          <TransactionCard
            key={index}
            image={item.image}
            status={item.status}
            name={item.name}
            date={item.updated_at}
            transaction_num={item.transaction_id}
            sender={transaction.sender_full_name}
          />
        ))
      )}
    </div>
  );
};
