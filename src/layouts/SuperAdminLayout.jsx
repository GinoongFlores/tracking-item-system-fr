import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import { Sidebar } from "../components/navigation";

export const SuperAdminLayout = () => {
  return (
    <>
      <Sidebar />
      <div>
        <main className="container mx-auto px-4 pt-12 bg-white dark:bg-darker max-w-full min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};
