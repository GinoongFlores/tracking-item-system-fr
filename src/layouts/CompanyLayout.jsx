import { Outlet } from "react-router-dom";
import { Company } from "../pages/admin";

export const CompanyLayout = () => {
  return (
    <>
      <div>
        <Company />
        {/* <ViewCompanyPage /> */}
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
