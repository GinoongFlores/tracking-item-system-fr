import { Outlet } from "react-router-dom";
import { BreadCrumbs } from "../components/navigation";
import { CompanyLinks } from "../utils";

export const CompanyLayout = () => {
  return (
    <>
      <div className="">
        <div className="flex flex-col items-center justify-stretch">
          <BreadCrumbs crumbs={CompanyLinks} />
        </div>
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};
