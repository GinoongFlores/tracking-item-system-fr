import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation";

export const UserLayout = () => {
  return (
    <>
      <Sidebar />

      <main className="container mx-auto px-4 pt-12 bg-white max-w-full min-h-screen dark:bg-darker">
        <Outlet />
      </main>
    </>
  );
};
