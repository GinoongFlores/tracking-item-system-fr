import { useTransfer } from "../../../store";
import { TransactionCard } from "../../../components/cards";

export const ViewReceive = () => {
  const transactions = useTransfer((state) => state.transactions);
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
      {transactions &&
        transactions.map(
          (transaction) =>
            transaction.items &&
            transaction.items.map((item, index) => (
              <TransactionCard
                key={`${transaction.id}-${index}`}
                image={item.image}
                status={item.status}
                name={item.name}
                date={item.updated_at}
                isReceiver={true}
                item_id={item.item_id}
                transaction_id={item.transaction_id}
                sender={transaction.sender_full_name}
                sender_phone={transaction.sender_phone}
                quantity={item.quantity}
                sender_company={transaction.sender_company}
                receiver={transaction.receiver_full_name}
                receiver_phone={transaction.receiver_phone}
                receiver_company={transaction.receiver_company}
                description={item.description}
              />
            ))
        )}
    </div>
  );
};
