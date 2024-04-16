import { useEffect } from "react";
import { DefaultCard } from "../../components/cards";
import { useCompany } from "../../store/StoreCompany";

export const ViewCompanyPage = () => {
  // prevent destructuring to avoid performance issues
  // const { companies, fetchCompany } = useCompany();
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
