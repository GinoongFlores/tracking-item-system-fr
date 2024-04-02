import { Outlet } from "react-router-dom";
import { Company } from "../pages/super_admin";

export const CompanyLayout = () => {
  return (
    <>
      <div className="">
        <Company />
        {/* <ViewCompanyPage /> */}
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};
