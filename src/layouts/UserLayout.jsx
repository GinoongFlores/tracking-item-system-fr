import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const UserLayout = () => {
  return (
    <>
      <Sidebar />

      <main className="container mx-auto px-4 pt-12 bg-white dark:bg-darker max-w-full min-h-screen h-full">
        <Outlet />
      </main>
    </>
  );
};
