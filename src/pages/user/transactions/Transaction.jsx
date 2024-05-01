import { useTransfer } from "../../../store";
import { Loader } from "../../../utils";
import { ViewTransaction } from "./ViewTransaction";
import { SearchBar } from "../../../components";
import { Paginate } from "../../../components/navigation";

export const Transaction = () => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    filterUserTransferItems,
    transactions,
  } = useTransfer();

  return (
    <section className="container mx-auto pb-20">
      {loading && <Loader />}
      <div className="w-full">
        <SearchBar onSearch={filterUserTransferItems} />
      </div>
      {transactions.length === 0 && (
        <div className="min-h-screen flex items-center justify-center">
          <div>
            <p>No transactions yet</p>
          </div>
        </div>
      )}
      <ViewTransaction />
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChanges={setCurrentPage}
      />
    </section>
  );
};
