import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import { Sidebar } from "../components/Sidebar";

export const SuperAdminLayout = () => {
  return (
    <>
      <Sidebar />
      <div>
        <main className="container mx-auto px-4 bg-gray-400 dark:bg-gray-100 py-12">
          <Outlet />
        </main>
      </div>
    </>
  );
};
