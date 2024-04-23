import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useTransfer = create((set) => ({
  transactions: [],
  loading: false,
  setLoading: (loading) => set(() => ({ loading })),
  clearTransactions: () => set(() => ({ transactions: [] })),

  transferItem: async (data) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.post("/item/transfer", data);
      set((state) => ({
        transactions: [...state.transactions, response.data.data],
        loading: false,
      }));

      toast.success("Item is pending for transfer");
    } catch (error) {
      //   console.log("Failed to transfer items: ", error);
      set({ loading: false });
      const errorMessage = error.response.data.message.error;
      toast.error(`${errorMessage}`);
    }
  },

  fetchUserTransferItems: async () => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get("item/user/view-transactions");
      const newTransactions = response.data.data; // array of transactions
      // console.log("transactions ", newTransactions);
      set((state) => {
        // Filter out any existing transactions that are also in the newTransactions Array to prevent duplicates. Yet fetching items with the same transaction ID
        const filteredTransactions = state.transactions.filter(
          (transaction) =>
            !newTransactions.some(
              (newTransaction) =>
                newTransaction.id === transaction.id &&
                newTransaction.items.every((newItem) =>
                  transaction.items.some(
                    (item) => item.transaction_id === newItem.transaction_id
                  )
                )
            )
        );

        // Concatenate the new data onto the filtered array
        return {
          transactions: filteredTransactions.concat(newTransactions),
          loading: false,
        };
      });
    } catch (error) {
      set({ loading: false });
      toast.error("There was an error while fetching a data");
      console.log(error);
    }
  },
}));
