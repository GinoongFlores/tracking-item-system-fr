import { useEffect } from "react";
import { CompanyCard } from "../../components/CompanyCard";
// import { UserToken } from "../../hooks/UserToken";
import { UserToken } from "../../hooks/UserToken";
import { useCompany } from "../../store/StoreCompany";

export const ViewCompanyPage = () => {
  const token = UserToken();

  // prevent destructuring to avoid performance issues
  // const { companies, fetchCompany } = useCompany();
  const companies = useCompany((state) => state.companies);
  const fetchCompany = useCompany((state) => state.fetchCompany);

  useEffect(() => {
    fetchCompany(token);
  }, [fetchCompany, token]);

  return (
    <>
      {companies.map((company) => (
        <CompanyCard key={company.id} company_name={company.company_name} />
      ))}
    </>
  );
};
