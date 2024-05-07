import { Outlet } from "react-router-dom";

export const CompanyLayout = () => {
  return (
    <>
      <section>
        <main className="container mx-auto">
          <Outlet />
        </main>
      </section>
    </>
  );
};
