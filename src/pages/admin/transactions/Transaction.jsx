import { useTransfer } from "../../../store";
import { Loader } from "../../../utils";
import { AdminViewTransactions } from "./ViewTransactions";
import { SearchBar } from "../../../components";
import { Paginate } from "../../../components/navigation";
import { useEffect } from "react";

export const AdminTransaction = () => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    filterAdminTransferItems,
    fetchAdminTransferItems,
    transactions,
  } = useTransfer();

  //paginate
  useEffect(() => {
    fetchAdminTransferItems(currentPage);
  }, [fetchAdminTransferItems, currentPage]);
  return (
    <>
      {loading && (
        <div className="min-h-screen flex justify-center">
          <Loader />
        </div>
      )}
      <section className="container mx-auto pb-20">
        <div className="w-full">
          <SearchBar onSearch={filterAdminTransferItems} />
        </div>
        {transactions.length === 0 &&
         <div className="flex min-h-screen justify-center">
        <p>No transactions yet</p>
        </div>}
        <AdminViewTransactions />
        <Paginate
          currentPages={currentPage}
          totalPages={totalPages}
          onPageChanges={setCurrentPage}
        />
      </section>
    </>
  );
};
