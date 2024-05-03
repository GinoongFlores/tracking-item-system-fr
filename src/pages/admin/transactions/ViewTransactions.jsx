import { TransactionCard } from "../../../components/cards";
import { useTransfer } from "../../../store";

export const AdminViewTransactions = () => {
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
                transaction_id={item.transaction_id}
                sender={transaction.sender_full_name}
                sender_phone={transaction.sender_phone}
                quantity={item.quantity}
                sender_company={transaction.sender_company}
                receiver={transaction.receiver_full_name}
                receiver_phone={transaction.receiver_phone}
                receiver_company={transaction.receiver_company}
                status={item.status}
                isTransaction={true}
                image={item.image}
                description={item.description}
                name={item.name}
                date={item.updated_at}
              />
            ))
        )}
    </div>
  );
};
