import { SearchBar } from "../../../components";
import { Paginate } from "../../../components/navigation";
import { Loader } from "../../../utils";
import { ButtonLink } from "../../../components/buttons";
import { useTransfer } from "../../../store";
import { ViewReceive } from "./ViewReceive";
import { useEffect, useState } from "react";

export const Receive = () => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    filterReceiverTransactions,
    fetchReceiverTransactions,
    transactions,
  } = useTransfer();

  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      const result = await fetchReceiverTransactions(currentPage);
      setSearchPerformed(!!filterReceiverTransactions);
      return result;
    };

    fetchTransaction();
  }, [fetchReceiverTransactions, currentPage, filterReceiverTransactions]);

  return (
    <section className="container mx-auto pb-20">
      {loading && <Loader />}
      {transactions.length === 0 && (
        <div className="min-h-screen flex items-center justify-center">
          {searchPerformed && <p>No Items Found.</p>}
          {!searchPerformed && <p>No pending items yet.</p>}
        </div>
      )}
      <ViewReceive />
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChanges={setCurrentPage}
      />
    </section>
  );
};
