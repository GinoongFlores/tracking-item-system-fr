import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation";

export const AdminLayout = () => {
  return (
    <>
      <Sidebar />

      <main className="container mx-auto px-4 bg-gray-500 dark:bg-black-800 pt-12 h-screen md:full">
        <Outlet />
      </main>
    </>
  );
};
