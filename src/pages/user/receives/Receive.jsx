import { SearchBar } from "../../../components";
import { Paginate } from "../../../components/navigation";
import { Loader } from "../../../utils";
import { ButtonLink } from "../../../components/buttons";
import { useTransfer } from "../../../store";
import { ViewReceive } from "./ViewReceive";
import { useEffect } from "react";

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

  useEffect(() => {
    fetchReceiverTransactions(currentPage);
  }, [fetchReceiverTransactions, currentPage]);

  return (
    <section className="container mx-auto pb-20">
      {loading && <Loader />}
      <div className="flex items-center justify-end">
        <ButtonLink name={"Transfer Item"} redirect={"/item/transfer"} />
        <ButtonLink name={"Receiving"} redirect={"/item/receive"} />
      </div>
      <div className="w-full">
        <SearchBar onSearch={filterReceiverTransactions} />
      </div>
      {transactions.length === 0 && (
        <div className="min-h-screen flex items-center justify-center">
          <div>
            <p>No pending items yet.</p>
          </div>
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
