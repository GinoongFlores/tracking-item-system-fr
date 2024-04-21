import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation";

export const AdminLayout = () => {
  return (
    <>
      <Sidebar />

      <main className="container mx-auto px-4 bg-white dark:bg-darker pt-12 min-h-screen md:full text-dark dark:text-white">
        <Outlet />
      </main>
    </>
  );
};
