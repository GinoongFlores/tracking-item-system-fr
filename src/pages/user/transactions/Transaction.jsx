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
  } = useTransfer();

  return (
    <section className="container mx-auto pb-20">
      {loading && <Loader />}
      <div className="w-full">
        <SearchBar onSearch={filterUserTransferItems} />
      </div>
      <ViewTransaction />
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChanges={setCurrentPage}
      />
    </section>
  );
};
