import { useEffect, useCallback } from "react";
import { DefaultCard } from "../../../components/cards";
import { useCompany } from "../../../store";
import { debounce } from "lodash";
import { Paginate } from "../../../components/navigation";
import { Loader } from "../../../utils";

export const ViewCompany = () => {
  const {
    companies,
    fetchCompany,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
  } = useCompany();

  const debouncedFetchCompany = useCallback(() => {
    const debounced = debounce(fetchCompany, 500);
    debounced();
  }, [fetchCompany]);

  useEffect(() => {
    debouncedFetchCompany(currentPage);
  }, [debouncedFetchCompany, currentPage]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {loading && <Loader />}
        {companies.length > 0 ? (
          companies.map((company) => (
            <DefaultCard
              key={company.id}
              name={company.company_name}
              defaultActions={true}
              // loading={skeletonLoading}
            />
          ))
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div>
              <p>No transactions yet</p>
            </div>
          </div>
        )}

        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChanges={setCurrentPage}
        />
      </div>
    </>
  );
};
