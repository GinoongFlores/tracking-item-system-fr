import { useEffect, useCallback } from "react";
import { DefaultCard } from "../../../components/cards";
import { useCompany } from "../../../store";
import { debounce } from "lodash";
import Skeleton from "react-loading-skeleton";

export const ViewCompany = () => {
  const { companies, fetchCompany, skeletonLoading } = useCompany();

  const debouncedFetchCompany = useCallback(() => {
    const debounced = debounce(fetchCompany, 500);
    debounced();
  }, [fetchCompany]);

  useEffect(() => {
    debouncedFetchCompany();
  }, [debouncedFetchCompany]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {companies.map((company) => (
          <DefaultCard
            key={company.id}
            name={company.company_name}
            defaultActions={true}
            // loading={skeletonLoading}
          />
        ))}
      </div>
    </>
  );
};
