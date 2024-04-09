import { Link, useNavigate } from "react-router-dom";

import { UserRole } from "../hooks/UserRole";
import { Navbar } from "./Navbar";
import { useAuth } from "../store/StoreAuth";
import { useUtils } from "../store/StoreUtils";
import { AdminLinks, SuperAdminLinks, UserLinks } from "../utils/sidebar";
import { SuperAdminRoutes, AdminRoutes, UserRoutes } from "../routes";

export const Sidebar = () => {
  // const { logout } = useAuthContext();
  const userRole = UserRole();
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout);

  const isOpen = useUtils((state) => state.isOpen);
  const toggleOpen = useUtils((state) => state.toggleOpen);

  let sidebarLinks;
  switch (userRole) {
    case "super_admin":
      sidebarLinks = SuperAdminRoutes;
      break;
    case "admin":
      sidebarLinks = AdminRoutes;
      break;
    case "user":
      sidebarLinks = UserRoutes;
      break;
    default:
      sidebarLinks = [];
  }
  return (
    <>
      <header>
        <Navbar toggleOpen={toggleOpen} />
      </header>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-36 md:w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          isOpen ? "" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="pb-4 mb-4 space-y-2 font-medium border-b border-gray-200 dark:border-gray-700">
            <li>
              <h2 className="text-sm md:text-lg dark:text-gray-400 text-center">
                Welcome {userRole === "super_admin" ? "super admin" : userRole}!
              </h2>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            {sidebarLinks[0].children.map((route, index) => (
              <li key={index}>
                <Link
                  to={route.path}
                  onClick={async (e) => {
                    if (route.name === "Logout") {
                      e.preventDefault();
                      await logout();
                      navigate("/login", { replace: true });
                    } else {
                      toggleOpen();
                    }
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {route.icon}
                  <span className="ms-3">{route.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 ">
        {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"></div> */}
      </div>
    </>
  );
};
