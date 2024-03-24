import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export const SuperAdminLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="container mx-auto px-8 bg-gray-800">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
