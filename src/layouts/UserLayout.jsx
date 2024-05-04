import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation";

export const UserLayout = () => {
  return (
    <>
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-3 bg-white dark:bg-darker">
          <Sidebar />
        </div>

        <main className="col-span-12 md:col-span-9 container mx-auto px-4 pt-12 bg-white max-w-full min-h-screen dark:bg-darker">
          <Outlet />
        </main>
      </div>
    </>
  );
};
