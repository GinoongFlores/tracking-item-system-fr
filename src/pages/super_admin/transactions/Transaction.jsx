import { useTransfer } from "../../../store";
import { Loader } from "../../../utils";
import { ViewAllTransactions } from "./ViewTransactions";
import { SearchBar } from "../../../components";
import { Paginate } from "../../../components/navigation";
import { useEffect } from "react";

export const Transactions = () => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    filterAllTransferItems,
    fetchAllTransferItems,
    transactions,
  } = useTransfer();

  //paginate
  useEffect(() => {
    fetchAllTransferItems(currentPage);
  }, [fetchAllTransferItems, currentPage]);
  return (
    <>
      {loading && <Loader />}
      <section className="container mx-auto pb-20">
        <div className="w-full">
          <SearchBar onSearch={filterAllTransferItems} />
        </div>
        {transactions.length === 0 && <p>No transactions yet</p>}
        <ViewAllTransactions />
        <Paginate
          currentPages={currentPage}
          totalPages={totalPages}
          onPageChanges={setCurrentPage}
        />
      </section>
    </>
  );
};
