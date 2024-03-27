import { useCompanyContext } from "../../context/CompanyContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { CompanyCard } from "../../components/CompanyCard";

export const ViewCompanyPage = () => {
  const { companies, fetchCompany } = useCompanyContext();

  // const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // if (userRole !== "super_admin") {
    //   toast.error("You are not authorized to access this page.", {
    //     id: "unauthorizedAccess",
    //   });
    //   return;
    // }

    fetchCompany();
  }, [fetchCompany]);

  return (
    <>
      {companies.map((company) => (
        <CompanyCard key={company.id} company_name={company.company_name} />
      ))}
    </>
  );
};
