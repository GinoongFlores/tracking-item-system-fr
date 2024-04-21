import { useEffect } from "react";
import { DefaultCard } from "../../../components/cards";
import { useCompany } from "../../../store";

export const ViewCompany = () => {
  const companies = useCompany((state) => state.companies);
  const fetchCompany = useCompany((state) => state.fetchCompany);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {companies.map((company) => (
          <DefaultCard
            key={company.id}
            name={company.company_name}
            defaultActions={true}
          />
        ))}
      </div>
    </>
  );
};
