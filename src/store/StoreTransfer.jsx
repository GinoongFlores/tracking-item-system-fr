import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useTransfer = create((set) => ({
  transactions: [],
  loading: false,
  setLoading: (loading) => set(() => ({ loading })),
  clearTransactions: () => set(() => ({ transactions: [] })),
  // paginate
  totalPages: 0,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  // selectedTransaction
  selectedTransaction: null,
  setSelectedTransaction: (transaction) =>
    set(() => ({ selectedTransaction: transaction })),

  // status
  transactionStatus: "",
  handleTransactionChange: (transactionId, status) => {
    set({ transactionStatus: status });
  },

  // counts
  totalTransactions: 0,
  totalReceivedItems: 0,
  totalSentItems: 0,
  totalItems: 0,

  receiverReceivedStatus: "",
  receiverReceived: async (transactionId, itemId, received) => {
    set({ receiverReceivedStatus: "loading" });
    try {
      const response = await AxiosInstance.post(
        `/item/transaction/${transactionId}/received-item/${itemId}`,
        {
          status: received,
        }
      );
      set({ receiverReceivedStatus: "success" });
      toast.success("Received an item successfully");
      return response;
    } catch (error) {
      console.log(error.response);
      set({ receiverReceivedStatus: "error" });
      toast.error("There's an error occurred while receiving an item");
    }
  },

  attachTransactionStatus: async (transactionId, status) => {
    try {
      const response = await AxiosInstance.post(
        `/item/transfer/${transactionId}/status`,
        {
          status,
        }
      );
      if (response && response.status === 200) {
        set((state) => {
          const transactions = state.transactions.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, status }
              : transaction
          );
          toast.success(`This item is now ${status}`);
          return { transactions };
        });
      } else {
        toast.error("Transaction status update failed");
      }
    } catch (error) {
      console.log(error);
    }
  },

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

  fetchAllTransferItems: async (page = 1) => {
    set({ loading: true });

    try {
      const response = await AxiosInstance.get(
        `item/view-transactions?page${page}`
      );
      console.log("all transactions: ", response.data);

      const newTransactions = response.data.data; // array of transactions
      set((state) => {
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
          totalPages: response.data.last_page,
          loading: false,
        };
      });
    } catch (error) {
      console.log(error.response);
    }
  },

  fetchUserTransferItems: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get(
        `item/user/view-transactions?page${page}`
      );
      console.log("user transfers: ", response.data);
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
          totalPages: response.data.last_page,
          loading: false,
        };
      });
    } catch (error) {
      set({ loading: false });
      toast.error("There was an error while fetching a data");
      console.log(error);
    }
  },

  fetchAdminTransferItems: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get(
        `item/admin/view-transactions?page=${page}`
      );

      const newTransactions = response.data.data; // array of transactions
      console.log("transactions ", newTransactions);
      set((state) => {
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
          totalPages: response.data.last_page,
          loading: false,
        };
      });
    } catch (error) {
      set({ loading: false });
      // toast.error("There was an error while fetching a data");
      console.log(error.response);
    }
  },

  fetchReceiverTransactions: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get(
        `item/received/view-transactions?page=${page}`
      );

      const newTransactions = response.data.data; // array of transactions
      console.log("transactions ", newTransactions);
      set((state) => {
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
          totalPages: response.data.last_page,
          loading: false,
        };
      });
    } catch (error) {
      set({ loading: false });
      // console.log("response error", error.response);
      // toast.error("There was an error while fetching a data");
      // console.log(error);
    }
  },

  filterAllTransferItems: async (search) => {
    try {
      let response;

      if (search) {
        response = await AxiosInstance.get(
          `item/view-transactions?search=${encodeURIComponent(search)}`
        );
      } else {
        response = await AxiosInstance.get(`item/view-transactions`);
      }

      let newTransactions = response.data.data;

      newTransactions = newTransactions.map((transaction) => ({
        ...transaction,
        items: Array.isArray(transaction.items) ? transaction.items : [],
      }));

      set(() => {
        return {
          transactions: newTransactions,
          loading: false,
        };
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  filterReceiverTransactions: async (search) => {
    try {
      let response;

      if (search) {
        response = await AxiosInstance.get(
          `item/received/view-transactions?search=${encodeURIComponent(search)}`
        );
      } else {
        response = await AxiosInstance.get(`item/received/view-transactions`);
      }

      let newTransactions = response.data.data;

      newTransactions = newTransactions.map((transaction) => ({
        ...transaction,
        items: Array.isArray(transaction.items) ? transaction.items : [],
      }));

      set(() => {
        return {
          transactions: newTransactions,
          loading: false,
        };
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  filterAdminTransferItems: async (search) => {
    try {
      let response;

      if (search) {
        response = await AxiosInstance.get(
          `item/admin/view-transactions?search=${encodeURIComponent(search)}`
        );
      } else {
        response = await AxiosInstance.get(`item/admin/view-transactions`);
      }

      let newTransactions = response.data.data;

      newTransactions = newTransactions.map((transaction) => ({
        ...transaction,
        items: Array.isArray(transaction.items) ? transaction.items : [],
      }));

      set(() => {
        return {
          transactions: newTransactions,
          loading: false,
        };
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  filterUserTransferItems: async (search) => {
    // set({ loading: true });
    try {
      let response;

      if (search) {
        response = await AxiosInstance.get(
          `item/user/view-transactions?search=${encodeURIComponent(search)}`
        );
      } else {
        response = await AxiosInstance.get(`item/user/view-transactions`);
      }

      let newTransactions = response.data.data;

      // ensure that the 'items' property of each transaction is an Array. This prevents the error of `transactions.items.map is not a function` in the ViewTransaction component. This error happens when we search an item that has the same transaction id with another item.
      newTransactions = newTransactions.map((transaction) => ({
        ...transaction,
        items: Array.isArray(transaction.items) ? transaction.items : [],
      }));

      set(() => {
        return {
          transactions: newTransactions,
        };
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
}));
