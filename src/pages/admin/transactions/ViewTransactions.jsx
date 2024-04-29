import { TransactionCard } from "../../../components/cards";
import { useTransfer } from "../../../store";
import { CiImageOn } from "react-icons/ci";

export const AdminViewTransactions = () => {
  const transactions = useTransfer((state) => state.transactions);

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
            sender={transaction.sender_full_name}
            receiver={transaction.receiver_full_name}
          />
        ))
      )}
    </div>
  );
};
