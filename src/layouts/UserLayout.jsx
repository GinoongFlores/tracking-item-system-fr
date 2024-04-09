import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const UserLayout = () => {
  return (
    <>
      <Sidebar />

      <main className="container mx-auto px-4 pt-12 bg-gray-500 dark:bg-gray-800 h-screen md:full">
        <Outlet />
      </main>
    </>
  );
};
