import { useCompanyContext } from "../../context/CompanyContext";
import { UserRole } from "../../hooks/UserRole";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { CompanyCard } from "../../components/CompanyCard";

export const ViewCompanyPage = () => {
  const { companies, fetchCompany } = useCompanyContext();
  const userRole = UserRole();

  // const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (userRole !== "super_admin") {
      toast.error("You are not authorized to access this page.", {
        id: "unauthorizedAccess",
      });
      return;
    }

    fetchCompany();
  }, [userRole, fetchCompany]);

  return (
    <>
      {companies.map((company) => (
        <CompanyCard key={company.id} company_name={company.company_name} />
      ))}
    </>
  );
};
