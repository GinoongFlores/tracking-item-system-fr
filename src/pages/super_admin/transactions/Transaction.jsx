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
      {loading && <Loader />}
      <section className="container mx-auto pb-20">
        <div className="w-full">
          <SearchBar onSearch={filterAdminTransferItems} />
        </div>
        {transactions.length === 0 && <p>No transactions yet</p>}
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