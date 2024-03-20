import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaUsers } from "react-icons/fa";

const SuperAdminLayout = () => {
  return (
    <>
      <Sidebar />
      <main>{/* <Outlet /> */}</main>
    </>
  );
};

export default SuperAdminLayout;
