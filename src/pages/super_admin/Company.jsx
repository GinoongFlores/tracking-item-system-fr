import { SearchBar } from "../../components";
import { ViewCompany } from "../super_admin";
import { useCompany } from "../../store";
import { useEffect, useState } from "react";
import { Loader } from "../../utils";
import { Paginate } from "../../components/navigation";

export const Company = () => {
  const {
    filterCompany,
    fetchCompany,
    loading,
    companies,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useCompany();

  // paginate
  useEffect(() => {
    fetchCompany(currentPage);
  }, [fetchCompany, currentPage]);

  return (
    <>
      <section className="relative pb-20">
        {loading && <Loader />}
        <div className="flex flex-col items-center justify-stretch">
          <SearchBar onSearch={filterCompany} />
        </div>
        {companies.length === 0 && <p>No item found</p>}
        <ViewCompany />
        <Paginate
          currentPages={currentPage}
          totalPages={totalPages}
          onPageChanges={setCurrentPage}
        />
      </section>
    </>
  );
};
